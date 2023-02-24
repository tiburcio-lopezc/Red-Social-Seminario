"use strict";

var sharp = require("sharp");

exports.compressimg = function _callee(req, res, next) {
  var limit;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          limit = 1024 * 1024 * 2;

          if (!(req.file.size > limit)) {
            _context.next = 4;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).toFormat("jpeg").jpeg({
            quality: 50
          }).toBuffer({
            resolveWithObject: true
          }).then(function (_ref) {
            var data = _ref.data,
                info = _ref.info;
            req.file.buffer = data;
            console.log(info);
            next();
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 4:
          console.log("El tamaño original de esta img es:");
          console.log(req.file.size);
          next();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};