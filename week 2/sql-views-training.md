# 🏛️ Entrenamiento: Bases de Datos - Módulo 4
**Sección:** Capas de Abstracción y Reportes
**Enfoque:** Trabajo con Vistas (Views)

---

## Trabajo con Vistas (Views en Entornos Reales)

> Las vistas son una de las herramientas más importantes en sistemas reales:  
> permiten **simplificar consultas complejas, estandarizar reportes y mejorar la mantenibilidad**.

En este entrenamiento, las vistas se usarán como capa de abstracción entre los datos crudos y los reportes de negocio.

---

### Objetivos de esta sección

Al finalizar esta sección, el coder será capaz de:

* **Crear** vistas que integren información de múltiples tablas.
* **Utilizar** vistas como si fueran tablas reales para consultas de lectura.
* **Decidir** críticamente cuándo es conveniente usar una vista y cuándo no.
* **Explicar** el impacto de las vistas en el rendimiento y mantenimiento a largo plazo de una base de datos.

---

### Reglas Obligatorias para las Vistas

Para aprobar esta sección, cada coder debe cumplir con el siguiente estándar:

* Crear como mínimo **3 vistas funcionales**.
* Cada vista debe incluir obligatoriamente:
    * Al menos **1 JOIN**.
    * Al menos **1 función de agregación** (`SUM`, `AVG`, `COUNT`, etc.).

---

### Vistas Requeridas

#### 1. Vista de Rendimiento General
**Nombre sugerido:** `vista_rendimiento_coders`

Esta vista debe consolidar la información académica básica. Debe mostrar:
* Nombre completo del Coder.
* Nombre de la Cohorte.
* Nombre del Mentor asignado.
* Promedio general de notas.
* Número total de evaluaciones realizadas.

#### 2. Vista de Alertas Académicas
**Nombre sugerido:** `vista_alertas_academia`

Filtro crítico para la toma de decisiones. Debe mostrar **solo**:
* Coders con un promedio inferior a **70**.
* Cohorte.
* Mentor.
* **Orden:** Del promedio más bajo al más alto.

#### 3. Vista de Top Desempeño
**Nombre sugerido:** `vista_top_coders`

Reconocimiento de excelencia. Debe mostrar:
* Coders con un promedio superior a **90**.
* Cohorte.
* Mentor.
* **Orden:** Del promedio más alto al más bajo.

---

### Uso Obligatorio de las Vistas

En un entorno profesional, la capa de datos suele estar protegida. Por lo tanto, todas las consultas finales de análisis en este reto deben:

1.  Consumir datos exclusivamente a través de las **vistas**.
2.  **No consultar directamente** las tablas base (tablas físicas).

**Ejemplo conceptual:**
```sql
-- Consulta correcta usando la capa de abstracción
SELECT * FROM vista_rendimiento_coders 
WHERE promedio > 85;
```
---

### Preguntas de Defensa (Entrevista Técnica)

Durante la revisión, cada coder debe ser capaz de defender su trabajo respondiendo con claridad técnica a los siguientes puntos:

* **Naturaleza:** * ¿Por qué se dice que una vista no almacena datos físicamente?
* **Rendimiento:** * ¿En qué escenarios específicos una vista podría empeorar el rendimiento de una consulta?
* **Diferenciación:**
    * ¿Cuál es la diferencia fundamental entre una **Vista** y una **Tabla física**?
    * ¿Qué ventaja competitiva tiene usar una **Vista** sobre una **Consulta directa** recurrente en un entorno de producción?
* **Integridad y Dependencias:** * ¿Qué sucedería técnicamente con tus vistas si se elimina una de las tablas base involucradas en su definición inicial?