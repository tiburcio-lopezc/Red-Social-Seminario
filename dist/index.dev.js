"use strict";

var express = require('express');

var app = express(); // middleware bodyparser para analizar los datos de solicitud en aplicación web

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var uploadRoutes = require("./SubidaImg/routes/uploadRoutes"); //conecto base de datos en direccion 27017. 


mongoose.connect('mongodb://localhost/27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.createConnection("mongodb://localhost:27017/imageUpload", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/api', require('./SubidaImg/routes/uploadRoutes'));
app.use('/api', require('./ModuloRegistro/routes/registro'));
app.use('/api', require('./ModuloRegistro/routes/authentication'));
app.listen(3000, function () {
  console.log('Servidor iniciado en el puerto 3000');
});