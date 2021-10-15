const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Usuario = require("../../db/modelos/Usuarios");
const {
  crearUsuario,
  loginUsuario,
} = require("../../db/controladores/usuarios");

const router = express.Router();

router.post("/registro", async (req, res, next) => {
  // const usuarioNuevo = { Nombre, Email, Contraseña };
  const { Nombre, Email, Contraseña } = req.body;
  try {
    const nuevoUsuario = await crearUsuario(Nombre, Email, Contraseña);

    res.status(201).json(nuevoUsuario);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { Email, Contraseña } = req.body;
  try {
    const idUsuario = await loginUsuario(Email, Contraseña);
    const token = jwt.sign({ idUsuario }, process.env.CLAVE_JWT, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
