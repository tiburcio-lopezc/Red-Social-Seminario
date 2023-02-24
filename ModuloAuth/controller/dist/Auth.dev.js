"use strict";

// controllers/auth.js
var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var Usuario = require("../model/usuario");

exports.signup = function (req, res, next) {
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    var usuario = new Usuario({
      email: req.body.email,
      password: hash
    });
    usuario.save().then(function () {
      return res.status(201).json({
        message: "Usuario creado!"
      });
    })["catch"](function (error) {
      return res.status(400).json({
        error: error
      });
    });
  });
};

exports.login = function (req, res, next) {
  Usuario.findOne({
    email: req.body.email
  }).then(function (usuario) {
    if (!usuario) {
      return res.status(401).json({
        error: "Usuario no encontrado!"
      });
    }

    bcrypt.compare(req.body.password, usuario.password).then(function (valid) {
      if (!valid) {
        return res.status(401).json({
          error: "Password incorrecto!"
        });
      }

      res.status(200).json({
        userId: usuario._id,
        token: jwt.sign({
          usuarioId: usuario._id
        }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h"
        })
      });
    });
  })["catch"](function (error) {
    return res.status(500).json({
      error: error
    });
  });
};