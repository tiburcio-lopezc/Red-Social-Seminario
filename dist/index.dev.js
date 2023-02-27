"use strict";

var express = require('express');

var app = express();

var http = require('http');

var server = http.createServer(app);

var _require = require("socket.io"),
    Server = _require.Server;

var io = new Server(server); // middleware bodyparser para analizar los datos de solicitud en aplicación web

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
/* app.listen(3000, function() {
    console.log('Servidor iniciado en el puerto 3000');
}); */

server.listen(3000, function () {
  console.log('Servidor escuchando en puerto:3000');
});
var users = {}; //chat app

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
  console.log('Se conectó un usuario');
  socket.on('disconnect', function () {
    console.log('Se desconectó un usuario');
  });
  socket.on('chat message', function (msg) {
    console.log('Mensaje: ' + msg);
  });
});
io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});