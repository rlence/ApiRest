const express = require('express');
const app = express();
const fs = require('fs');

//middleware 
app.use(express.json()); // convierte los datos que llegan ha mi aplicacion  en objetos json 

module.exports = (req , res) => {
       const dataString = fs.readFileSync('./Data/data.json');
       const data = JSON.parse(dataString);

       const {userName, email, password} = req.body;

       if(!(userName && email && password)){//comprobando que ingreso todos los campos del formulario
              res.status(400).json({message: "Porfavor ingrese todos los campos del formulario"});
       }

       if(data.password.length < 8){//comprobando longitud del password mayor o igual a 8 caracteres
              res.status(400).json({message: "El password tiene que ser de 8 o mas caracteres"});
       }

       if(data.users.find(user => user.userName === userName)){ //comprobando si existe el usuario
              res.status(400).json({message: "Ya existe un usuario con este nombre"});
       }
       
       if( data.email.find(user => user.email === email)){//comprobando si exite el email
              res.status(400).json({message: "Ya exite este email con otro usuario"});
       }


       const newUser = {
              id:id(),
              userName,
              email,
              password
       }

       //anexando los valores al array users
       data.users.push(newUser);

       //pasando a JSON
       const outData = JSON.stringify( data );

       //sobrescribiendo la base de datos
       fs.writeFileSync('../Data/data.json')

       //responiendo exitosamente la creacion del nuevo usuario
       res.status(201).json({message: "Usuario creado satisfactoriamente"});
}
