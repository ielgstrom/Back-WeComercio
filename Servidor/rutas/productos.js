const express = require("express");
const Producto = require("../../db/modelos/Productos");

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
module.exports = router;
