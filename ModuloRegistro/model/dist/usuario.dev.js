"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error({
          error: 'Invalid Email address'
        });
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});
userSchema.pre('save', function _callee(next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Hash the password before saving the user model
          user = this;

          if (!user.isModified('password')) {
            _context.next = 5;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

userSchema.methods.generateAuthToken = function _callee2() {
  var user, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Generate an auth token for the user
          user = this;
          token = jwt.sign({
            _id: user._id
          }, process.env.JWT_KEY);
          user.tokens = user.tokens.concat({
            token: token
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(user.save());

        case 5:
          return _context2.abrupt("return", token);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

userSchema.statics.findByCredentials = function _callee3(email, password) {
  var user, isPasswordMatch;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 2:
          user = _context3.sent;

          if (user) {
            _context3.next = 5;
            break;
          }

          throw new Error({
            error: 'Invalid login credentials'
          });

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 7:
          isPasswordMatch = _context3.sent;

          if (isPasswordMatch) {
            _context3.next = 10;
            break;
          }

          throw new Error({
            error: 'Invalid login credentials'
          });

        case 10:
          return _context3.abrupt("return", user);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var User = mongoose.model('User', userSchema);
module.exports = User;