# 📝 Semana 1 - Entrenamiento 3: DML y Manipulación de Datos
**Clan:** Hamilton  
**Tema:** Data Manipulation Language (CRUD)  
**Duración:** 2 - 2.5 Horas

---

## 🎯 Objetivo de la Sesión
Ya tenemos la estructura (las tablas). Ahora aprenderemos a llenarlas de información, consultarlas, corregirlas y eliminarlas. Dominaremos el **CRUD** usando SQL Estándar.

---

## 1. ¿Qué es DML?
**DML (Data Manipulation Language)** son los verbos que usamos para interactuar con los datos **dentro** de las tablas.

| Letra CRUD | Comando SQL | Descripción |
| :--- | :--- | :--- |
| **C**reate | `INSERT` | Agrega nuevas filas. |
| **R**ead | `SELECT` | Consulta y busca información (El más usado). |
| **U**pdate | `UPDATE` | Modifica datos existentes. |
| **D**elete | `DELETE` | Borra filas. |

---

## 2. INSERT: Agregando Datos
Es importante respetar el orden de las columnas y los tipos de datos.

### Sintaxis Básica
```sql
INSERT INTO nombre_tabla (columna1, columna2) 
VALUES (valor1, valor2);
```

### Ejemplos Prácticos
Supongamos que tenemos la tabla `videojuegos` creada ayer.

```sql
-- Insertar un solo registro
INSERT INTO videojuegos (titulo, genero, precio, id_desarrollador)
VALUES ('Super Mario Odyssey', 'Plataforma', 59.99, 1);

-- Insertar múltiples registros (Batch Insert) - ¡Más eficiente!
INSERT INTO videojuegos (titulo, genero, precio, id_desarrollador)
VALUES 
    ('Zelda: BOTW', 'Aventura', 59.99, 1),
    ('Halo Infinite', 'Shooter', 40.00, 2),
    ('God of War', 'Accion', 35.50, 3);
```

> **⚠️ Ojo:** Las cadenas de texto (Strings) SIEMPRE van entre comillas simples `'Texto'`. Las comillas dobles `"` se usan para nombres de tablas o columnas (a veces), pero para datos: comillas simples.

---

## 3. SELECT: Consultando Datos (El Arte de Preguntar)
El comando más potente de SQL.

### Lo Básico
```sql
-- Traer TODAS las columnas (No recomendado en producción por rendimiento)
SELECT * FROM videojuegos;

-- Traer solo columnas específicas (Buena práctica)
SELECT titulo, precio FROM videojuegos;
```

### El Filtro Mágico: `WHERE`
Es como el filtro de Excel. Nos permite traer solo lo que cumpla una condición.

```sql
-- Juegos baratos (menores a 40 dolares)
SELECT * FROM videojuegos WHERE precio < 40;

-- Juegos de un género específico
SELECT * FROM videojuegos WHERE genero = 'Aventura';
```

### Operadores Lógicos
| Operador | Significado | Ejemplo |
| :--- | :--- | :--- |
| `=` | Igual a | `genero = 'Accion'` |
| `< >` o `!=` | Diferente de | `genero != 'RPG'` |
| `>` / `<` | Mayor / Menor que | `precio > 100` |
| `AND` | Y (Ambas se cumplen) | `precio > 20 AND genero = 'Shooter'` |
| `OR` | O (Alguna se cumple) | `genero = 'RPG' OR genero = 'Aventura'` |
| `LIKE` | Búsqueda parcial | `titulo LIKE 'Super%'` (Empieza por Super) |

---

## 4. UPDATE: Actualizando Datos (¡PELIGRO! 💀)
Permite corregir información.

### Sintaxis
```sql
UPDATE nombre_tabla 
SET columna = nuevo_valor 
WHERE condicion;
```

### El error del Junior 🤡
```sql
-- ¡ERROR GRAVE! (Olvidé el WHERE)
UPDATE videojuegos SET precio = 0; 
-- Resultado: TODOS los juegos ahora son gratis. Tu jefe te despide.

-- FORMA CORRECTA
UPDATE videojuegos 
SET precio = 25.00 
WHERE titulo = 'God of War';
```

---

## 5. DELETE: Borrando Datos (¡MÁS PELIGRO! 💀💀)
Elimina registros físicos de la base de datos.

### Sintaxis
```sql
DELETE FROM nombre_tabla 
WHERE condicion;
```

### La advertencia
Igual que el UPDATE, si olvidas el `WHERE`, borras **toda** la tabla.
```sql
-- Borrar solo un juego específico
DELETE FROM videojuegos 
WHERE id = 5;
```

---

## 🛠️ Reto Práctico: "Poblando Hamilton"
**Contexto:**
Ayer creaste las tablas `mentores`, `clanes` y `coders`. Hoy vamos a llenarlas de vida.

**Instrucciones:**
Escribe un script SQL que haga lo siguiente en orden estricto (recuerda las llaves foráneas):

1.  **INSERT:**
    * Agrega 2 Mentores (Ej: 'Juan Pérez' de 'Java', 'Maria Gomez' de 'Python').
    * Agrega 2 Clanes (Ej: 'Hamilton' asignado a Maria, 'Lovelace' asignado a Juan).
    * Agrega 5 Coders (3 para Hamilton, 2 para Lovelace). Inventa sus datos.
2.  **UPDATE:**
    * El Coder con ID 1 se cambió de nombre a "Coder Editado". Actualízalo.
    * El Clan 'Lovelace' se mudó al salón "B202". Actualízalo.
3.  **DELETE:**
    * El Coder con ID 3 decidió abandonar el curso. Elimínalo de la base de datos.
4.  **SELECT:**
    * Muestra todos los Coders que pertenecen al Clan 1 (Hamilton).

**Entregable:**
Archivo `.sql` con todas las sentencias ejecutadas y comentadas.

