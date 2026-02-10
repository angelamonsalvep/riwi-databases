# 🗄️ Módulo 4: Persistencia y Bases de Datos
**Clan:** Hamilton  
**Duración:** 3 Semanas (9 Sesiones de Entrenamiento)  
**Stack Previo:** Python, HTML, CSS, JS  
**Objetivo:** Dominar los fundamentos de bases de datos Relacionales (SQL) y No Relacionales (NoSQL), integrándolas con Python.

---

## 📅 SEMANA 1: Fundamentos Relacionales y SQL Nativo
*Objetivo: Romper el miedo al SQL y aprender a pensar en "tablas" y "relaciones".*

### 🟢 Entrenamiento 1: Diseño y Modelado (La Lógica)
**Enfoque:** Aprender a estructurar la información antes de tocar código.
1.  **¿Por qué Bases de Datos?**
    * Diferencia entre Volátil (RAM) vs. Persistente (Disco).
    * Archivos de texto/Excel vs. Bases de Datos (Integridad, Concurrencia, Seguridad).
2.  **Modelo Entidad-Relación (MER):**
    * Entidades (Objetos), Atributos (Características) y Tuplas (Filas).
    * Tipos de datos básicos: `VARCHAR`, `INT`, `BOOLEAN`, `DATE`.
3.  **Diagramado:**
    * Uso de herramientas como *Draw.io* o *dbdiagram.io*.
    * **Práctica:** Diseñar el MER de un sistema de "Matrícula de Coders" (Entidades: Coder, Clan, Mentor).

### 🟢 Entrenamiento 2: DDL (Data Definition Language)
**Enfoque:** Creación de estructuras en la base de datos (PostgreSQL o SQLite).
1.  **Creación de Tablas (`CREATE TABLE`):**
    * Sintaxis básica y buenas prácticas de nomenclatura (snake_case).
2.  **Restricciones (Constraints) - Las reglas del juego:**
    * `PRIMARY KEY` (PK): El identificador único (ej. ID).
    * `NOT NULL`: Campos obligatorios.
    * `UNIQUE`: Evitar duplicados (ej. email).
3.  **Modificación básica:**
    * `DROP TABLE` (y por qué es peligroso).
    * `ALTER TABLE` (Agregar una columna olvidada).

### 🟢 Entrenamiento 3: DML Básico (Data Manipulation Language)
**Enfoque:** El CRUD (Create, Read, Update, Delete) usando SQL puro.
1.  **Insertar datos (`INSERT`):**
    * Insertar filas individuales y múltiples.
2.  **Consultas Simples (`SELECT`):**
    * `SELECT *` vs `SELECT columna1, columna2`.
    * Filtrado con `WHERE` y operadores (`=`, `>`, `<`, `!=`, `AND`, `OR`).
3.  **Actualizar y Borrar (`UPDATE` / `DELETE`):**
    * La importancia vital del `WHERE` para no borrar toda la tabla.
    * **Reto del día:** Crear una tabla de `Videojuegos`, insertar 10, y eliminar los que tengan "rating" menor a 3.

---

## 📅 SEMANA 2: Relaciones, Consultas Avanzadas y Python
*Objetivo: Conectar tablas entre sí y conectar la base de datos con tu código Python.*

### 🟡 Entrenamiento 4: El poder de las Relaciones (Joins)
**Enfoque:** Entender cómo se cruzan los datos (lo más difícil para un junior).
1.  **Llaves Foráneas (`FOREIGN KEY`):**
    * Concepto de integridad referencial (no puedo asignar un Coder a un Clan que no existe).
2.  **Tipos de Joins:**
    * `INNER JOIN`: La intersección (Lo común en ambos).
    * `LEFT JOIN`: Todo lo de la izquierda, coincida o no.
    * Ejemplo visual: Diagramas de Venn.
3.  **Práctica de Joins:** Consultar "Nombre del Coder" y "Nombre de su Clan" en una sola query.

### 🟡 Entrenamiento 5: Consultas Avanzadas y Agregación
**Enfoque:** Hacer que la base de datos trabaje por nosotros (Reportes).
1.  **Funciones de Agregación:**
    * `COUNT()`: Contar registros.
    * `SUM()` / `AVG()`: Sumas y Promedios.
    * `MAX()` / `MIN()`: Valores extremos.
2.  **Agrupamiento (`GROUP BY`):**
    * Ejemplo: "¿Cuántos coders hay *por* clan?".
3.  **Ordenamiento y Límites:**
    * `ORDER BY` (ASC/DESC) y `LIMIT` (Paginación básica).

### 🟡 Entrenamiento 6: Integración Python + SQL (DB Drivers)
**Enfoque:** Controlar la base de datos desde un script de Python.
1.  **Librería `sqlite3` (o `psycopg2`):**
    * Establecer conexión (`connect`).
    * Crear un cursor (`cursor`).
2.  **Ejecución de Queries:**
    * `cursor.execute("SELECT...")`.
    * `fetchall()` vs `fetchone()`.
    * Iterar resultados con bucles `for` en Python.
3.  **Seguridad (Inyección SQL):**
    * Por qué **NUNCA** usar f-strings en queries.
    * Uso correcto de parámetros (`?` o `%s`).

---

## 📅 SEMANA 3: NoSQL y Proyecto Integrador
*Objetivo: Conocer la alternativa moderna (MongoDB) y consolidar todo lo aprendido.*

### 🔴 Entrenamiento 7: Introducción a NoSQL (MongoDB)
**Enfoque:** Aprovechar que saben JavaScript/JSON para enseñar bases de datos de documentos.
1.  **SQL vs NoSQL:**
    * Estructura rígida vs Esquema flexible.
    * Cuándo usar cuál (Relaciones complejas vs Alta velocidad/Volumen).
2.  **Estructura de MongoDB:**
    * Base de Datos -> Colección (Tabla) -> Documento (Fila/Registro).
    * Formato BSON (Binary JSON).
3.  **Atlas o Docker:**
    * Breve setup de un entorno local o en la nube para pruebas.

### 🔴 Entrenamiento 8: CRUD en MongoDB
**Enfoque:** Manipulación de datos usando sintaxis tipo objeto JS.
1.  **Inserción:** `db.coleccion.insertOne({ ... })`.
2.  **Búsqueda:** `db.coleccion.find({ edad: { $gt: 18 } })`.
    * Operadores de Mongo (`$eq`, `$gt`, `$in`).
3.  **Actualización y Borrado:**
    * `updateOne`, `updateMany`, `deleteOne`.
    * Modificadores atómicos (`$set`, `$inc`).

### 🔴 Entrenamiento 9: Taller de Cierre "Full Persistence"
**Enfoque:** Un mini-proyecto para evaluar el módulo.
* **El Reto:** Construir un sistema de **"Gestión de Tareas (ToDo List)"** de consola en Python.
* **Requisitos:**
    1.  Tener un menú: "1. Agregar Tarea, 2. Ver Tareas, 3. Completar Tarea".
    2.  Persistir los datos en una Base de Datos (Elegir SQL o NoSQL según preferencia, o forzar SQL por ser más estricto).
    3.  El código debe separar la lógica de conexión (un archivo `db.py`) de la lógica del programa (`main.py`).
* **Revisión de Código:** Feedback en vivo sobre la estructura y manejo de errores (try/except).

---