const { Schema, model } = require("mongoose");

const UsuariosSchema = new Schema({
  Nombre: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Contraseña: {
    type: String,
    required: true,
  },
});

const Usuario = model("usuario", UsuariosSchema, "Usuarios");
module.exports = Usuario;
