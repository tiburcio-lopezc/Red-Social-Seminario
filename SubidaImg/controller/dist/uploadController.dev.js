"use strict";

var Image = require("../model/imageModel");

var multer = require("multer");

var storage = multer.memoryStorage();

exports.uploadImage = function _callee(req, res) {
  var image;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(new Image({
            name: req.body.name,
            desc: req.body.desc,
            image: {
              data: req.file.buffer,
              contentType: req.file.mimetype
            }
          }));

        case 2:
          image = _context.sent;
          image.save();
          res.send('imagen subida con exito');

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var upload = multer({
  storage: storage
});