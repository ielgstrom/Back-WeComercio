const express = require("express");
const mongoose = require("mongoose");
const Usuario = require("../../db/modelos/Usuarios");
const { crearUsuario } = require("../../db/controladores/usuarios");

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
module.exports = router;
