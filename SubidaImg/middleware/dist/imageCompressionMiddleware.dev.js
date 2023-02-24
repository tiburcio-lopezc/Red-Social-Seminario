"use strict";

/* const sharp = require("sharp");

exports.compressImage = (req, res, next) => {
  if (!req.file) return next();

  if (req.file.size > 200000) {
    sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toBuffer()
      .then((compressedImage) => {
        
        req.file.buffer = compressedImage;
        console.log(compressedImage )
        next();
      })
      .catch((error) => res.send(error));
  } else {
    next();
  }
};
 */
var sharp = require("sharp");

exports.pirula = function _callee(req, res, next) {
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
          })
          /*      console.log(req.file.size) */
          ["catch"](function (err) {
            return console.log(err);
          }));

        case 4:
          console.log(req.file.size);
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};
/* exports.compressImage = async (req, res, next) => {
  
  const limit = 1024*1024 *2;

  if (req.file.size > limit) {
    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toBuffer()
      .then((compressedImage) => {
        req.file.buffer = compressedImage;
        console.log(compressedImage )
        next();
      })
      
   
  } 
  next();
};
 */