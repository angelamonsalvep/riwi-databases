import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'csv-parse/sync';
import { pool } from '../config/postgres.js';
import { env } from '../config/env.js';
import { PatientHistory } from '../config/mongodb.js';

export async function migrate(clearBefore = false) {
    try{
        const csvPath = resolve(env.fileDataCsv);
        let fileContent = await readFile(csvPath, 'utf-8');
        const rows = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });

        //console.log(rows);
        console.log(`Read ${rows.length} rows from CSV file`);

        // --- Clear existing data if requested
        if(clearBefore){

            // clear postgres data
            await pool.query('BEGIN');
            await pool.query(`TRUNCATE TABLE patients, 
                treatments, insurances_providers, specialitys,
                doctors, appointments CASCADE`);
            await pool.query('COMMIT');
            console.log(' previous data cleared successfully');

            //clear mongodb data
            await PatientHistory.deleteMany({});
            console.log(' previous data cleared successfully from mongodb');

        }

        // ── 3. Insert uniques entities in PostgreSQL 
        const patientEmails  = new Set();
        const doctorEmails   = new Set();
        const treatmentCodes = new Set();
        const insuranceNames = new Set();
        const specialtyNames = new Set();

        for(const row of rows){
            //console.log(`Processing row: ${JSON.stringify(row)}`);
            //insert patients
            const patientEmail = row.patient_email.toLowerCase();
            if(!patientEmails.has(patientEmail)){               

                await pool.query(`INSERT INTO patients (name, email, phone, address) 
                    VALUES ($1, $2, $3, $4)`, 
                    [row.patient_name, row.patient_email, row.patient_phone, row.patient_address]);
                patientEmails.add(patientEmail);
            }

            //insert specialitys
            if(!specialtyNames.has(row.specialty)){
                await pool.query(`INSERT INTO specialitys (name) 
                    VALUES ($1)`, [row.specialty]);
                specialtyNames.add(row.specialty);
            }

            //insert doctors
            if(!doctorEmails.has(row.doctor_email)){   

            // Obtener IDs referenciados      
                
                const { rows: [specialty] } = await pool.query(`SELECT id FROM 
                    specialitys WHERE name = $1`, 
                    [row.specialty]);

                await pool.query(`INSERT INTO doctors (name, email, speciality_id) 
                    VALUES ($1, $2, $3)`, 
                    [row.doctor_name, row.doctor_email, specialty.id]);
                doctorEmails.add(row.doctor_email);
            }

            //insert treatments
            
            if(!treatmentCodes.has(row.treatment_code)){ 

                await pool.query(`INSERT INTO treatments (code, description, cost) 
                    VALUES ($1, $2, $3)`, 
                    [row.treatment_code, row.treatment_description, parseInt(row.treatment_cost)]);
                treatmentCodes.add(row.treatment_code);
            }

            //insert insurance providers
            
            if(!insuranceNames.has(row.insurance_provider)){ 

                await pool.query(`INSERT INTO insurances_providers 
                    (name, coverage_percentage) 
                    VALUES ($1, $2)`, 
                    [row.insurance_provider, 
                        parseInt(row.coverage_percentage)]);
                insuranceNames.add(row.insurance_provider);
            }

            //insert appointments
            // Obtener IDs referenciados      
                
                const { rows: [patient] } = await pool.query(`SELECT id FROM 
                    patients WHERE email = $1`, 
                    [row.patient_email]);

                const { rows: [doctor] } = await pool.query(`SELECT id FROM 
                    doctors WHERE email = $1`, 
                    [row.doctor_email]);

                const { rows: [insurance] } = await pool.query(`SELECT id FROM 
                    insurances_providers WHERE name = $1`, 
                    [row.insurance_provider]);

                await pool.query(`INSERT INTO appointments (id, date, patient_id, 
                    doctor_id, treatment_code, insurance_provider_id, amount_paid) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
                    [row.appointment_id, row.appointment_date, patient.id, doctor.id, 
                        row.treatment_code, insurance.id, parseInt(row.amount_paid)]);

            
        }


        // ── 5. Crear/actualizar historial en MongoDB ────────────────────────────────
    // Agrupamos las citas por paciente para construir el documento a incrustar
    const historiesByEmail = {};

    for (const row of rows) {
        const email = row.patient_email.toLowerCase().trim();

        if (!historiesByEmail[email]) {
            historiesByEmail[email] = {
                patientEmail: email,
                patientName: row.patient_name,
                appointments: [],
            };
        }

        historiesByEmail[email].appointments.push({
            appointmentId: row.appointment_id,
            date: row.appointment_date,
            doctorName: row.doctor_name,
            doctorEmail: row.doctor_email.toLowerCase().trim(),
            specialty: row.specialty,
            treatmentCode: row.treatment_code,
            treatmentDescription: row.treatment_description,
            treatmentCost: parseFloat(row.treatment_cost),
            insuranceProvider: row.insurance_provider,
            coveragePercentage: parseInt(row.coverage_percentage, 10),
            amountPaid: parseFloat(row.amount_paid),
        });
    }

    // upsert: actualiza si ya existe, crea si no existe
    for (const history of Object.values(historiesByEmail)) {
        await PatientHistory.updateOne(
            { patientEmail: history.patientEmail },
            { $set: history },
            { upsert: true }
        );
    }

    }catch(error){
        console.error("Error migrating data:", error);
        throw error;
    }
}
