"use strict";

var express = require('express');

var router = express.Router();

var User = require('../model/user');

var jwt = require('jsonwebtoken');

var secretKey = "my-32-character-ultra-secure-and-ultra-long-secret";
router.use(function (req, res, next) {
  var authorizationHeader = req.headers['authorization'];
  var token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: 'Failed to authenticate'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({
      message: 'No token provided'
    });
  }
});
router.get('/private-route', function (req, res, next) {
  res.status(200).send({
    message: 'You are authenticated!'
  });
});
module.exports = router;