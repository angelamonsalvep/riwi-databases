import mongoose from "mongoose";
import { env } from "./env.js";

// ── Schema of an Appointment
const appointmentSchema = new mongoose.Schema({
  appointmentId: {type: String, required: true},
  date: {type: Date, required: true},
  doctorName: {type: String, required: true}, 
  doctorEmail: {type: String, required: true},
  specialty: {type: String, required: true},
  treatmentCode: {type: String},
  treatmenDescription: {type: String},
  treatmentCost: {type: Number, required: true},
  insuranceProvider: {type: String, required: true},
  coveragePercentage: {type: Number, required: true},
  amountPaid: {type: Number, required: true}
  
}, {_id: false}); 

// ── Schema of a Patient History
const patientHistorySchema = new mongoose.Schema({
  patientEmail: {type: String, 
    required: true, 
    unique: true, 
    match: /^\S+@\S+\.\S+$/},
  patientName: {type: String, required: true},
  appointments: {
    type: [appointmentSchema],
    default: []
  }
}, {timestamps: true});

export const PatientHistory = 
    mongoose.model("PatientHistory", 
        patientHistorySchema);

export async function connectMongo(){
    try{
        await mongoose.connect(env.databaseMongoUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; 
    }
    
}

