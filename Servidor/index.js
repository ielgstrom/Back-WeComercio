require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Productos = require("../db/modelos/Productos");
const rutasProductos = require("./rutas/productos");

const app = express();

const puerto = process.env.PORT || 4000;

app.listen(puerto, (err) => {
  if (err) {
    console.log("No se puede levantar el servidor");
    return;
  }
  console.log("servidor levantado");
});

app.use(morgan("dev"));
app.use(express.json());
app.use("/producto", rutasProductos);

app.use((req, res, next) => {
  res.status(404).json({ error: true, mensaje: "No existe ese endpoint" });
});

app.use((err, req, res, next) => {
  console.log("Manejador de Errores");
  console.log(`Error${err.message}`);
  res.status(500).json({ error: true, mensaje: err.message });
});
