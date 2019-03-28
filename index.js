const express = require('express');
const app = express();
const fs = require('fs');

//middleware 
app.use(express.json()); // convierte los datos que llegan ha mi aplicacion  en objetos json 

app.get('/', (req, res) => {//funcion para devolver 
       let leer = {server:"mi server de devRlence"};
       res.status(201).json(leer);
});

app.post('/registro', (req, res) => {//funcion para ingresar usuarios nuevos

});

app.post('/login', (req, res) => {//funcion para logear usuarios y verificar datos

});

app.listen(3000, console.log('escuchando por el puerto 3000'));//escuchando en el puerto 3000 