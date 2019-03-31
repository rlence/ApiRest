const express = require('express');
const app = express();
const fs = require('fs');
const id = require('uniqid');
const validator = require('validator')

//middleware 
app.use(express.json()); // convierte los datos que llegan ha mi aplicacion  en objetos json 

module.exports = (req , res) => {
       const dataString = fs.readFileSync('./Data/data.json');
       const data = JSON.parse(dataString);

       const {userName, email, password} = req.body;//obteniendo datos del request

       if(!(userName && email && password)){//comprobando que ingreso todos los campos del formulario
              return res.status(400).json({message: "Porfavor ingrese todos los campos del formulario"});
       }

       if(password.length < 8){//comprobando longitud del password mayor o igual a 8 caracteres
              return res.status(400).json({message: "El password tiene que ser de 8 o mas caracteres"});
       }

       if(data.users.find(user => user.userName.toLowerCase() === userName.toLowerCase())){ //comprobando si existe el usuario
              return res.status(400).json({message: "Ya existe un usuario con este nombre"});
       }
       
       if( data.users.find(user => user.email.toLowerCase() === email.toLowerCase())){//comprobando si exite el email
              return res.status(400).json({message: "Ya exite este email con otro usuario"});
       }

       if(!(validator.isEmail(email))){
              return res.status(400).json({message: "Ingrese un email valido"});
       }

       const newUser = {// objeto para crear nuevo usuario
              id:id.time('U-'),              
              userName,
              email,
              password
       }

       //anexando los valores al array users
       data.users.push(newUser);

       //pasando a JSON
       const outData = JSON.stringify( data );

       //sobrescribiendo la base de datos
       fs.writeFileSync('./Data/data.json', outData)

       //responiendo exitosamente la creacion del nuevo usuario
       res.status(201).json({message: "Usuario creado satisfactoriamente"});
}
