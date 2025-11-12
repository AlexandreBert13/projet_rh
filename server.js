
process.env.NOMDELAVARIABLE
// set up d'express
const express = require("express");
require('dotenv').config() 
// import des routes
const companyRouter = require("./rooter/companyRouter");
const employeeRouter = require("./rooter/employeeRouter");
const computerRouter = require("./rooter/computerRouter");
const twig = require("twig");

// gestion des sessions
const session = require('express-session');

const app = express()
app.set("views", "./views");
app.set("view engine", "twig");

app.use(express.static("./public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// configuration des sessions ( à relire + tard )
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
}))

// utilisation des routes
app.use(companyRouter)
app.use(employeeRouter)
app.use(computerRouter)

app.listen(process.env.port, ()=> {
    console.log("Ecoute sur le port de " + process.env.port);
})