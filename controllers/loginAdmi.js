const express = require('express');
const app = express();
const fs = require('fs');

//middleware 
app.use(express.json()); // convierte los datos que llegan ha mi aplicacion  en objetos json 


module.exports = (req, res) => {

       const dataString = fs.readFileSync('./Data/data.json');
       const data = JSON.parse(dataString);

       const { id } = req.headers; 
       const { userName, email, password} = req.body;

       if( !(data.users.find( user => user.id === id)
       && data.users.find( user => user.userName === userName)
       && data.users.find( user => user.email === email)
       && data.users.find( user => user.password === password))){
              return res.status(401).json({message: "No eres el usuario administrador"});
       }else {
           return res.status(201).json(data);
       }
}