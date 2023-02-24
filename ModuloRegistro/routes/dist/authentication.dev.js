"use strict";

var express = require('express');

var router = express.Router();

var User = require('../model/user');

router.post('/user', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      res.status(500).send({
        message: 'Error al autenticar usuario'
      });
    } else if (!user) {
      res.status(500).send({
        message: 'El usuario no existe'
      });
    } else {
      user.isCorrect(password, function (err, result) {
        if (err) {
          res.status(500).send({
            message: 'Error al autenticar'
          });
        } else if (result) {
          res.status(200).send({
            message: 'Usuario autenticado'
          });
        } else {
          res.status(500).send({
            message: 'Usuario y/o contraseña incorrectos'
          });
        }
      });
    }
  });
});
router.get('/user', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      res.status(500).send({
        message: 'Error al obtener usuarios'
      });
    } else {
      res.status(200).send({
        users: users,
        message: 'Aqui estan los usuarios autenticados METODO GET'
      });
    }
  });
});
router.put('/user/:id', function (req, res, next) {
  var id = req.params.id;
  var updatedUser = req.body;
  User.findByIdAndUpdate(id, updatedUser, function (err, result) {
    if (err) {
      res.status(500).send({
        message: 'Error al actualizar usuario'
      });
    } else {
      res.status(200).send({
        message: 'METODO PUT: Usuario actualizado correctamente'
      });
    }
  });
});
router["delete"]('/user/:id', function (req, res, next) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function (err, result) {
    if (err) {
      res.status(500).send({
        message: 'Error al eliminar usuario'
      });
    } else {
      res.status(200).send({
        message: 'Usuario eliminado correctamente'
      });
    }
  });
});
router["delete"]('/registro/:id', function (req, res, next) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function (err, deletedUser) {
    if (err) {
      return next(err);
    }

    if (!deletedUser) {
      return res.status(404).send({
        message: 'El usuario no se encontró'
      });
    }

    res.send({
      message: 'El usuario ha sido eliminado exitosamente'
    });
  });
});
module.exports = router;