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


const sharp = require("sharp");



exports.pirula = async (req, res, next) => {
  
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
              
   /*      console.log(req.file.size) */
      .catch(err => console.log(err))

  } 
  console.log(req.file.size)
   next();
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
