const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Usuario = require("../../db/modelos/Usuarios");
const {
  crearUsuario,
  loginUsuario,
} = require("../../db/controladores/usuarios");

const router = express.Router();

const authMiddleware = (req, res, next) => {
  if (!req.header("Authorization")) {
    const nuevoError = new Error("Petición no autentificada");
    nuevoError.codigo = 403;
    return next(nuevoError);
  }
  const token = req.header("Authorization").split(" ")[1];
  try {
    const datosToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = datosToken;
    req.idUsuario = id;
    next();
  } catch (e) {
    // Token incorrecto
    if (e.message.includes("expired")) {
      const nuevoError = new Error("Token caducado");
      nuevoError.codigo = 403;
      return next(nuevoError);
    }
    next(e);
  }
};

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
    const resultadoUsuario = await loginUsuario(Email, Contraseña);
    if (!resultadoUsuario) {
      const err = new Error("el nombre de usuario o contraseña no coincide");
      err.codigo = 400;
      next(err);
    }
    const resultadoUsuarioSeguro = {
      _id: resultadoUsuario._id,
      Email: resultadoUsuario.Email,
      Contraseña: resultadoUsuario.Contraseña,
      Nombre: resultadoUsuario.Nombre,
    };
    const token = jwt.sign({ resultadoUsuarioSeguro }, process.env.CLAVE_JWT, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

router.get("/datos", authMiddleware, async (req, res, next) => {
  const id = req.idUsuario;
  res.json({ datos: [1, 2, 3] });
});
// if (!req.header("Authorization")) {
//   const nuevoError = new Error("Petición no autentificada");
//   nuevoError.codigo = 403;
//   return next(nuevoError);
// }
// try {
// const token = req.header("Authorization").split(" ")[1];
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOiI2MTY5NTMwM2M2M2E0ODFlNDFjNTQ0NmEiLCJpYXQiOjE2MzQ2NDQxOTAsImV4cCI6MTYzNDczMDU5MH0.iseL2kX4ME-cZD-QwAET3GRHbxbGuZQaEHPhzp2pQE8";
//     const datosToken = jwt.verify(token, process.env.CLAVE_JWT);
//     res.send(datosToken);
//   } catch (err) {
//     err.status = 403;
//     res.send(err);
//   }
// });

module.exports = router;
