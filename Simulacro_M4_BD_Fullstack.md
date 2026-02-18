# 🧪 Simulacro Prueba de Desempeño  
## Módulo 4 – Bases de Datos Fullstack  
**Clan:** Hamilton  
**Duración máxima:** 8 horas  
**Modalidad:** Individual  

---

## 🎯 Objetivo General

Desarrollar una aplicación web Fullstack que permita gestionar entrenamientos técnicos de una empresa, utilizando:

- Frontend SPA con Vite + JavaScript + HTML + CSS.
- Backend con Node.js + Express.
- Base de datos relacional (MySQL o PostgreSQL).
- Base de datos NoSQL (MongoDB).

El objetivo es evaluar la capacidad del coder para:

- Diseñar bases de datos reales.
- Crear consultas SQL complejas.
- Exponerlas vía API.
- Consumirlas desde el frontend.
- Integrar SQL y NoSQL en una misma solución.

---

## 🧠 Contexto del Proyecto

La empresa **DataTrain Corp** necesita una plataforma interna para:

- Registrar empleados.  
- Gestionar entrenamientos.  
- Controlar sesiones.  
- Asignar inscripciones.  
- Calificar desempeño.  
- Registrar feedback y logs.  
- Generar reportes avanzados.  

---

## 🧩 PARTE 0 – DER (OBLIGATORIO)

Antes de escribir código, el coder debe entregar un **DER (Diagrama Entidad-Relación)** que incluya:

- Todas las entidades SQL.
- Claves primarias.
- Claves foráneas.
- Cardinalidades.
- Columnas con nombres reales.
- Tipos de datos propuestos.

### Herramientas sugeridas
- draw.io  
- dbdiagram.io  
- MySQL Workbench  

### Entregable
El DER debe guardarse en:

/docs/DER.png

Si no existe DER, el proyecto se considera incompleto.

---

## 🗂️ Estructura del Proyecto

/frontend  
/backend  
/sql  
/mongo  
/docs  
README.md

---

## 🛠️ PARTE 1 – Modelo Relacional (SQL)

Tablas mínimas obligatorias:

- employees  
- trainings  
- sessions  
- enrollments  
- grades  

Relaciones mínimas:

- Un employee tiene muchos enrollments.  
- Un training tiene muchas sessions.  
- Un enrollment tiene una grade.  

---

## 🛠️ PARTE 2 – Modelo NoSQL (MongoDB)

Colecciones mínimas:

### feedback
```json
{
  "employeeId": 1,
  "trainingId": 2,
  "comment": "Excelente contenido",
  "rating": 5,
  "createdAt": "2026-02-18"
}
```

### logs
```json
{
  "action": "CREATE_TRAINING",
  "user": "admin",
  "timestamp": "2026-02-18 10:30"
}
```

---

## 🧪 PARTE 3 – Consultas SQL Obligatorias

1. Top 5 empleados con mejor promedio.  
2. Entrenamientos con más inscritos.  
3. Empleados sin calificaciones.  
4. Promedio por entrenamiento.  
5. Sesiones entre dos fechas.  
6. Empleados con más de 3 entrenamientos.  
7. Entrenamientos sin inscritos.  
8. Ranking general de desempeño.  
9. Última sesión de cada entrenamiento.  
10. Empleado con peor desempeño.  

### Condición Crítica

Ninguna consulta puede quedar solo en SQL.

Todas deben:

- Estar implementadas como endpoints en Express.  
- Ser consumidas desde el frontend.  
- Ser visualizadas con interfaz.  

Consultas en consola **NO cuentan**.

---

## 👁️ PARTE 4 – Vistas SQL (OBLIGATORIAS)

Crear mínimo:

```sql
CREATE VIEW v_employee_performance AS ...
CREATE VIEW v_training_stats AS ...
```

Estas vistas deben:

- Tener endpoints propios.  
- Ser consumidas desde el frontend.  
- Mostrar datos reales.  

---

## 🌐 PARTE 5 – Backend (Express)

### Employees
- GET /employees  
- POST /employees  
- GET /employees/:id/report  

### Trainings
- GET /trainings  
- POST /trainings  
- GET /trainings/:id/stats  

### Reports
- GET /reports/top-employees  
- GET /reports/worst-employee  
- GET /reports/ranking  
- GET /reports/empty-trainings  

### Feedback (Mongo)
- POST /feedback  
- GET /feedback/:employeeId  

---

## 🎨 PARTE 6 – Frontend SPA

Debe incluir:

- Dashboard con métricas.  
- CRUD de empleados.  
- CRUD de entrenamientos.  
- Vista de reportes SQL.  
- Vista de feedback Mongo.  
- Formularios con validaciones.  

Cada consulta SQL debe tener una pantalla.

---

## 📦 PARTE 7 – Requisitos Técnicos

Se debe evidenciar uso de:

- INNER JOIN  
- LEFT JOIN  
- GROUP BY  
- HAVING  
- Subconsultas  
- Vistas  
- Manejo de errores backend  
- Validaciones frontend  
- Variables de entorno  

---

## 📚 Librerías Permitidas

### MongoDB
- Mongoose  

### SQL
- MySQL: mysql2  
- PostgreSQL: pg  
- Opcional: knex.js  

### Prohibido
- Sequelize  
- Prisma  
- TypeORM  
- Objection  
- MikroORM  

---

## 📝 PARTE 8 – Entregables

/frontend  
/backend  
/sql/database.sql  
/mongo/collections.json  
/docs/DER.png  
README.md  

---

## 🏁 PARTE 9 – Criterios de Evaluación

| Criterio | % |
|---------|----|
| DER | 10 |
| Modelo SQL | 15 |
| Consultas SQL | 25 |
| Vistas SQL | 10 |
| Backend | 20 |
| Frontend | 10 |
| SQL + Mongo | 10 |

---

## 🧠 DISEÑO GUIA

[Haz clic aquí para ver el diseño en Figr](https://app.figr.design/artifacts/2b4955ab-606f-45f3-9b1d-00b1fa5341bb)

---

## 🧠 BONUS (No obligatorio)

- Exportar reportes PDF.  
- Gráficas JS.  
- Autenticación básica.  
- Filtros dinámicos.  
- Dark mode.  

---

## ⏱️ Tiempo sugerido

| Fase | Tiempo |
|------|--------|
| DER | 1h |
| SQL | 2h |
| Backend | 2h |
| Frontend | 2h |
| Pruebas | 1h |
