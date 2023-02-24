// controllers/auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../model/usuario");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const usuario = new Usuario({
      email: req.body.email,
      password: hash
    });
    usuario
      .save()
      .then(() => res.status(201).json({ message: "Usuario creado!" }))
      .catch(error => res.status(400).json({ error }));
  });
};

exports.login = (req, res, next) => {
  Usuario.findOne({ email: req.body.email })
    .then(usuario => {
      if (!usuario) {
        return res.status(401).json({ error: "Usuario no encontrado!" });
      }
      bcrypt.compare(req.body.password, usuario.password).then(valid => {
        if (!valid) {
          return res.status(401).json({ error: "Password incorrecto!" });
        }
        res.status(200).json({
          userId: usuario._id,
          token: jwt.sign(
            { usuarioId: usuario._id },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "24h" }
          )
        });
      });
    })
    .catch(error => res.status(500).json({ error }));
};
