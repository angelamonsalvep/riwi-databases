# 🩺 Simulacro de Prueba de Desempeño: Arquitectura de Persistencia Híbrida "SaludPlus"

**Módulo:** Arquitectura de Persistencia  
**Cohorte:** M4 - Cohorte 6  
**Duración Estimada:** 6-8 horas  
**Nivel:** Intermedio-Avanzado

> *"Un arquitecto de software no elige herramientas por gusto, sino por la naturaleza de los desafíos que enfrenta."*

---

## 📋 Tabla de Contenidos

1. [Información General](#información-general)
2. [El Escenario de Crisis](#el-escenario-de-crisis)
3. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
4. [Prerrequisitos](#prerrequisitos)
5. [El Reto: Análisis y Toma de Decisiones](#el-reto-análisis-y-toma-de-decisiones)
6. [Requerimientos Técnicos Detallados](#requerimientos-técnicos-detallados)
7. [Especificaciones de Implementación](#especificaciones-de-implementación)
8. [Casos de Prueba y Validación](#casos-de-prueba-y-validación)
9. [Entregables](#entregables)
10. [Criterios de Evaluación](#criterios-de-evaluación)
11. [Recursos y Materiales](#recursos-y-materiales)
12. [Instrucciones de Entrega](#instrucciones-de-entrega)

---

## 📌 Información General

### Contexto del Proyecto

La red de clínicas **SaludPlus** es una organización en crecimiento que atiende a miles de pacientes en múltiples especialidades médicas. El sistema actual maneja información crítica sobre:

- **Pacientes:** Información personal, contacto y historial médico
- **Médicos:** Especialistas con diferentes áreas de expertise
- **Citas Médicas:** Registro de consultas, tratamientos y costos
- **Seguros Médicos:** Coberturas y porcentajes de reembolso
- **Facturación:** Pagos realizados y montos pendientes

### Situación Actual

El sistema ha operado durante años con un modelo de datos basado en **archivos planos CSV** (`simulacro_saludplus_data.csv`). Este enfoque funcionó inicialmente, pero el crecimiento exponencial de la red ha expuesto limitaciones críticas.

---

## 🚨 El Escenario de Crisis

### Problemas Identificados

#### 1. **Inconsistencias en Datos Maestros**
- Los datos de pacientes y doctores aparecen repetidos cientos de veces en el CSV
- Errores tipográficos y variaciones en nombres (ej: "Dr. Carlos Ruiz" vs "Dr. C. Ruiz" vs "Carlos Ruiz")
- Información de contacto desactualizada distribuida en múltiples registros
- Imposibilidad de mantener una "fuente única de verdad"

#### 2. **Rigidez en Reportes y Facturación**
- El reporte de facturación requiere procesar miles de filas CSV manualmente
- Cálculos de coberturas de seguros propensos a errores humanos
- Imposibilidad de generar reportes en tiempo real
- Dificultad para auditar transacciones financieras

#### 3. **Escalabilidad Limitada**
- Las consultas de historiales clínicos tardan minutos al procesar registros planos
- Búsquedas simples requieren escanear todo el archivo
- Imposibilidad de implementar índices o optimizaciones
- El tiempo de respuesta aumenta linealmente con el volumen de datos

### Tu Misión

Actuar como **Arquitecto de Datos** y **Desarrollador Backend** para diseñar e implementar una **solución híbrida** que utilice:

- **Motor Relacional (SQL):** Para datos estructurados que requieren integridad referencial
- **Motor NoSQL (Documental):** Para datos semi-estructurados que requieren flexibilidad y velocidad de lectura

---

## 🎯 Objetivos de Aprendizaje

Al finalizar este simulacro, serás capaz de:

1. **Analizar** las características de diferentes modelos de datos y elegir el adecuado según el caso de uso
2. **Diseñar** esquemas de bases de datos relacionales aplicando formas normales (1FN, 2FN, 3FN)
3. **Modelar** estructuras documentales en NoSQL optimizando para lectura y evitando joins costosos
4. **Implementar** procesos de migración de datos que normalicen y distribuyan información entre múltiples sistemas
5. **Desarrollar** APIs RESTful que aprovechen las fortalezas de cada motor de persistencia
6. **Justificar** decisiones arquitectónicas basándose en principios ACID, CAP y características de rendimiento

---

## ✅ Prerrequisitos

### Conocimientos Técnicos Requeridos

- **SQL:** Creación de tablas, relaciones, índices, consultas con JOINs
- **NoSQL:** Conceptos de documentos, embedding vs referencias, agregaciones
- **Node.js/Express:** Desarrollo de APIs REST, manejo de asincronismo
- **Git:** Control de versiones y gestión de repositorios
- **Docker (opcional):** Para ejecutar bases de datos localmente

### Herramientas Necesarias

- Node.js 18+ instalado
- PostgreSQL 12+ (o acceso a instancia remota)
- MongoDB 6+ (o acceso a instancia remota)
- Editor de código (VS Code recomendado)
- Postman o herramienta similar para pruebas de API
- Git instalado y configurado

### Recursos de Estudio Recomendados

- Documentación oficial de PostgreSQL
- Documentación oficial de MongoDB
- Principios de normalización de bases de datos
- Patrones de diseño para APIs REST

---

## 🏗️ El Reto: Análisis y Toma de Decisiones

### Preguntas Clave a Responder

Deberás proponer una arquitectura que distribuya la información entre ambos motores basándote en el análisis de:

#### 1. **Integridad de Datos**
- ¿Qué información requiere relaciones estrictas y evitar duplicados?
- ¿Qué datos necesitan transacciones ACID?
- ¿Qué información debe mantenerse consistente entre sistemas?

**Ejemplos a considerar:**
- Información de pacientes (email único, datos personales)
- Relación médico-especialidad
- Integridad referencial en citas (paciente y médico deben existir)
- Precisión financiera en facturación

#### 2. **Rendimiento de Consulta**
- ¿Qué información se beneficia de un modelo de lectura rápida y flexible?
- ¿Qué consultas son más frecuentes y deben optimizarse?
- ¿Qué datos cambian raramente pero se leen frecuentemente?

**Ejemplos a considerar:**
- Historial completo de un paciente (múltiples citas)
- Búsqueda por email de paciente con todas sus citas
- Reportes agregados por seguro médico
- Consultas que requieren múltiples JOINs en SQL

#### 3. **Escalabilidad y Mantenibilidad**
- ¿Qué datos crecerán más rápido?
- ¿Qué información requiere flexibilidad en el esquema?
- ¿Cómo minimizar la duplicación sin sacrificar rendimiento?

---

## ⚙️ Requerimientos Técnicos Detallados

### A. Configuración de Persistencia Híbrida

#### A.1 Base de Datos Relacional (PostgreSQL)

**Tareas:**
1. Configurar conexión a PostgreSQL (local o remota)
2. Diseñar esquema de base de datos aplicando formas normales:
   - **1FN:** Eliminar grupos repetitivos
   - **2FN:** Eliminar dependencias parciales
   - **3FN:** Eliminar dependencias transitivas
3. Crear tablas con relaciones apropiadas:
   - `patients` (id, name, email, phone, address)
   - `doctors` (id, name, email, specialty)
   - `insurances` (id, name, coverage_percentage)
   - `appointments` (id, appointment_id, appointment_date, patient_id, doctor_id, treatment_code, treatment_description, treatment_cost, insurance_id, amount_paid)
4. Implementar constraints:
   - Claves primarias
   - Claves foráneas con integridad referencial
   - Unicidad donde corresponda (ej: email de paciente)
   - Valores NOT NULL según reglas de negocio
5. Crear índices estratégicos para optimizar consultas frecuentes

**Criterios de Éxito:**
- Esquema normalizado sin redundancias
- Todas las relaciones tienen integridad referencial
- Índices creados en campos de búsqueda frecuente
- Script de creación de esquema es idempotente (puede ejecutarse múltiples veces)

#### A.2 Base de Datos Documental (MongoDB)

**Tareas:**
1. Configurar conexión a MongoDB (local o remota)
2. Diseñar esquema de documentos optimizado para lectura:
   - Decidir qué datos **incrustar** (embed) vs **referenciar**
   - Estructurar documentos para evitar joins costosos
   - Considerar patrones de acceso a datos
3. Crear colecciones apropiadas:
   - `patient_histories`: Documentos con historial completo de pacientes
4. Diseñar estructura de documentos:
   ```json
   {
     "patientEmail": "paciente@email.com",
     "patientName": "Nombre Completo",
     "appointments": [
       {
         "appointmentId": "APT-1001",
         "date": "2024-01-07",
         "doctorName": "Dr. Carlos Ruiz",
         "doctorEmail": "c.ruiz@saludplus.com",
         "specialty": "Cardiology",
         "treatmentCode": "TRT-007",
         "treatmentDescription": "Skin Treatment",
         "treatmentCost": 200000,
         "insuranceProvider": "ProteccionMedica",
         "coveragePercentage": 60,
         "amountPaid": 80000
       }
     ]
   }
   ```
5. Crear índices en campos de búsqueda frecuente (ej: `patientEmail`)

**Criterios de Éxito:**
- Documentos estructurados para lectura eficiente
- Justificación clara de decisiones de embedding vs referencia
- Índices creados en campos de consulta frecuente
- Sin duplicación innecesaria de datos maestros

### B. Proceso de Migración (Bulk Load)

#### B.1 Script de Migración

**Tareas:**
1. Crear script o endpoint que procese el archivo CSV (`simulacro_saludplus_data.csv`)
2. Implementar lógica de normalización:
   - **Deduplicación:** Si un paciente aparece 10 veces, debe existir una sola vez en la base de datos maestra
   - **Normalización de datos:** Limpiar y estandarizar valores (emails en minúsculas, nombres capitalizados)
   - **Validación:** Verificar integridad de datos antes de insertar
3. Distribuir datos entre sistemas:
   - **SQL:** Insertar datos maestros normalizados (pacientes, doctores, seguros)
   - **SQL:** Insertar citas con referencias a entidades maestras
   - **NoSQL:** Crear documentos de historial de pacientes con datos incrustados
4. Manejar errores y transacciones:
   - Rollback en caso de fallos críticos
   - Logging de errores y advertencias
   - Reporte de estadísticas de migración

**Estructura del CSV (ejemplo):**
```csv
patient_name,patient_email,patient_phone,patient_address,doctor_name,doctor_email,specialty,appointment_id,appointment_date,treatment_code,treatment_description,treatment_cost,insurance_provider,coverage_percentage,amount_paid
```

**Criterios de Éxito:**
- Proceso idempotente (puede ejecutarse múltiples veces sin duplicar datos)
- Normalización correcta de datos maestros
- Distribución adecuada entre SQL y NoSQL
- Manejo robusto de errores
- Reporte de estadísticas (cantidad de pacientes, doctores, citas migradas)

#### B.2 Endpoint de Migración

**Especificación:**
- **Método:** `POST`
- **Ruta:** `/api/simulacro/migrate`
- **Body (opcional):**
  ```json
  {
    "clearBefore": true
  }
  ```
- **Respuesta exitosa (200):**
  ```json
  {
    "ok": true,
    "message": "Migration completed successfully",
    "result": {
      "patients": 150,
      "doctors": 25,
      "insurances": 5,
      "appointments": 500,
      "histories": 150,
      "csvPath": "./simulacro_saludplus_data.csv"
    }
  }
  ```
- **Respuesta de error (500):**
  ```json
  {
    "ok": false,
    "error": "Error message description"
  }
  ```

### C. API REST y Lógica de Negocio

#### C.1 Gestión de Médicos

**Endpoints a implementar:**

1. **Listar Médicos**
   - **Método:** `GET`
   - **Ruta:** `/api/doctors`
   - **Query params (opcional):** `specialty` (filtrar por especialidad)
   - **Respuesta (200):**
     ```json
     {
       "ok": true,
       "doctors": [
         {
           "id": 1,
           "name": "Dr. Carlos Ruiz",
           "email": "c.ruiz@saludplus.com",
           "specialty": "Cardiology"
         }
       ]
     }
     ```
   - **Motor recomendado:** SQL (datos maestros normalizados)

2. **Obtener Médico por ID**
   - **Método:** `GET`
   - **Ruta:** `/api/doctors/:id`
   - **Respuesta (200):**
     ```json
     {
       "ok": true,
       "doctor": {
         "id": 1,
         "name": "Dr. Carlos Ruiz",
         "email": "c.ruiz@saludplus.com",
         "specialty": "Cardiology",
         "createdAt": "2024-01-01T00:00:00Z"
       }
     }
     ```
   - **Respuesta (404):**
     ```json
     {
       "ok": false,
       "error": "Doctor not found"
     }
     ```

3. **Actualizar Información de Médico**
   - **Método:** `PUT`
   - **Ruta:** `/api/doctors/:id`
   - **Body:**
     ```json
     {
       "name": "Dr. Carlos Ruiz Updated",
       "email": "c.ruiz.new@saludplus.com",
       "specialty": "Cardiology"
     }
     ```
   - **Respuesta (200):**
     ```json
     {
       "ok": true,
       "message": "Doctor updated successfully",
       "doctor": { ... }
     }
     ```
   - **Desafío:** Los cambios deben propagarse correctamente:
     - Si se actualiza el email del médico, debe reflejarse en los documentos de historial de pacientes (NoSQL)
     - Si se actualiza el nombre, debe actualizarse en documentos relacionados
     - **Decisión arquitectónica:** ¿Cómo mantener consistencia entre SQL y NoSQL?

**Criterios de Éxito:**
- Endpoints funcionan correctamente
- Validación de datos de entrada
- Manejo de errores apropiado (404, 400, 500)
- Propagación de cambios a documentos relacionados (si aplica)

#### C.2 Reporte de Recaudación

**Endpoint a implementar:**

- **Método:** `GET`
- **Ruta:** `/api/reports/revenue`
- **Query params (opcional):** 
  - `startDate` (formato: YYYY-MM-DD)
  - `endDate` (formato: YYYY-MM-DD)
- **Respuesta (200):**
  ```json
  {
    "ok": true,
    "report": {
      "totalRevenue": 50000000,
      "byInsurance": [
        {
          "insuranceName": "ProteccionMedica",
          "totalAmount": 20000000,
          "appointmentCount": 150
        },
        {
          "insuranceName": "VidaPlus",
          "totalAmount": 18000000,
          "appointmentCount": 120
        },
        {
          "insuranceName": "SinSeguro",
          "totalAmount": 12000000,
          "appointmentCount": 80
        }
      ],
      "period": {
        "startDate": "2024-01-01",
        "endDate": "2024-12-31"
      }
    }
  }
  ```
- **Motor recomendado:** SQL (agregaciones precisas, integridad ACID)
- **Precisión crítica:** El cálculo debe ser exacto, sin errores de redondeo o duplicación

**Criterios de Éxito:**
- Cálculo preciso de montos totales
- Agrupación correcta por seguro
- Filtrado por rango de fechas (si se implementa)
- Rendimiento aceptable (< 1 segundo para 1000 citas)

#### C.3 Consulta de Historial de Paciente

**Endpoint a implementar:**

- **Método:** `GET`
- **Ruta:** `/api/patients/:email/history`
- **Parámetro:** `email` (en la URL)
- **Respuesta (200):**
  ```json
  {
    "ok": true,
    "patient": {
      "email": "valeria.g@mail.com",
      "name": "Valeria Gomez"
    },
    "appointments": [
      {
        "appointmentId": "APT-1001",
        "date": "2024-01-07",
        "doctorName": "Dr. Carlos Ruiz",
        "doctorEmail": "c.ruiz@saludplus.com",
        "specialty": "Cardiology",
        "treatmentCode": "TRT-007",
        "treatmentDescription": "Skin Treatment",
        "treatmentCost": 200000,
        "insuranceProvider": "ProteccionMedica",
        "coveragePercentage": 60,
        "amountPaid": 80000
      }
    ],
    "summary": {
      "totalAppointments": 5,
      "totalSpent": 500000,
      "mostFrequentSpecialty": "Cardiology"
    }
  }
  ```
- **Respuesta (404):**
  ```json
  {
    "ok": false,
    "error": "Patient not found"
  }
  ```
- **Motor recomendado:** NoSQL (lectura rápida de documento completo, sin joins)
- **Optimización:** El documento debe contener toda la información necesaria para evitar consultas adicionales

**Criterios de Éxito:**
- Respuesta rápida (< 100ms para paciente con 50 citas)
- Datos completos sin necesidad de joins adicionales
- Manejo de pacientes inexistentes
- Cálculo de estadísticas resumidas (opcional pero valorado)

---

## 🔧 Especificaciones de Implementación

### Stack Tecnológico

- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.x
- **Base de Datos Relacional:** PostgreSQL 12+
- **Base de Datos NoSQL:** MongoDB 6+
- **Lenguaje:** JavaScript (ES6+) o TypeScript
- **Gestión de Dependencias:** npm o yarn

### Estructura de Proyecto Recomendada

```
saludplus-api/
├── src/
│   ├── config/
│   │   ├── postgres.js       # Configuración PostgreSQL
│   │   ├── mongodb.js        # Configuración MongoDB
│   │   └── env.js            # Variables de entorno
│   ├── services/
│   │   ├── migrationService.js    # Lógica de migración
│   │   ├── doctorService.js       # Lógica de médicos
│   │   ├── reportService.js       # Lógica de reportes
│   │   └── patientService.js      # Lógica de pacientes
│   ├── routes/
│   │   ├── doctors.js        # Rutas de médicos
│   │   ├── reports.js        # Rutas de reportes
│   │   ├── patients.js       # Rutas de pacientes
│   │   └── simulacro.js      # Rutas de migración
│   ├── app.js                # Configuración Express
│   └── server.js             # Punto de entrada
├── scripts/
│   └── run-migration.js      # Script CLI de migración
├── data/
│   └── simulacro_saludplus_data.csv
├── .env                      # Variables de entorno (NO commitear)
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md                 # Documentación en inglés
```

### Variables de Entorno Requeridas

```env
# Server
PORT=3000

# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/saludplus

# MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=saludplus

# Data
SIMULACRO_CSV_PATH=./simulacro_saludplus_data.csv
DATA_DIR=./data
```

### Convenciones de Código

1. **Manejo de Errores:**
   - Usar try-catch en operaciones asíncronas
   - Retornar códigos HTTP apropiados (200, 400, 404, 500)
   - Mensajes de error descriptivos pero seguros (no exponer detalles internos)

2. **Validación:**
   - Validar todos los inputs de usuario
   - Validar existencia de recursos antes de operaciones
   - Validar formato de datos (emails, fechas, etc.)

3. **Asincronismo:**
   - Usar async/await en lugar de callbacks
   - Manejar promesas correctamente
   - Considerar transacciones para operaciones críticas

4. **Código Limpio:**
   - Nombres descriptivos de variables y funciones
   - Comentarios donde sea necesario explicar decisiones complejas
   - Separación de responsabilidades (routes, services, config)

---

## 🧪 Casos de Prueba y Validación

### Casos de Prueba para Migración

1. **Migración Inicial:**
   - Ejecutar migración con CSV válido
   - Verificar que se crean pacientes únicos (sin duplicados)
   - Verificar que se crean doctores únicos
   - Verificar que todas las citas tienen referencias válidas

2. **Migración Idempotente:**
   - Ejecutar migración dos veces seguidas
   - Verificar que no se duplican datos
   - Verificar que los conteos son consistentes

3. **Migración con Datos Inconsistentes:**
   - CSV con emails duplicados pero nombres diferentes
   - CSV con referencias rotas (doctor que no existe)
   - Verificar manejo de errores apropiado

### Casos de Prueba para API de Médicos

1. **Listar Médicos:**
   - `GET /api/doctors` → Debe retornar lista de médicos
   - `GET /api/doctors?specialty=Cardiology` → Debe filtrar por especialidad

2. **Obtener Médico:**
   - `GET /api/doctors/1` → Debe retornar médico existente
   - `GET /api/doctors/999` → Debe retornar 404

3. **Actualizar Médico:**
   - `PUT /api/doctors/1` con datos válidos → Debe actualizar correctamente
   - `PUT /api/doctors/1` con email duplicado → Debe retornar error 400
   - Verificar propagación de cambios a documentos NoSQL

### Casos de Prueba para Reporte de Recaudación

1. **Reporte Completo:**
   - `GET /api/reports/revenue` → Debe retornar totales correctos
   - Verificar que la suma de `byInsurance` coincide con `totalRevenue`

2. **Reporte con Filtros:**
   - `GET /api/reports/revenue?startDate=2024-01-01&endDate=2024-01-31`
   - Verificar que solo incluye citas en el rango de fechas

### Casos de Prueba para Historial de Paciente

1. **Paciente Existente:**
   - `GET /api/patients/valeria.g@mail.com/history`
   - Debe retornar historial completo con todas las citas
   - Verificar tiempo de respuesta < 100ms

2. **Paciente Inexistente:**
   - `GET /api/patients/noexiste@mail.com/history`
   - Debe retornar 404

3. **Paciente sin Citas:**
   - Debe retornar array vacío de appointments

### Colección de Postman

Debes crear una colección de Postman que incluya:

1. **Variables de entorno:**
   - `baseUrl`: http://localhost:3000
   - `patientEmail`: valeria.g@mail.com (ejemplo)

2. **Requests:**
   - GET /api/simulacro (info)
   - POST /api/simulacro/migrate
   - GET /api/doctors
   - GET /api/doctors/:id
   - PUT /api/doctors/:id
   - GET /api/reports/revenue
   - GET /api/reports/revenue?startDate=...&endDate=...
   - GET /api/patients/:email/history

3. **Tests automatizados (opcional pero valorado):**
   - Verificar códigos de estado HTTP
   - Verificar estructura de respuestas JSON
   - Verificar valores esperados

---

## 📦 Entregables

### 1. Repositorio de GitHub

**Requisitos:**
- Repositorio público o acceso compartido
- Código fuente completo y funcional
- Archivo `.env.example` (sin credenciales reales)
- `.gitignore` apropiado (excluir `.env`, `node_modules`, etc.)
- Commits descriptivos y organizados

**Estructura mínima:**
```
saludplus-api/
├── src/                    # Código fuente
├── scripts/                # Scripts de utilidad
├── data/                   # Datos CSV (opcional, puede estar en .gitignore)
├── .env.example           # Ejemplo de variables de entorno
├── .gitignore
├── package.json
├── README.md              # Documentación en inglés
└── docker-compose.yml     # (opcional) Para levantar bases de datos
```

### 2. Documentación Técnica (README.md en Inglés)

**Secciones requeridas:**

1. **Project Overview:**
   - Descripción breve del proyecto
   - Stack tecnológico utilizado

2. **Architecture Decisions:**
   - **Justificación de Arquitectura Híbrida:**
     - ¿Por qué SQL para ciertos datos?
     - ¿Por qué NoSQL para otros datos?
     - Ventajas y desventajas de la decisión
   
   - **Normalización SQL:**
     - Explicación de las formas normales aplicadas
     - Diagrama ER (Entity-Relationship)
     - Justificación de relaciones y constraints
   
   - **Modelado NoSQL:**
     - Explicación del esquema de documentos
     - Decisión de embedding vs referencias
     - Justificación de estructura elegida

3. **Database Schemas:**
   - **PostgreSQL:**
     - Diagrama ER o descripción de tablas
     - Relaciones entre entidades
     - Índices creados y su propósito
   
   - **MongoDB:**
     - Estructura de documentos (con ejemplo JSON)
     - Índices creados
     - Patrones de acceso optimizados

4. **API Documentation:**
   - Lista de endpoints con métodos HTTP
   - Parámetros requeridos y opcionales
   - Ejemplos de request y response
   - Códigos de error posibles

5. **Setup Instructions:**
   - Prerrequisitos
   - Instalación de dependencias
   - Configuración de variables de entorno
   - Instrucciones para ejecutar migración
   - Instrucciones para ejecutar servidor

6. **Usage Examples:**
   - Ejemplos de uso de cada endpoint
   - Ejemplos de consultas SQL relevantes
   - Ejemplos de consultas MongoDB relevantes

### 3. Colección de Postman

**Requisitos:**
- Archivo JSON exportado de Postman
- Incluir todos los endpoints implementados
- Variables de entorno configuradas
- Tests automatizados (opcional pero valorado)

**Nombre sugerido:** `SaludPlus_API.postman_collection.json`

### 4. Diagramas (Opcional pero Altamente Valorado)

- **Diagrama ER:** Para esquema PostgreSQL
- **Diagrama de Arquitectura:** Mostrando flujo entre SQL y NoSQL
- **Diagrama de Secuencia:** Para proceso de migración
- **Diagrama de Clases/Componentes:** Estructura del código

**Herramientas sugeridas:**
- Draw.io / diagrams.net
- Lucidchart
- PlantUML
- Mermaid (puede incluirse en README.md)

---

## 📊 Criterios de Evaluación

### Rubrica de Evaluación

| Criterio | Peso | Excelencia (4) | Competente (3) | Básico (2) | Insuficiente (1) |
|----------|------|----------------|----------------|------------|------------------|
| **Arquitectura y Diseño** | 25% | Decisión acertada entre SQL y NoSQL con justificación sólida. Esquemas bien diseñados sin duplicación innecesaria. | Decisión adecuada con justificación básica. Esquemas funcionales con mínima duplicación. | Decisión parcialmente acertada. Esquemas tienen algunas redundancias. | Decisión incorrecta o sin justificación. Esquemas con duplicación excesiva. |
| **Normalización SQL** | 20% | Aplicación correcta de 1FN, 2FN, 3FN. Relaciones bien definidas. Constraints apropiados. | Normalización básica aplicada. Relaciones definidas. Algunos constraints faltantes. | Normalización parcial. Relaciones incompletas. | Normalización incorrecta o ausente. |
| **Modelado NoSQL** | 15% | Uso correcto de documentos. Embedding vs referencias bien justificado. Optimizado para lectura. | Estructura de documentos adecuada. Justificación básica. | Estructura funcional pero no optimizada. | Estructura incorrecta o sin justificación. |
| **Migración de Datos** | 15% | Proceso robusto, idempotente, con normalización correcta. Manejo de errores completo. | Proceso funcional con normalización básica. Manejo de errores parcial. | Proceso funciona pero con limitaciones. Errores básicos manejados. | Proceso incompleto o con errores críticos. |
| **API REST** | 15% | Todos los endpoints implementados correctamente. Validación completa. Códigos HTTP apropiados. | Endpoints principales implementados. Validación básica. | Endpoints parcialmente implementados. Validación limitada. | Endpoints incompletos o con errores. |
| **Calidad de Código** | 10% | Código limpio, bien organizado, con manejo de errores robusto. Comentarios apropiados. | Código funcional y organizado. Manejo de errores básico. | Código funciona pero con problemas de organización. | Código desorganizado o con errores frecuentes. |

### Puntos Adicionales (Bonus)

- ✅ Tests automatizados (unitarios o de integración)
- ✅ Documentación con diagramas visuales
- ✅ Optimizaciones de rendimiento (índices adicionales, caching)
- ✅ Manejo avanzado de errores (logging estructurado)
- ✅ Validación avanzada de datos (schemas, sanitización)
- ✅ Docker Compose para facilitar setup
- ✅ Scripts de utilidad adicionales

### Descuentos por Errores Comunes

- ❌ **-5 puntos:** Credenciales hardcodeadas en código
- ❌ **-5 puntos:** Archivo `.env` commitado al repositorio
- ❌ **-10 puntos:** Datos duplicados después de migración
- ❌ **-10 puntos:** Endpoints que retornan errores 500 en casos válidos
- ❌ **-5 puntos:** Falta de validación de inputs
- ❌ **-5 puntos:** README incompleto o en español (debe ser en inglés)

---

## 📚 Recursos y Materiales

### Archivos Proporcionados

1. **`simulacro_saludplus_data.csv`**
   - Archivo CSV con datos de ejemplo
   - Contiene información de pacientes, doctores, citas y seguros
   - Formato: CSV con headers en primera fila

### Recursos Adicionales

1. **Documentación Oficial:**
   - [PostgreSQL Documentation](https://www.postgresql.org/docs/)
   - [MongoDB Documentation](https://www.mongodb.com/docs/)
   - [Express.js Guide](https://expressjs.com/en/guide/routing.html)
   - [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

2. **Herramientas Útiles:**
   - [Postman](https://www.postman.com/) - Para pruebas de API
   - [pgAdmin](https://www.pgadmin.org/) - Cliente gráfico para PostgreSQL
   - [MongoDB Compass](https://www.mongodb.com/products/compass) - Cliente gráfico para MongoDB
   - [Draw.io](https://app.diagrams.net/) - Para crear diagramas

3. **Conceptos Clave:**
   - **ACID:** Atomicity, Consistency, Isolation, Durability
   - **CAP Theorem:** Consistency, Availability, Partition tolerance
   - **Normalización:** 1FN, 2FN, 3FN, BCNF
   - **Embedding vs Referencing:** En NoSQL
   - **REST API:** Principios y mejores prácticas

---

## 📝 Instrucciones de Entrega

### Proceso de Entrega

1. **Preparar Repositorio:**
   - Asegurar que el código está completo y funcional
   - Verificar que el README.md está completo y en inglés
   - Verificar que no hay credenciales en el código
   - Verificar que `.env` está en `.gitignore`

2. **Exportar Colección de Postman:**
   - Abrir Postman
   - Exportar colección completa
   - Incluir variables de entorno si es necesario
   - Guardar como `SaludPlus_API.postman_collection.json`

3. **Crear Release o Tag:**
   - Crear un tag en Git: `v1.0.0` o `submission`
   - O crear un release en GitHub
   - Asegurar que el código en el tag está completo

4. **Compartir Enlaces:**
   - URL del repositorio de GitHub
   - Instrucciones de acceso si es repositorio privado
   - Cualquier información adicional necesaria

### Checklist de Entrega

Antes de entregar, verifica:

- [ ] Código fuente completo y funcional
- [ ] README.md en inglés con todas las secciones requeridas
- [ ] Diagramas incluidos (ER y/o arquitectura)
- [ ] Colección de Postman exportada
- [ ] Variables de entorno documentadas en `.env.example`
- [ ] `.env` NO está en el repositorio
- [ ] No hay credenciales hardcodeadas
- [ ] Todos los endpoints funcionan correctamente
- [ ] Migración funciona y es idempotente
- [ ] Repositorio tiene commits descriptivos
- [ ] Código está bien organizado y comentado donde sea necesario

### Formato de Entrega

**Título del mensaje/email:**
```
[Simulacro M4] Arquitectura de Persistencia Híbrida - SaludPlus
```

**Contenido debe incluir:**
1. Nombre completo
2. Enlace al repositorio de GitHub
3. Breve descripción de decisiones arquitectónicas clave
4. Cualquier nota adicional o dificultades encontradas

---

## 🎓 Reflexión Final

Este simulacro te desafía a pensar como un arquitecto de software, tomando decisiones fundamentadas sobre cómo estructurar y almacenar datos. No hay una única respuesta "correcta", pero sí hay decisiones más acertadas que otras basadas en:

- **Requisitos del negocio:** ¿Qué operaciones son más frecuentes?
- **Características de los datos:** ¿Qué requiere integridad estricta?
- **Escalabilidad:** ¿Cómo crecerá el sistema en el futuro?
- **Mantenibilidad:** ¿Cómo será fácil mantener y evolucionar el sistema?

Recuerda: **La mejor arquitectura es la que resuelve el problema real de manera eficiente y mantenible.**

---

## 📞 Soporte y Preguntas

Si tienes dudas durante el desarrollo:

1. **Consulta la documentación oficial** de las tecnologías utilizadas
2. **Revisa ejemplos** en los recursos proporcionados
3. **Experimenta** con consultas y estructuras antes de implementar
4. **Documenta tus decisiones** en el README para justificar tu enfoque

---

**¡Éxito en el simulacro! 🚀**

*Última actualización: Febrero 2026*
