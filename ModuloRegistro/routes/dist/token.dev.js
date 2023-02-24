"use strict";

var express = require('express');

var User = require('../models/User');

var router = express.Router();
router.post('/users', function _callee(req, res) {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = new User(req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 6:
          token = _context.sent;
          res.status(201).send({
            user: user,
            token: token
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(400).send(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.post('/users/login', function _callee2(req, res) {
  var _req$body, email, password, user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findByCredentials(email, password));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(401).send({
            error: 'Login failed! Check authentication credentials'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(user.generateAuthToken());

        case 9:
          token = _context2.sent;
          res.send({
            user: user,
            token: token
          });
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
module.exports = router;