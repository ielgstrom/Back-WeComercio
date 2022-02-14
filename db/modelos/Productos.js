const { Schema, model } = require("mongoose");

const ProductosSchema = new Schema({
  Categoria: {
    type: String,
    required: true,
  },
  Descripción: {
    type: String,
    required: true,
  },
  Estrellas: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  Nombre: {
    required: true,
    type: String,
  },
  Precio: {
    type: Number,
    required: true,
  },
  Stock: {
    type: Number,
    required: true,
  },
});

const Producto = model("producto", ProductosSchema, "Productos");
module.exports = Producto;
