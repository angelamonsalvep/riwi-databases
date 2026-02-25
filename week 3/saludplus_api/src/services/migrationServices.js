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




    }catch(error){
        console.error("Error migrating data:", error);
        throw error;
    }
}
