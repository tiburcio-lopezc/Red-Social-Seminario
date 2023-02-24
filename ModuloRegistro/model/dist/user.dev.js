"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');
/* defino esquema de user.js
los campos son obligatorios con el fin de asegurar que no se trata de un robot.
*/


var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
/* El middleware "pre-save" para cifrar la contraseña 
del usuario antes de guardarla en la base de datos. 

Para hacer esto, se utiliza la función bcrypt.hash() */

userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    //la contraseña se hashea 10 veces
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

userSchema.methods.isCorrect = function (upassword, callback) {
  bcrypt.compare(upassword, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};
/*  bcrypt.compare() comparo contraseña con la existente en documento de la database */

/* isCorrect verifica la validez de la contraseña del usuario

Si hay algún error durante la comparación, el error se devuelve a través 
de una funcion callback, sino devuelvo
un valor booleano indicando si las contraseñas son iguales o no. */


var User = mongoose.model('User', userSchema);
module.exports = User;