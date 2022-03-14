const Compras = require("../modelos/Compras");
const Usuario = require("../modelos/Usuarios");

const nuevaCompra = async (elementosComprados, comprador) => {
  try {
    const nuevaCompra = await Compras.create({
      elementosComprados,
      comprador,
    });
    return nuevaCompra;
  } catch (err) {
    const nuevoError = new Error("No se ha podido crear el usuario");
    return err.message;
  }
};

const verCompraUsuario = async (idUsuario) => {
  try {
    const usuarioCompraEncontrado = Usuario.findById(idUsuario);
    return usuarioCompraEncontrado?.elementosComprados;
  } catch (err) {
    const nuevoError = new Error("Error al comprovar las credenciales");
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = { nuevaCompra, verCompraUsuario };
