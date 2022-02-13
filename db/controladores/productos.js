const Productos = require("../modelos/Productos");

const buscarProducto = async (idProducto) => {
  // aqui buscaremos un producto y ya que estamos, tres más de sugerencia
  try {
    const productoEncontrado = await Productos.findOne({
      _id: idProducto,
    });
    return productoEncontrado;
  } catch (err) {
    const nuevoError = new Error("No se ha podido encontrar el producto");
    return err.message;
  }
};
module.exports = buscarProducto;
