# 📊 Semana 2 - Entrenamiento 3: Agregación y Agrupación
**Clan:** Hamilton  
**Tema:** Análisis de Datos (COUNT, SUM, GROUP BY, HAVING)  
**Duración:** 2 - 2.5 Horas

---

## 🎯 Objetivo de la Sesión
Dejar de ver filas individuales y empezar a ver **estadísticas**.

---

## 1. Funciones de Agregación

| Función | Ejemplo |
|--------|--------|
| COUNT | SELECT COUNT(*) FROM coders; |
| SUM | SELECT SUM(salario) FROM coders; |
| AVG | SELECT AVG(edad) FROM coders; |
| MIN | SELECT MIN(salario) FROM coders; |
| MAX | SELECT MAX(salario) FROM coders; |

---

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

---

# 🛠️ Reto Profesional: Dashboard Ejecutivo del CEO

## Parte A – Métricas Globales
1. Total de coders.
2. Salario promedio.
3. Edad mínima y máxima.

## Parte B – Reporte por Clan
1. Nombre del clan.
2. Cantidad de coders.
3. Salario promedio por clan.
4. Ordenar por cantidad descendente.

## Parte C – Clanes Críticos
1. Mostrar clanes con menos de 3 coders.
2. Mostrar nombre del clan y cantidad.
3. Ordenar del más pequeño al más grande.

## Parte D – Reto Nivel Entrevista
Mostrar clanes cuyo salario promedio sea mayor al salario promedio global.
