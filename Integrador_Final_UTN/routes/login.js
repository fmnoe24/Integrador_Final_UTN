'use strict';
const express = require("express");
const router = express.Router();
const modeloUsers = require("../models/modeloUsers");

router.get("/", (req, res) => {
    res.render("login");
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

router.post("/", async (req, res) => {
    const {user, password} = req.body
    const dato = await modeloUsers.traerUsuario(user, password);
    if(dato != undefined) {
        req.session.user = user;
        res.render("secret", {user});
    } else {
        const msg = "Usuario o Contraseña Incorrectos";
        res.render("login", {msg});
    }
});
module.exports = router;









