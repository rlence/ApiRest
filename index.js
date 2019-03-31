//frameworks y librerias
const express = require('express');
const app = express();


//importando mis archivos de controllers 
const registroUser = require('./controllers/registro.js');
const loginUser = require('./controllers/login.js');
const loginAdmi = require('./controllers/loginAdmi.js');


//middleware 
app.use(express.json()); // convierte los datos que llegan ha mi aplicacion  en objetos json 
app.use(express.static('cliente'));

//rutas del apiRest -------------------------------------------
app.get('/', (req, res) => {//funcion para devolver pagina de inicio
       let leer = {server:"mi server de devRlence"};
       res.status(201).json(leer);
});


// app.get ('/registro', (req, res ) => { //respondiendo index.html de registro
//        let respuesta = {message:'estas en la pag de registro, puedes registrarte'};
//        res.status(201).send(respuesta);
// });

app.post('/registro', registroUser); //añadiendo un nuevo usuario


// app.get('/login', (req, res) => {//respondiendo index.htlm de logion
//        let respuesta = {message: 'Estas en la pagina de ingreso, puedes logearte'};
//        res.status(201).json(respuesta);
// });

app.post('/login', loginUser);//logear usuarios y verificar datos


app.get('/loginAdmi', (req, res) => {
       res.status(201).json({message: 'Te puedes logear usuario administrador'});
});
app.post('/loginAdmi', loginAdmi); //logeando a travez del key del headers

app.use((req, res, next) => {//middleware para el erro 404
       res.status(404).json({message: "Error 404, Not Found"});
});

app.listen(5000, console.log('escuchando por el puerto 5000'));//escuchando en el puerto 3000 