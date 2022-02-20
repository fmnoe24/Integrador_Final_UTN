const pool = require("../database");
const md5 = require("md5");

const traerUsuario = async (user, password) => {
    const consulta = 'SELECT * FROM usuarios WHERE user =? AND password =?';
    const dato = await pool.query(consulta, [user, md5(password)]);
    return dato[0];
};

module.exports = {traerUsuario}