const express = require('express');
const app = express();
const fs = require('fs');

//middleware 
app.use(express.json()); // convierte los datos que llegan ha mi aplicacion  en objetos json 

module.exports = (req, res) => {

       const dataString = fs.readFileSync('./Data/data.json');
       const data = JSON.parse(dataString);

       const { userName, email , password } = req.body;

       if(!(data.users.find(user => user.userName.toLowerCase() === userName.toLowerCase()) //validando nombre de usario
       && data.users.find(user => user.email.toLowerCase() === email.toLowerCase()) //validando email de usuario
       && data.users.find(user => user.password === password))){//validando el password del usuario

             return res.status(201).json({message: 'El nombre de Usuario, o Email o Password son incorrectos'});
       }else {
              
             return res.status(201).json( {message:"Aceso conseguido" ,userName, email, password});
       }
}