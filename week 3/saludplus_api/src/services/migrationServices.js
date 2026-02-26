import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'csv-parse/sync';
import { pool } from '../config/postgres.js';
import { env } from '../config/env.js';

export async function migrate(clearBefore = false) {
    try{
        const csvPath = resolve(env.fileDataCsv);
        let fileContent = await readFile(csvPath, 'utf-8');
        const rows = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });

        console.log(rows);
        console.log(`Read ${rows.length} rows from CSV file`);

        // --- Clear existing data if requested
        if(clearBefore){
            await pool.query('BEGIN');
            await pool.query(`TRUNCATE TABLE patients, 
                treatments, insurances_providers, specialitys,
                doctors, appointments CASCADE`);
            await pool.query('COMMIT');
            console.log(' previous data cleared successfully');

        }

        // ── 3. Insert uniques entities in PostgreSQL 
        const patientEmails  = new Set();
        const doctorEmails   = new Set();
        const treatmentCodes = new Set();
        const insuranceNames = new Set();
        const specialtyNames = new Set();

        for(const row of rows){
            console.log(`Processing row: ${JSON.stringify(row)}`);
            //insert patients
            if(!patientEmails.has(row.patient_email)){               

                await pool.query(`INSERT INTO patients (name, email, phone, address) 
                    VALUES ($1, $2, $3, $4)`, 
                    [row.patient_name, row.patient_email, row.patient_phone, row.patient_address]);
                patientEmails.add(row.patient_email);
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
                
                const { rows: [specialty] } = await pool.query(`SELECT id FROM specialitys WHERE name = $1`, 
                    [row.specialty]);

                await pool.query(`INSERT INTO doctors (name, email, speciality_id) 
                    VALUES ($1, $2, $3)`, 
                    [row.doctor_name, row.doctor_email, specialty.id]);
                doctorEmails.add(row.doctor_email);
            }
        }




    }catch(error){
        console.error("Error migrating data:", error);
        throw error;
    }
}
