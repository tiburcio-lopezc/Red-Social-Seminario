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
          console.log(req.file);
          console.log(req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(new Image({
            name: req.body.name,
            desc: req.body.desc,
            image: {
              data: req.file.buffer,
              contentType: req.file.mimetype
            }
          }));

        case 4:
          image = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(image.save());

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(res.send('imagen subida bien'));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

var upload = multer({
  storage: storage
});