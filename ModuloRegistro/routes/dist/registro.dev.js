"use strict";

var express = require('express');

var router = express.Router();

var User = require('../model/user'); // Ruta de GET para obtener todos los usuarios


router.get('/registro', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      return next(err);
    }

    res.send(users);
  });
}); // Ruta de GET para obtener un usuario específico por su ID

router.get('/registro/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(404).send({
        message: 'El usuario no existe'
      });
    }

    res.send(user);
  });
});
router.post('/registro', function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  if (!username || !email || !password) {
    return res.status(400).send({
      message: 'Por favor ingrese todos los datos'
    });
  }

  User.findOne({
    email: email
  }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(400).send({
        message: 'El correo electrónico ya existe'
      });
    }

    var user = new User({
      username: username,
      email: email,
      password: password
    });
    user.save(function (err) {
      if (err) {
        return next(err);
      }

      res.send({
        message: 'Registro exitoso'
      });
    });
  });
});
router.put('/registro/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(404).send({
        message: 'El usuario no existe'
      });
    }

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function (err) {
      if (err) {
        return next(err);
      }

      res.send({
        message: 'Actualización exitosa'
      });
    });
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