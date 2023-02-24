const Image = require("../model/imageModel");
const multer = require("multer");
const storage = multer.memoryStorage();

exports.uploadImage = async(req, res) => {


   const image =  await new Image({
   name: req.body.name,
   desc: req.body.desc,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    }
  });


     image.save()
    res.send('imagen subida con exito')

}; 

const upload = multer({ storage });