# 🚀 Week 3 -- Training 1

# NoSQL Foundations & MongoDB Data Modeling

**Module:** Databases\
**Technology:** MongoDB\
**Level:** Foundational → Applied\
**Goal:** Understand NoSQL philosophy and design real-world
document-based data models.

------------------------------------------------------------------------

# 🎯 Learning Objectives

By the end of this training, the coder will be able to:

-   Explain what a NoSQL database is and why it exists.
-   Compare relational vs NoSQL approaches.
-   Understand MongoDB structure (database, collections, documents).
-   Design a realistic document-based data model.
-   Justify when MongoDB is a better choice than SQL.

------------------------------------------------------------------------

# 📚 Part 1 -- Introduction to NoSQL

## 🔎 What is NoSQL?

NoSQL stands for **"Not Only SQL"**.

It represents a category of databases designed to:

-   Handle large-scale data.
-   Support flexible schemas.
-   Scale horizontally.
-   Store semi-structured or unstructured data.

Unlike relational databases, NoSQL databases do not rely strictly on
tables and fixed schemas.

------------------------------------------------------------------------

# ⚖️ Part 2 -- Relational vs NoSQL

## 🏛 Relational Databases (SQL)

-   Data stored in tables.
-   Strict schema.
-   Relationships via foreign keys.
-   Normalization required.
-   Vertical scaling.

## 📄 NoSQL (MongoDB)

-   Data stored as documents (JSON-like).
-   Flexible schema.
-   Embedded data possible.
-   Denormalization allowed.
-   Horizontal scaling.

------------------------------------------------------------------------

# 🗂 Part 3 -- MongoDB Data Model

## Structure Hierarchy

Server → Database → Collection → Document (JSON)

------------------------------------------------------------------------

## 📄 Example Document

``` json
{
  "name": "Juan",
  "age": 25,
  "skills": ["JavaScript", "MongoDB"],
  "active": true
}
```

------------------------------------------------------------------------

# 🏗 Part 4 -- Data Modeling Scenario

## Programming Academy Example

``` json
{
  "name": "Backend Java",
  "mentor": {
    "name": "Ana Torres",
    "email": "ana@academy.com"
  },
  "coders": [
    {
      "name": "Juan",
      "average_grade": 88
    },
    {
      "name": "Maria",
      "average_grade": 92
    }
  ]
}
```

------------------------------------------------------------------------

# 🧪 Practical Challenges

## Task 1 -- SQL vs MongoDB Decision

Decide which database type fits better and justify:

1.  Banking transaction system\
2.  Social media posts with comments\
3.  Real-time IoT sensor data\
4.  Government tax system

------------------------------------------------------------------------

## Task 2 -- Design a Document Model

Design a MongoDB structure for an **Online Course Platform** including:

-   Courses\
-   Instructors\
-   Students\
-   Reviews\
-   Lessons

You must justify what you embed and what you reference.

------------------------------------------------------------------------

## 🔥 Advanced Challenge

Answer:

-   Why can over-embedding be dangerous?
-   What happens if a document exceeds 16MB?
-   When would MongoDB be a bad choice?

------------------------------------------------------------------------

# 🎓 End of Training 1

Next training: CRUD operations and MongoDB operators.
