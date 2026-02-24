import pg from 'pg';
import { env } from "./env.js";

const { Pool } = pg;

export const pool = new Pool({
    connectionString: env.postgresUri
});

export async function createTables(){
    const client = await pool.connect();
    try{
        await client.query('BEGIN');

        // ── patients ──
        await client.query(`CREATE TABLE IF NOT EXISTS patients (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            phone VARCHAR(20) NOT NULL,
            address VARCHAR(100) NOT NULL)`);

        // ── treatments ──
        await client.query(`CREATE TABLE IF NOT EXISTS treatments (
            code VARCHAR(50) PRIMARY KEY,
            description TEXT NOT NULL,
            cost INTEGER NOT NULL)`);
        
        // ── insurances_providers ──
        await client.query(`CREATE TABLE IF NOT EXISTS insurances_providers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE,
            coverage_percentage INTEGER NOT NULL)`);

        
        // ── specialitys ──
        await client.query(`CREATE TABLE IF NOT EXISTS specialitys (
               id SERIAL PRIMARY KEY,
               name VARCHAR(50) NOT NULL UNIQUE)`);
        
        // ── doctors ──
        await client.query(`CREATE TABLE IF NOT EXISTS doctors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            speciality_id INTEGER NOT NULL REFERENCES specialitys(id))`);

        // ── appointmets ──
        await client.query(`CREATE TABLE IF NOT EXISTS appointments (
            id VARCHAR(50) PRIMARY KEY,
            date DATE NOT NULL,
            patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
            doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
            treatment_code VARCHAR(50) NOT NULL REFERENCES treatments(code) ON DELETE RESTRICT,
            insurance_provider_id INTEGER NOT NULL REFERENCES insurances_providers(id) ON DELETE RESTRICT,
            amount_paid NUMERIC(10,2) NOT NULL)`);  

        // ── Indexes for frequent queries ──
        await client.query(`CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id)`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id)`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_appointments_treatment ON appointments(treatment_code)`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_appointments_insurance ON appointments(insurance_provider_id)`);

        await client.query('COMMIT');   

        console.log('Tables created successfully');

    }catch(error){
        console.error("Error creating tables", error);
        await client.query("ROLLBACK");

    }finally{
        client.release();//liberar la conexión
    }
}



