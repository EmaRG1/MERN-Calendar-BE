const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();


//Crear servidor de Express
const app = express();

//Base de datos
dbConnection();

//Parseo
app.use(express.json())


// Directorio publico
app.use(express.static('public'));


//Rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos


//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Aplicacion corriendo en el puerto ${process.env.PORT}`)
});