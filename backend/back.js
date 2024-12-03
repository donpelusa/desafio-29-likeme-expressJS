require('dotenv').config()
const { obtenerPost, agregarPost } = require('./consultas')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerPost();
        res.json(posts);
      } catch (error) {
        console.error("Error obteniendo posts:", error);
        res.status(500).json({ mensaje: "Error obteniendo posts" });
      }
    })

app.post("/posts", async (req, res) => {
    try {
        const { titulo, img, descripcion } = req.body;
        await agregarPost(titulo, img, descripcion);
        res.status(201).send("Post agregado con éxito");
    } catch (error) {
        console.error("Error agregando post:", error);
        res.status(500).json({ mensaje: "Error agregando post" });
    }
})


const { PORT } = process.env

app.listen(PORT || 3000, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
})