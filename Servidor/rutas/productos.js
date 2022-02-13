const express = require("express");
const Producto = require("../../db/modelos/Productos");
const buscarProducto = require("../../db/controladores/productos");

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
    res.json(productoEncontrado);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
