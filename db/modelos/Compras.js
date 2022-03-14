const { Schema, model } = require("mongoose");

const ComprasSchema = new Schema({
  elementosComprados: [{ type: Schema.Types.ObjectId, ref: "producto" }],
  comprador: { type: Schema.Types.ObjectId, ref: "usuario" },
  fechaCompra: {
    type: Date,
    default: Date.now,
  },
});

const Compra = model("compra", ComprasSchema, "Compras");
module.exports = Compra;
