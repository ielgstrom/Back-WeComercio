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
    console.log(err.message);
  }
};

module.exports = { crearUsuario };
