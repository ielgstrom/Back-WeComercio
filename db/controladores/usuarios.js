const Usuarios = require("../modelos/Usuarios");

const crearUsuario = async (usuario, mail, contraseña) => {
  try {
    const nuevoUsuario = await Usuarios.create({
      Nombre: usuario,
      Email: mail,
      Contraseña: contraseña,
    });

    return nuevoUsuario;
  } catch (err) {
    const nuevoError = new Error("No se ha podido crear el usuario");
    return err.message;
  }
};
const loginUsuario = async (Email, contraseña) => {
  try {
    const usuarioEncontrado = await Usuarios.findOne({
      Email,
    });
    if (!usuarioEncontrado) {
      const nuevoError = new Error("Credenciales Incorrectas");
      nuevoError.codigo = 403;
      throw nuevoError;
    }
    if (contraseña !== usuarioEncontrado.Contraseña) {
      const nuevoError = new Error("Credenciales Incorrectas");
      nuevoError.codigo = 403;
      throw nuevoError;
    }
    return usuarioEncontrado;
  } catch (err) {
    const nuevoError = new Error("Error al comprovar las credenciales");
    throw err.codigo ? err : nuevoError;
  }
};

module.exports = { crearUsuario, loginUsuario };
