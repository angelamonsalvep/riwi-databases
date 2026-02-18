# 📊 Semana 2 - Entrenamiento 3: Agregación y Agrupación
**Clan:** Hamilton  
**Tema:** Análisis de Datos (COUNT, SUM, GROUP BY, HAVING)  
**Duración:** 2 - 2.5 Horas

---

## 🎯 Objetivo de la Sesión
Dejar de ver filas individuales y empezar a ver estadísticas.

## 1. Funciones de Agregación
COUNT, SUM, AVG, MIN, MAX.

## 2. GROUP BY
```sql
SELECT id_clan, COUNT(*) AS total_alumnos
FROM coders
GROUP BY id_clan;
```

## 3. HAVING
```sql
SELECT id_clan, COUNT(*) as total
FROM coders
GROUP BY id_clan
HAVING COUNT(*) > 20;
```

## 🛠️ Reto Práctico
Dashboard ejecutivo con métricas.
