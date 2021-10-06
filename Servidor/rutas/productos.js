const express = require("express");
const Producto = require("../../db/modelos/Productos");

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("Holi por este middleware");
  const producto0 = await Producto.find();
  res.json(producto0);
});
module.exports = router;
