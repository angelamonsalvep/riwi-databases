import express from 'express'
import { dbConnection } from './lib/database.js'
import Doctor from './models/users.js'

const app = express()

app.get('/user', async (req, res) => {
    //conexion con db

    dbConnection()
    const result = await Doctor.find()
    console.log(result)

    res.json(result)

  /* res.json([{
    name:"Andrea",
    lastname: "Lizcano"
  },
  {
    name:"Camilo",
    lastname: "Gomez"
  },
  {
    name:"Andrea",
    lastname: "Lizcano"
  }]) */
})

app.post('/user', (req, res) => {

  res.json({
    "mesagge": "este es un post"
  })
})

app.put('/user', (req, res) => {

  res.json({
    "mesagge": "este es un put"
  })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})