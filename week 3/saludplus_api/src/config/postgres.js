import pg from 'pg';
import { env } from "./env.js";

const { Pool } = pg;

const pool = new Pool({
    connectionString: env.postgresUri
});

async function createTables(){
    const client = await pool.connect();
    try{
        await client.query("BEGIN");

    }catch(error){
        console.error("Error creating tables", error);
        await client.query("ROLLBACK");

    }finally{
        client.release();
    }
}