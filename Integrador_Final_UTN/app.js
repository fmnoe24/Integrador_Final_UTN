const express = require("express");
const path = require("path");
const PORT = 3010;
const app = express();
const fileupload = require("express-fileupload");
const session = require("express-session"); //LOGIN
const hbs = require("hbs");
require("dotenv").config();

//Middleware de la Configuración de FileUpload (Cofiguración por defecto)
app.use(fileupload ({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

//ruta de contenido estatico
app.use(express.static(path.join(__dirname, "public")));
//Permite enviar y la lectura de los datos del form
app.use(express.urlencoded({extended: false}));


//Motor de Plantilla + Registro de Partials
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "./views/partials"));

//LOGIN
app.use(
    session({
        secret: "admin",
        resave: false,
        saveUninitialized: true
    })
);
const autorizado = async (req, res, next) => {
    if(req.session.user){
        app.locals.user = req.session.user;
        next()
    }else {
        const msg = "Para acceder a esa sección primero debe loguearse"
        res.render("login", {msg});
    }
};

const logueado = (req, res, next) => {
    app.locals.user = req.session.user;
    next();
}

const { urlencoded } = require("body-parser");
//Enrutador
const routeServicios = require("./routes/servicios");
const routeIndex = require("./routes/index");
const routeContacto = require("./routes/contacto");;
const routeLogin = require("./routes/login");
const routeSecret = require("./routes/secret");
//Uso de rutas
app.use("/", routeServicios);
app.use("/", logueado, routeIndex); 
app.use("/", routeContacto);
app.use("/login", routeLogin);
app.use("/secret", autorizado, routeSecret);

//Ruta por defecto
app.get("*", (req, res) => {
    res.render("error404");
});

//Lanzamos la App
app.listen(PORT, (err) =>{
    err 
    ? console.log("Error, servidor no inicio")
    : console.log(`Servidor corriendo en http://localhost:${PORT}`);
});