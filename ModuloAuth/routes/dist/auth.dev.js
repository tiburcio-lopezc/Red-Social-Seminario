"use strict";

// routes/auth.js
var express = require("express");

var router = express.Router();

var authController = require("../controller/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

var authMiddleware = require('../routes/middleware');

router.get('/datos_protegidos', authMiddleware, function (req, res) {
  User.findOne({
    _id: req.user._id
  }, function (err, user) {
    if (err) return res.status(500).send({
      error: 'Error al obtener los datos protegidos'
    });
    if (!user) return res.status(404).send({
      error: 'No se encontraron datos protegidos'
    });
    return res.status(200).send({
      data: user.datos_protegidos
    });
  });
});
module.exports = router;