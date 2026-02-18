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
SELECT nombre, edad FROM coders ORDER BY nombre ASC;
SELECT nombre, edad FROM coders ORDER BY edad DESC;
SELECT * FROM coders ORDER BY id_clan ASC, nombre ASC;
```

---

## 2. Paginación: `LIMIT` y `OFFSET`

```sql
SELECT * FROM coders ORDER BY edad ASC LIMIT 5;
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

---

# 🛠️ Reto Profesional: Buscador Inteligente de la Academia

### Contexto
Estás construyendo el backend del panel administrativo de la academia.

### Tablas
```sql
coders(id, nombre, edad, fecha_ingreso, id_clan, salario)
clanes(id, nombre)
videojuegos(id, nombre, precio, categoria)
```

## Parte A – Ranking Salarial
1. Muestra los 5 coders con mayor salario.
2. Debe mostrar nombre, salario y nombre del clan.
3. Ordenar de mayor a menor salario.

## Parte B – Buscador de Personas
1. Encuentra coders cuyo nombre empiece por "A" o termine por "n".
2. Ordenar alfabéticamente.
3. Mostrar nombre y fecha_ingreso.

## Parte C – Catálogo Filtrado
1. Videojuegos con precio entre $30 y $60.
2. Ordenar del más barato al más caro.
3. Mostrar nombre, precio y categoría.

## Parte D – Filtro Estratégico
1. Coders de clanes 1, 3 o 5.
2. Mostrar nombre, edad y nombre del clan.
3. Ordenar por clan y luego por nombre.
