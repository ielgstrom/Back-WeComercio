const express = require("express");
const jwt = require("jsonwebtoken");
const Compras = require("../../db/modelos/Compras");
const {
  nuevaCompra,
  verCompraUsuario,
} = require("../../db/controladores/compras");

const router = express.Router();

// const authMiddleware = (req, res, next) => {
//   if (!req.header("Authorization")) {
//     const nuevoError = new Error("Petición no autentificada");
//     nuevoError.codigo = 403;
//     return next(nuevoError);
//   }
//   const token = req.header("Authorization").split(" ")[1];
//   try {
//     const datosToken = jwt.verify(token, process.env.JWT_SECRET);
//     const { id } = datosToken;
//     req.idUsuario = id;
//     next();
//   } catch (e) {
//     // Token incorrecto
//     if (e.message.includes("expired")) {
//       const nuevoError = new Error("Token caducado");
//       nuevoError.codigo = 403;
//       return next(nuevoError);
//     }
//     next(e);
//   }
// };

router.post("/nuevaCompra", async (req, res, next) => {
  try {
    const { listaCompraId, compradorId } = req.body;

    const newBought = await nuevaCompra(listaCompraId, compradorId);
    res.status(201).json(newBought);
  } catch (err) {
    next(err);
  }
});

router.get("/totalCompras", async (req, res, next) => {
  try {
    const userBougth = await verCompraUsuario("id j");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
