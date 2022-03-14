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
  elementosComprados: [{ type: Schema.Types.ObjectId, ref: "producto" }],
});

const Usuario = model("usuario", UsuariosSchema, "Usuarios");
module.exports = Usuario;
