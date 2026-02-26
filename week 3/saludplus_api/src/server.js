import { createTables } from "./config/postgres.js"; 
//import app from "./app.js"; 
//import { env } from "./config/env.js";
import { migrate } from "./services/migrationServices.js";
import { connectMongo } from "./config/mongodb.js";

try{
    console.log("Connecting to postgres...");
    await createTables();
    console.log("Connected to postgres successfully");

    console.log("Connecting to mongodb...");
    await connectMongo();
    console.log("Connected to mongodb successfully");
    
    console.log("Migrating data...");
    await migrate(true);
    console.log("Data migrated successfully");

    /* app.listen(env.port, () => {
        console.log(`Server running on port ${env.port}`);
    }); */
}catch(error){
    console.error("Error starting server:", error);
    process.exit(1);
}