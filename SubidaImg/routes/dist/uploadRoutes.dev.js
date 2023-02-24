"use strict";

var express = require("express");

var router = express.Router();

var uploadController = require("../controller/uploadController");

var imageCompressionMiddleware = require("../middleware/imageCompressionMiddleware");

var multer = require("multer");

var path = require('path');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
}); //const timestamp = new Date().toISOString();

var upload = multer({
  storage: storage
});
router.get('/pato', function (req, res) {
  var archivo = 'C:/Users/damas/Desktop/finalseminarioiii/public/imagen.html';
  res.sendFile(archivo);
});
router.post("/upload", upload.single("image"), function (req, res, next) {
  if (!req.file) {
    return res.status(400).send("Debes subir una imagen");
  }

  next();
}, imageCompressionMiddleware.compressImage, uploadController.uploadImage);
module.exports = router;