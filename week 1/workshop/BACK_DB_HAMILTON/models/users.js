import mongoose, { mongo, Mongoose } from "mongoose";

export const doctorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  especialidad: {
    type: String,
    required: [true, 'La especialidad es obligatoria'],
    index: true // Facilita las búsquedas por especialidad
  },
  licencia: {
    type: String,
    required: true,
    unique: true // Evita duplicados de cédula profesional o licencia
  },
  experiencia_años: {
    type: Number,
    min: [0, 'La experiencia no puede ser negativa'],
    default: 0
  },
  contacto: {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    telefono: String
  },
  certificaciones: [String], // Array de strings
  activo: {
    type: Boolean,
    default: true
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Crea automáticamente campos 'createdAt' y 'updatedAt'
});

// Crear el modelo
const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;