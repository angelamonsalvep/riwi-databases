# 🗄️ Semana 1 - Entrenamiento 1: Fundamentos y Diseño de Base de Datos
**Clan:** Hamilton  
**Tema:** Introducción a la Persistencia y Modelado de Datos  
**Duración:** 2 - 3 Horas

---

## 🎯 Objetivo de la Sesión
Comprender por qué necesitamos bases de datos, cómo se estructuran lógicamente y cómo traducir un problema del mundo real a un diagrama de Entidad-Relación (MER).

---

## 1. El Problema: ¿Dónde guardamos los datos?
Hasta ahora, sus programas en Python y JS tienen "amnesia". Cuando cierras la terminal o recargas la página, las variables mueren.

### Memoria Volátil (RAM) vs. Persistente (Disco)
* **Variables (RAM):** Son rápidas pero efímeras. Viven mientras corre el script.
* **Archivos (.txt, .csv, .json):** Guardan datos, pero tienen problemas graves:
    * *Concurrencia:* ¿Qué pasa si dos coders intentan editar el mismo archivo al mismo tiempo? (Error o corrupción).
    * *Integridad:* Nada te impide escribir "Patata" en el campo de `Edad`.
    * *Velocidad:* Para buscar un dato, tienes que leer todo el archivo.

### La Solución: Base de Datos Relacional (RDBMS)
Imagina un Excel, pero con esteroides, reglas estrictas y superpoderes de seguridad.
* **PostgreSQL, MySQL, SQLite, Oracle:** Son sistemas gestores que garantizan que tus datos sobrevivan, sean correctos y accesibles simultáneamente.

---

## 2. Anatomía de una Base de Datos (Traducción Python -> SQL)
Aprovechemos que ya saben Programación Orientada a Objetos (POO).

| Concepto en Base de Datos | Concepto en Python (POO) | Concepto en Excel | Descripción |
| :--- | :--- | :--- | :--- |
| **Tabla (Table)** | Clase (`class Coder`) | Una Hoja de cálculo | El molde o estructura general. Agrupa cosas del mismo tipo. |
| **Columna (Attribute/Field)** | Atributo (`self.nombre`) | Encabezado de columna (A, B, C) | Las características que guardamos (Nombre, Edad, Email). Tienen un **Tipo de Dato**. |
| **Fila (Row/Record/Tuple)** | Objeto/Instancia (`coder1`) | Una fila (1, 2, 3...) | Un registro único y concreto con información. |

### Tipos de Datos Comunes (Standard SQL)
A diferencia de JS donde `let x` puede ser cualquier cosa, aquí somos estrictos:
* `VARCHAR(n)` / `TEXT`: Texto (Nombres, emails).
* `INTEGER` / `INT`: Números enteros (Edad, Stock).
* `DECIMAL` / `FLOAT`: Dinero, pesos, medidas.
* `BOOLEAN`: Verdadero/Falso (Activo, Admin).
* `DATE` / `DATETIME`: Fechas y horas.

---

## 3. Las Reglas del Juego: Llaves (Keys)
Para que una base de datos funcione, necesitamos identificar cada registro de forma única.

### 🔑 Primary Key (PK) - La Llave Primaria
Es el **DNI** del registro.
* Debe ser **ÚNICO** (No puede haber dos registros con el mismo ID).
* Debe ser **NOT NULL** (No puede estar vacío).
* *Ejemplo:* `id_coder`, `numero_cedula`, `sku_producto`.

### 🔗 Foreign Key (FK) - La Llave Foránea
Es el **puente** entre dos tablas.
* Es una columna en una tabla que apunta a la PK de otra tabla.
* *Ejemplo:* En la tabla `Coders`, tenemos una columna `id_clan`. Ese `id_clan` es una FK que apunta a la tabla `Clanes`.

---

## 4. Modelado de Datos: Diagrama Entidad-Relación (MER)
Antes de escribir código, **dibujamos**. Usamos cajas y líneas para modelar la realidad.

### Tipos de Relaciones (Cardinalidad)
1.  **Uno a Uno (1:1):**
    * Un `Ciudadano` tiene un `Pasaporte`. (Y un pasaporte pertenece a un solo ciudadano).
    * *Poco común, suelen unirse en una sola tabla.*
2.  **Uno a Muchos (1:N) - LA MÁS COMÚN:**
    * Un `Clan` tiene muchos `Coders`. (Pero un Coder pertenece a un solo Clan).
    * *Regla:* La FK va en el lado del "Muchos" (La tabla `Coders` lleva el `id_clan`).
3.  **Muchos a Muchos (N:M):**
    * Un `Estudiante` inscribe muchas `Materias`. Una `Materia` tiene muchos `Estudiantes`.
    * *Regla:* **¡PELIGRO!** No se puede representar directamente. Se necesita una **Tabla Intermedia** (o tabla pivote) que rompa la relación en dos de 1:N.

---

## 🛠️ Taller Práctico: "Diseñando Riwi-Flix"
**Contexto:** Vamos a diseñar la base de datos para una plataforma de streaming sencilla.

### Ejercicio 1: Identificar Entidades y Atributos
*Instrucciones:* En papel o pizarra, lista qué objetos necesitamos y sus datos.
* **Usuarios:** (id, email, password, fecha_nacimiento)
* **Películas:** (id, titulo, duracion, año_estreno)
* **Géneros:** (id, nombre_genero) -> *Ej: Terror, Comedia*

### Ejercicio 2: Definir Relaciones
*Instrucciones:* Conecta las entidades con flechas y define si es 1:1, 1:N o N:M.
1.  **Película - Género:** Una película puede ser de "Acción" y "Comedia". Un género tiene muchas películas. -> **N:M**
2.  **Usuario - Perfil:** Un usuario tiene un perfil de configuración. -> **1:1**
3.  **Usuario - Película (Favoritos):** Un usuario marca muchas favoritas. Una película es marcada por muchos. -> **N:M**

### Ejercicio 3: Dibujar el Diagrama (Normalización Básica)
Usa **Draw.io** o papel.

**Solución Esperada (Estructura de tablas):**
1.  Tabla `Usuarios` (`id_user` [PK], `email`...)
2.  Tabla `Generos` (`id_genero` [PK], `nombre`...)
3.  Tabla `Peliculas` (`id_pelicula` [PK], `titulo`, `id_genero` [FK]*)
    * *(Nota: Si simplificamos a que una película tiene un solo género principal, es 1:N).*
4.  Tabla Intermedia `Lista_Favoritos` (`id_user` [FK], `id_pelicula` [FK])
    * *Esta tabla conecta Usuarios con Películas.*

---

## 🧠 Reto Mental (Homework)
Para el próximo entrenamiento, trae diseñado en papel el diagrama ER de un **Sistema de E-commerce simplificado**:
1.  **Clientes** (Compran cosas).
2.  **Productos** (Tienen precio y stock).
3.  **Pedidos** (Un cliente hace un pedido, un pedido tiene muchos productos).
    * *Pista: ¿Dónde guardas la cantidad de cada producto en un pedido? Necesitas una tabla intermedia `Detalle_Pedido`.*

---

### 📚 Glosario Rápido
* **Query:** Una consulta o petición a la base de datos.
* **Null:** Ausencia de valor (no es cero, ni espacio vacío, es "nada").
* **Constraint:** Restricción o regla (ej. "el precio no puede ser negativo").