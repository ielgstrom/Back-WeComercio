const express = require("express");
const Producto = require("../../db/modelos/Productos");
const {
  buscarProducto,
  buscarProductoPorString,
  buscarProductoPorCategoria,
} = require("../../db/controladores/productos");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("Holi por este middleware");
    const producto0 = await Producto.find();
    res.json(producto0);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:idProducto", async (req, res, next) => {
  try {
    const { idProducto } = req.params;
    const productoEncontrado = await buscarProducto(idProducto);
    const productosTotales = await Producto.find();
    const productosSugeridos = [];
    while (productosSugeridos.length < 3) {
      const elementoRandom = Math.floor(
        Math.random() * productosTotales.length
      );
      if (productosTotales[elementoRandom] === productoEncontrado) {
        // eslint-disable-next-line no-continue
        continue;
      } else if (
        productosTotales[elementoRandom] !== productoEncontrado &&
        !productosSugeridos.includes(productosTotales[elementoRandom])
      ) {
        productosSugeridos.push(productosTotales[elementoRandom]);
      }
    }
    res.status(200).json({ productoEncontrado, productosSugeridos });
  } catch (err) {
    console.log(err);
  }
});

router.get("/busqueda/:expresion", async (req, res, next) => {
  try {
    const { expresion } = req.params;
    const resultado = await buscarProductoPorString(expresion);
    res.status(200).send(resultado);
  } catch (err) {
    console.log(err);
  }
});

router.get("/busqueda/categoria/:categoria", async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const resultado = await buscarProductoPorCategoria(categoria);
    res.status(200).send(resultado);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
