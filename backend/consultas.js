const bbdd = require('./bd/bd')

const obtenerPost = async() => {
    const {rows} = await bbdd.query("SELECT * FROM posts");
    return rows
}

const agregarPost = async(titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts VALUES(DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    const result = await bbdd.query(consulta, values)
}


module.exports = { agregarPost, obtenerPost }