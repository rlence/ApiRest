//frameworks y librerias
const express = require('express');
const app = express();
const fs = require('fs');

//importando mis archivos de controllers 
const registroUser = require('./controllers/registro.js');
const loginUser = require('./controllers/login.js');




//middleware 
app.use(express.json()); // convierte los datos que llegan ha mi aplicacion  en objetos json 

app.get('/', (req, res) => {//funcion para devolver 
       let leer = {server:"mi server de devRlence"};
       res.status(201).json(leer);
});

app.post('/registro', registroUser); //registrando un nuevo usuario

app.post('/login', loginUser);//funcion para logear usuarios y verificar datos

app.use((req, res, next) => {//middleware para el erro 404
       res.status(404).json({message: "Error 404, Not Found"});
});

app.listen(3000, console.log('escuchando por el puerto 3000'));//escuchando en el puerto 3000 