const express = require("express");
const router = express.Router();
const uploadController = require("../controller/uploadController");
const imageCompressionMiddleware = require("../middleware/imageCompressionMiddleware");
const multer = require("multer");



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("image"), 
  imageCompressionMiddleware.compressimg,
  uploadController.uploadImage
);


module.exports = router;
