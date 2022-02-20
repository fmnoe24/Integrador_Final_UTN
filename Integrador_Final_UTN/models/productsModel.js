'use strict';
const pool = require("../database");

//Funcion que trae todos los datos de la BD
const traerservicios = async () => {
    try {
        const query = "SELECT * FROM servicios";
        const datos = await pool.query(query);
        return datos;
        
    } catch(error) {
        console.log(error)
    }   
};

//Funcion  para traer productos segun su ID
const traerId = async (id) => {
    try {
        const query = "SELECT * FROM servicios WHERE id = ?";
        const dato = await pool.query(query, [id]);
        return dato;
    } catch (error) {
        console.log(error);
    }
};

//Funcion agregar un nuevo servicio/producto
const agregarProducto = async (data) => {
    try {
        const query = "INSERT INTO servicios SET ?";
        const dato = await pool.query(query, [data]);
        return dato;
    } catch (error) {
        console.log(error);
    }
};

//Funcion para editar un servicio/producto (Esto recibe un Objeto con los nuevos valoresy el id)

const editarProducto = async (data, id) => {
    try {
        const query = "UPDATE servicios SET ? WHERE id = ?";
        const dato = await pool.query(query, [data, id]);
        return dato;
    } catch (error) {
        console.log(error);
    }
};

//Funcion para borrar servicio/producto

const eliminarProducto = async (id) => {
    const query = "DELETE FROM servicios WHERE id= ?";
    const dato = await pool.query(query, [id]);
    return dato;
}
module.exports = {traerservicios, agregarProducto, traerId, eliminarProducto, editarProducto}