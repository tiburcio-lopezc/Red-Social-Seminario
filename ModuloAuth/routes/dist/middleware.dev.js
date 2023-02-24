"use strict";

var jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // obtener token del header de la solicitud
  var token = req.headers.authorization; // verificar si existe el token

  if (!token) return res.status(401).json({
    message: 'No token provided'
  }); // verificar la validez del token

  try {
    var decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid token'
    });
  }
}

module.exports = authMiddleware;