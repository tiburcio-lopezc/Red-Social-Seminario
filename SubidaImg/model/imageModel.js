const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
   image: {
      data: Buffer,
      contentType: String,
    },
  desc: String,
  name: String,

});

module.exports = mongoose.model("Image", imageSchema);
