"use strict";

var jwt = require('jsonwebtoken');

var secretKey = "Your secret key here";
router.post('/authenticate', function (req, res, next) {
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
          var token = jwt.sign({
            data: user
          }, secretKey, {
            expiresIn: '1h'
          });
          res.status(200).send({
            message: 'Usuario autenticado',
            token: token
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