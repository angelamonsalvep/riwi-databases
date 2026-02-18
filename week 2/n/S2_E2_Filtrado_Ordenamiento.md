# 🔍 Semana 2 - Entrenamiento 2: Filtrado Avanzado y Ordenamiento
**Clan:** Hamilton  
**Tema:** Refinando las consultas (ORDER BY, LIMIT, LIKE, BETWEEN)  
**Duración:** 2 Horas

---

## 🎯 Objetivo de la Sesión
Ya sabemos hacer `SELECT`. Ahora aprenderemos a traer **exactamente** lo que necesitamos, ordenado como queremos y buscando patrones complejos. Es la diferencia entre "traer datos" y "traer información útil".

---

## 1. Poniendo Orden: `ORDER BY`
Por defecto, SQL te devuelve los datos en el orden que quiere. Para controlarlo:

```sql
-- Orden Ascendente (A-Z, 0-9) - Es el default
SELECT nombre, edad FROM coders ORDER BY nombre ASC;

-- Orden Descendente (Z-A, 9-0)
SELECT nombre, edad FROM coders ORDER BY edad DESC;

-- Multi-criterio: Ordena por Clan, y dentro de cada clan, por nombre
SELECT * FROM coders ORDER BY id_clan ASC, nombre ASC;
```

---

## 2. Paginación: `LIMIT` y `OFFSET`
Fundamental para el desarrollo web (Frontend).  

```sql
-- Traer solo los 5 coders más jóvenes
SELECT * FROM coders ORDER BY edad ASC LIMIT 5;

-- Saltarse los primeros 5 y traer los siguientes 5 (Página 2)
SELECT * FROM coders ORDER BY edad ASC LIMIT 5 OFFSET 5;
```

---

## 3. Operadores Lógicos Avanzados

### A. Rangos: `BETWEEN`
```sql
SELECT * FROM videojuegos WHERE precio BETWEEN 20 AND 50;
SELECT * FROM coders WHERE fecha_ingreso BETWEEN '2025-01-01' AND '2025-03-30';
```

### B. Listas: `IN`
```sql
SELECT * FROM coders WHERE id_clan IN (1, 2, 5);
```

### C. Patrones de Texto: `LIKE`
```sql
SELECT * FROM coders WHERE nombre LIKE 'J%';
SELECT * FROM coders WHERE nombre LIKE '%ez';
SELECT * FROM coders WHERE nombre LIKE '%an%';
```

## 🛠️ Reto Práctico: "El Buscador de Hamilton"
1. Top 3 Salarios  
2. Búsqueda por nombre  
3. Rango de precios  
4. Filtro por clanes
