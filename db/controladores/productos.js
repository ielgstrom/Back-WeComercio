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

const buscarProductoPorString = async (stringBusqueda) => {
  try {
    const productoDeBusquedaEncontrado = await Productos.find({
      Nombre: { $regex: `${stringBusqueda}`, $options: "si" },
    });

    const categoriaDeBusquedaEncontrado = await Productos.find({
      Categoria: { $regex: `${stringBusqueda}`, $options: "si" },
    });

    return { productoDeBusquedaEncontrado, categoriaDeBusquedaEncontrado };
  } catch (err) {
    const nuevoError = new Error("No se ha podido encontrar el producto");
    return err.message;
  }
};

const buscarProductoPorCategoria = async (categoriaSearch) => {
  try {
    const productoEncontrado = await Productos.find({
      Categoria: categoriaSearch.replaceAll("-", " "),
    });
    return productoEncontrado;
  } catch (err) {
    const nuevoError = new Error("No se ha podido encontrar el producto");
    return err.message;
  }
};
module.exports = {
  buscarProducto,
  buscarProductoPorString,
  buscarProductoPorCategoria,
};
