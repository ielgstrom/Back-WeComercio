require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Productos = require("../db/modelos/Productos");
const rutasProductos = require("./rutas/productos");
const rutasUsuarios = require("./rutas/usuarios");

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
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/usuario", cors(), rutasUsuarios);
app.use("/producto", cors(), rutasProductos);

app.use((req, res, next) => {
  res.status(404).json({ error: true, mensaje: "No existe ese endpoint" });
});

app.use((err, req, res, next) => {
  const status = err.codigo || 500;
  const mensaje = err.codigo ? err.message : "Error general en el servidor";
  // console.log("Manejador de Errores");
  console.log(err.message);
  res.status(status).json({ error: true, mensaje });
});
