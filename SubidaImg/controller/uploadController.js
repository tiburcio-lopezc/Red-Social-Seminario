const Image = require("../model/imageModel");
const multer = require("multer");
const storage = multer.memoryStorage();

exports.uploadImage = async(req, res) => {
  console.log(req.file)
  console.log(req.body)


   const image =  await new Image({
   name: req.body.name,
   desc: req.body.desc,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    }
  });


    await image.save()
    await res.send('imagen subida bien')
   /*  .then(() => res.send("Imagen subida con éxito"))
    .catch((error) => res.send(error)); */
    
}; 

const upload = multer({ storage });