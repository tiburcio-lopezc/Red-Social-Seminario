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

exports.compressImage = function (req, res, next) {
  if (!req.file) return next();

  if (req.file.size > 200000) {
    sharp(req.file.buffer).toFormat("jpeg").jpeg({
      quality: 50
    }).toBuffer().then(function (compressedImage) {
      req.file.buffer = compressedImage;
      next();
    })["catch"](function (error) {
      return res.send(error);
    });
  } else {
    next();
  }
};