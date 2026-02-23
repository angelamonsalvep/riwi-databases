# 📚 Módulo 4 -- Bases de Datos

## 🗓 Semana 3 -- MongoDB Intermedio (Nivel Pro para Coders)

------------------------------------------------------------------------

# 🎯 Objetivos de la Semana

Al finalizar esta semana el coder será capaz de:

-   Comprender la arquitectura de MongoDB.
-   Insertar uno o múltiples documentos.
-   Consultar con filtros avanzados.
-   Utilizar operadores de comparación y lógicos.
-   Actualizar documentos.
-   Eliminar registros.
-   Entender buenas prácticas en modelado básico.

------------------------------------------------------------------------

# 1️⃣ ¿Qué es MongoDB?

MongoDB es una base de datos NoSQL orientada a documentos que almacena
información en formato BSON (Binary JSON).

Estructura principal:

-   Base de datos
-   Colección
-   Documento

Ejemplo de documento:

``` js
{
  _id: ObjectId("..."),
  nombre: "Laura",
  stack: "MERN",
  nivel: "Junior",
  experiencia: 1
}
```

------------------------------------------------------------------------

# 2️⃣ Inserciones

## Insertar un documento

``` js
db.coders.insertOne({
  nombre: "Andres",
  stack: "MEAN",
  nivel: "Mid",
  experiencia: 3
})
```

## Insertar múltiples documentos

``` js
db.coders.insertMany([
  { nombre: "Sofia", stack: "MERN", nivel: "Junior", experiencia: 1 },
  { nombre: "Carlos", stack: "Backend", nivel: "Senior", experiencia: 6 }
])
```

------------------------------------------------------------------------

# 3️⃣ Consultas Básicas

``` js
db.coders.find()
```

Buscar por campo específico:

``` js
db.coders.find({ stack: "MERN" })
```

------------------------------------------------------------------------

# 4️⃣ Operadores de Comparación

  Operador   Significado
  ---------- ---------------------------------
  \$gt       Mayor que
  \$lt       Menor que
  \$gte      Mayor o igual
  \$lte      Menor o igual
  \$ne       Diferente
  \$in       Coincide con alguno del arreglo

Ejemplos:

``` js
db.coders.find({ experiencia: { $gt: 2 } })
```

``` js
db.coders.find({ nivel: { $in: ["Senior", "Mid"] } })
```

------------------------------------------------------------------------

# 5️⃣ Operadores Lógicos

  Operador   Función
  ---------- -----------------------
  \$and      Todas las condiciones
  \$or       Alguna condición
  \$not      Negación

Ejemplo:

``` js
db.coders.find({
  $and: [
    { stack: "MERN" },
    { experiencia: { $gte: 2 } }
  ]
})
```

------------------------------------------------------------------------

# 6️⃣ Actualización de Documentos

## Actualizar un campo

``` js
db.coders.updateOne(
  { nombre: "Sofia" },
  { $set: { nivel: "Mid" } }
)
```

## Incrementar valor numérico

``` js
db.coders.updateOne(
  { nombre: "Carlos" },
  { $inc: { experiencia: 1 } }
)
```

------------------------------------------------------------------------

# 7️⃣ Eliminación de Documentos

## Eliminar uno

``` js
db.coders.deleteOne({ nombre: "Andres" })
```

## Eliminar múltiples

``` js
db.coders.deleteMany({ nivel: "Junior" })
```

------------------------------------------------------------------------

# 8️⃣ Buenas Prácticas

-   Evitar documentos excesivamente grandes.
-   Mantener estructura coherente aunque sea flexible.
-   Indexar campos consultados frecuentemente.
-   Evitar duplicación innecesaria de datos.

------------------------------------------------------------------------

# 🧪 Laboratorio Práctico

1.  Crear base de datos `bootcamp_db`.
2.  Crear colección `coders`.
3.  Insertar mínimo 5 coders con diferentes niveles y stacks.
4.  Consultar:
    -   Coders con más de 2 años de experiencia.
    -   Coders Senior o Mid.
5.  Actualizar el nivel de un coder.
6.  Eliminar coders Junior.

------------------------------------------------------------------------

# 📝 Conclusión

En esta semana el coder pasó de operaciones básicas a un manejo
intermedio de MongoDB, comprendiendo consultas avanzadas, operadores y
manipulación completa de documentos.

Este conocimiento permite comenzar a integrar MongoDB en aplicaciones
backend modernas.
