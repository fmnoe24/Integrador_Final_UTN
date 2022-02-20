'use strict';
const express = require("express");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);
const router = express.Router();
const productsModel = require("../models/productsModel");

router.get("/servicios", async (req, res) => {
    const servicios = await productsModel.traerservicios();
    // console.log(data)
    const data = servicios.map((registro) => {
        const imgURL = cloudinary.url(registro.image);
        return {...registro, imgURL};
    });
    // res.render("servicios", {data});
    // console.log(data);
    res.render("servicios", {data});
});



router.get("/listado", async (req, res) => {
    // const data = await productsModel.traerservicios();
    // res.render("listado", {data});
    const servicios = await productsModel.traerservicios();
    const data = servicios.map((registro) => {
        const imgURL = cloudinary.url(registro.image, {
            width: 100,
            height: 100,
            crop: "fill"
        });
        return {...registro, imgURL};
    });
    res.render("listado", {data});
});

//ruta para agregar items
router.get("/agregarItem", (req, res) => {
    res.render("agregarItem")
});


//Tenemos que enviar el archivo a Cloudinary y caundo este subido, le pedimos a Cloud, que nos de el ID de la image, la cual la //guardaremos en la BD, junto con los datos ingresados en el formulario
router.post("/agregarItem",async (req, res) => {
//Enviamos la IMG a Cloudinary y obtenemos la URL
    let guardarImg = req.files.image;
    const img_id = (await uploader(guardarImg.tempFilePath)).public_id
//Enviamos todos los datos, incluyendo el id de la img cargada en cloudinary a la BD
    await productsModel.agregarProducto({...req.body, image: img_id});
    res.redirect("/listado");
});

//Controlador de ruta que muestra el producto apra editarlo o borrarlo (Asi no hacemos 2 controladores)
router.get("/editarItem/:id", async (req, res) => {
    const dato= await productsModel.traerId(req.params.id);
    const producto = {
        id: dato[0].id,
        nombre: dato[0].nombre,
        descripcion: dato[0].descripcion,
        image: dato[0].image,
        duracion: dato[0].duracion,
        disponible: dato[0].disponible,
        precio: dato[0].precio,
    };
    res.render("editarItem", {producto});
});

//Controlador para editar un registro

router.post("/editarItem", async (req, res) => {
    let img_id = null;
    if(!req.files){
        img_id = req.body.ImgActual;
    }else {
        const dato = await productsModel.traerId(req.body.id);
        await destroy(dato[0].image);
        const guardarImg = req.files.image;
        img_id = (await uploader(guardarImg.tempFilePath)).public_id;
    }
    const data = {
        id: req.body.id,
        nombre: req.body.nombre,
        image: img_id,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        disponible: req.body.disponible,
        precio: req.body.precio,
    };
    await productsModel.editarProducto(data, data.id);
    res.redirect("/listado");   
});

//Controlador para Eliminar un registro, que recibe ID por Param

router.get("/eliminarProducto/:id", async (req, res) => {
    const dato = await productsModel.traerId(req.params.id);
    await destroy(dato[0].image);
    await productsModel.eliminarProducto(req.params.id);
    res.redirect("/listado");
});

module.exports = router

/*
NOTAS

req.body ===== Trae toda la información del formulario
req.files ===== Trae los archivos de un formulario (Siempre recordar tener en el form el atributo enctype="multipart/form-data")
req.params ==== Viajan los parámetros que le pasamos a un controlador de ruta
*/