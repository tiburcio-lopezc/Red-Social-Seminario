const sharp = require("sharp");
exports.compressimg = async (req, res, next) => {
  
  const limit = 1024*1024 *2;
  

  if (req.file.size > limit) {
    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) =>{
        req.file.buffer = data;
        console.log(info)
        next();
        })
              
  
      .catch(err => console.log(err))

  } 
  console.log("El tamaño original de esta img es:")
  console.log(req.file.size)
   next();
 };
