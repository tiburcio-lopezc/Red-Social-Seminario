const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// middleware bodyparser para analizar los datos de solicitud en aplicación web


const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uploadRoutes = require("./SubidaImg/routes/uploadRoutes");


//conecto base de datos en direccion 27017. 


mongoose.connect('mongodb://localhost/27017', {useNewUrlParser: true, useUnifiedTopology: true});

 mongoose.createConnection(
  "mongodb://localhost:27017/imageUpload",
  { useNewUrlParser: true, useUnifiedTopology: true }
);


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', require('./SubidaImg/routes/uploadRoutes'))
app.use('/api', require('./ModuloRegistro/routes/registro'));
app.use('/api', require('./ModuloRegistro/routes/authentication'));

/* app.listen(3000, function() {
    console.log('Servidor iniciado en el puerto 3000');
}); */


server.listen(3000, () => {
  console.log('Servidor escuchando en puerto:3000');
});

let users = {};

//chat app

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
  console.log('Se conectó un usuario');


  socket.on('disconnect', () => {
    console.log('Se desconectó un usuario');
  });
  socket.on('chat message', (msg) => {
    console.log('Mensaje: ' + msg);
  });
  
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


