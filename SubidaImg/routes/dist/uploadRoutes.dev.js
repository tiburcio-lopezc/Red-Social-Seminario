"use strict";

var express = require("express");

var router = express.Router();

var uploadController = require("../controller/uploadController");

var imageCompressionMiddleware = require("../middleware/imageCompressionMiddleware");

var multer = require("multer");

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
});
router.post("/upload", upload.single("image"), imageCompressionMiddleware.compressimg, uploadController.uploadImage);
module.exports = router;