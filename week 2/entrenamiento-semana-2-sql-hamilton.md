# Entrenamiento Semana 2: El Poder de SQL  
**Módulo:** Bases de Datos  
**Clan:** Hamilton  
**Objetivo General:** Dominar el lenguaje estructurado de consultas en entornos relacionales.

## Objetivos de Aprendizaje (Medibles)
- Categorizar comandos SQL en sus respectivas familias (DDL, DML, DQL).
- Construir estructuras de datos relacionales con integridad.
- Ejecutar reportes con agregaciones y joins.
- Optimizar consultas usando vistas.

## Parte 1: Arquitectura y Definición (DDL)
SQL define la estructura de la base de datos.

```sql
CREATE TABLE departamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE empleados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salario DECIMAL(10,2),
    departamento_id INT,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);
```

## Parte 2: Manipulación y Consultas (DML & DQL)

```sql
INSERT INTO departamentos (nombre) VALUES ('Desarrollo'), ('Diseño');

SELECT nombre, email FROM empleados
WHERE salario > 2500
ORDER BY nombre ASC
LIMIT 5;
```

## Parte 3: Relaciones Avanzadas

```sql
SELECT e.nombre, d.nombre AS departamento
FROM empleados e
INNER JOIN departamentos d
ON e.departamento_id = d.id;
```

## Retos Prácticos Avanzados (Hamilton Challenge PRO)

> Estos retos simulan escenarios reales de una empresa de tecnología.  
> No basta con que funcionen: deben estar **bien modelados, normalizados y optimizados**.

---

### Reto 1: El Arquitecto de Datos (DDL Avanzado)

Diseña la base de datos de una **Academia de Programación** con las siguientes reglas:

#### Tablas mínimas obligatorias:
- Mentores  
- Cohortes  
- Coders  
- Evaluaciones  

#### Reglas de negocio:
- Un Coder pertenece **a una sola Cohorte**.
- Una Cohorte puede tener **muchos Coders**.
- Un Mentor puede liderar **varias Cohortes**.
- Un Coder puede tener **muchas Evaluaciones**.

#### Restricciones técnicas obligatorias:
- Todas las tablas deben tener:
  - `PRIMARY KEY`
  - Al menos una `FOREIGN KEY`
- Usar:
  - `NOT NULL`
  - `UNIQUE`
  - `CHECK`
- No permitir:
  - Coders sin Cohorte
  - Evaluaciones sin Coder

---

## Generación de Datos (Seed Profesional)

> En este entrenamiento NO se entregan datos completos.  
> El objetivo es que el coder aprenda a **diseñar y generar datos realistas**, como en un entorno profesional.

Esta sección es obligatoria para poder resolver los retos de análisis.

---

### Reglas Mínimas del Seed

Cada coder debe generar como mínimo:

- 3 mentores  
- 4 cohortes  
- 10 coders  
- 30 evaluaciones  

---

### Condiciones Técnicas Obligatorias

Los datos deben cumplir:

- Debe existir al menos:
  - 1 mentor sin cohortes.
  - 1 cohorte sin coders.
  - 1 coder sin evaluaciones.
- Debe existir:
  - 1 coder con promedio mayor a 95.
  - 1 coder con promedio menor a 65.
- No se permiten:
  - Emails duplicados.
  - Coders sin cohorte.
  - Evaluaciones sin coder.

---

### Reglas de Realismo

Los datos deben simular una academia real:

- Nombres reales.
- Correos con formato válido.
- Notas entre 0 y 100.
- Cohortes con nombres coherentes.

Ejemplos válidos:
- Backend Java  
- Frontend React  
- Data SQL  
- DevOps  

---

### Entregables del Seed

Cada coder debe entregar:

1. Archivo `seed.sql` con todos los `INSERT`.
2. Evidencia de ejecución sin errores.
3. Mínimo:
   - 5 consultas propias de validación.
   - 1 vista creada usando sus datos.

---

### Criterio de Evaluación del Seed

Se evaluará:

- Calidad del modelado.
- Coherencia de los datos.
- Uso correcto de llaves foráneas.
- Capacidad de explicar:
  - Por qué creó esos datos.
  - Qué casos límite está cubriendo.

---

### Reto 2: El Analista de Negocio (DQL Real)

Construye consultas que respondan:

1. ¿Cuál es el mentor con **mejor promedio de notas**?
2. ¿Cuál cohorte tiene el **mayor número de coders activos**?
3. Lista los coders cuyo promedio esté **por debajo del promedio general**.
4. Muestra el **Top 5 de coders** con mejor rendimiento histórico.

Todas las consultas deben usar:
- `JOIN`
- `GROUP BY`
- `HAVING`
- Funciones de agregación

---

### Reto 3: El Ingeniero de Performance (Vistas + Optimización)

Crea las siguientes vistas:

#### 1. `vista_rendimiento_coders`
Debe mostrar:
- Nombre del coder  
- Cohorte  
- Mentor  
- Promedio de notas  
- Número de evaluaciones  

#### 2. `vista_alertas_academia`
Debe mostrar solo:
- Coders con promedio **menor a 70**
- Ordenados del peor al mejor

---

### Reto 4: El Auditor (Consultas Críticas)

Responde:

- ¿Existen coders sin evaluaciones?
- ¿Hay cohortes sin coders?
- ¿Hay mentores sin cohortes?

Estas consultas deben devolver **datos reales**, no solo `COUNT(*)`.

---

### Reto Final: Simulación de Entrevista

El coder debe ser capaz de explicar:

- Por qué usó cada `FOREIGN KEY`.
- Qué pasaría si se elimina una Cohorte.
- Diferencia real entre:
  - `WHERE` vs `HAVING`
  - `INNER JOIN` vs `LEFT JOIN`
- En qué casos una Vista **mejora rendimiento** y en cuáles **no**.

---

## Criterio de Aprobación PRO

Un coder aprueba este challenge si:

- No existen datos huérfanos.
- Todas las relaciones están normalizadas.
- Las consultas funcionan con más de **10,000 registros simulados**.
- Puede defender su modelo como si estuviera en una entrevista real.

