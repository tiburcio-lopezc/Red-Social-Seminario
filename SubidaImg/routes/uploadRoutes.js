const express = require("express");
const router = express.Router();
const uploadController = require("../controller/uploadController");
const imageCompressionMiddleware = require("../middleware/imageCompressionMiddleware");
const multer = require("multer");
const path = require('path');


const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    
    cb(null, file.fieldname + '-' +  Date.now()  + path.extname(file.originalname));
  }
});
//const timestamp = new Date().toISOString();
const upload = multer({ storage: storage });

router.get('/pato', function(req, res) {
    const archivo =  'C:/Users/damas/Desktop/finalseminarioiii/public/imagen.html';
  res.sendFile(archivo);
});

router.post(
  "/upload",
  upload.single("image"), 
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).send("Debes subir una imagen");
    }
    next();
  },
  imageCompressionMiddleware.compressImage,
  uploadController.uploadImage
);


module.exports = router;
