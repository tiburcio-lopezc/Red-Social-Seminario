"use strict";

var express = require("express");

var router = express.Router();

var uploadController = require("../controller/uploadController");

var imageCompressionMiddleware = require("../middleware/imageCompressionMiddleware");

var multer = require("multer");
/* const path = require('path'); */


var storage = multer.memoryStorage(); //const timestamp = new Date().toISOString();

var upload = multer({
  storage: storage
});
/* router.get('/pato', function(req, res) {
    const archivo =  'C:/Users/damas/Desktop/finalseminarioiii/public/imagen.html';
  res.sendFile(archivo);
}); */

router.post("/upload", upload.single("image"), imageCompressionMiddleware.pirula, uploadController.uploadImage);
module.exports = router;