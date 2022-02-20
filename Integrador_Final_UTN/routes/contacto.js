'use strict';
const express = require("express");
const async = require("hbs/lib/async");
const router = express.Router();
const nodemailer = require("nodemailer");
const {body, validationResult} = require("express-validator");


router.get("/contacto", (req, res) => {
    res.render("contacto");
});

const validaciones = [
    body("name", "Debe ingresar su Nombre y Apellido").exists().isLength({min: 2}),
    body("tel", "Debe ingresar un Número de Teléfono válido").exists().isLength({min: 6, max: 16}),
    body("email", "Debe ingresar un Email").exists().isEmail(),
    body("coment", "Su mensaje debe de contenter entre 8 y 256 caracteres").exists().isLength({min: 8, max: 256}),
];

router.post("/contacto", validaciones, async (req, res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        const datosForm = req.body;
        const arrayDeErrores = errores.array()
       res.render("contacto", {datosForm, arrayDeErrores});
    }
    const correo =  {
        to: "informes@sanrafael.com",
        from: req.body.email,
        subject: "Mensaje enviado desde la Página de Contacto",
        html: `${req.body.name} envió el siguiente mensaje: ${req.body.coment}`,

    };

const transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

let estadoDeMail = await transport.sendMail(correo);
  let estadoMsg = "";
    if(estadoDeMail.rejected.length){
        estadoMsg = "El e-mail no pudo ser enviado";
    } else {
        estadoMsg = "El mensaje ha sido enviado";
    }
    res.render("contacto", {
      estadoMsg
    });
});

module.exports = router;
