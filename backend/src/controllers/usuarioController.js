import Usuario from "../models/usuario_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';


// Crear un nuevo usuario
export const crearUsuario = async (userData) => {
  return await Usuario.create(userData);
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  return await Usuario.findAll();
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
};

// Obtener el perfil del usuario autenticado
export const obtenerPerfil = async (id) => {
  const usuario = await Usuario.findByPk(id, {
    attributes: { exclude: ['password'] } // Excluir el campo de la contraseña
  });
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
};

// Actualizar un usuario
export const actualizarUsuario = async (id, userData) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("Usuario no encontrado");
  return await usuario.update(userData);
};

// Borrar un usuario
export const borrarUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("Usuario no encontrado");
  await usuario.destroy();
};

// Actualizar el nombre de usuario
export const actualizarNombreUsuario = async (id, nuevoNombreUsuario) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("Usuario no encontrado");

  // Verificar si el nuevo nombre de usuario ya existe
  const usuarioExistente = await Usuario.findOne({ where: { nombreUsuario: nuevoNombreUsuario } });
  if (usuarioExistente) throw new Error("El nombre de usuario ya está en uso");

  usuario.nombreUsuario = nuevoNombreUsuario;
  return await usuario.save();
};

// Buscar usuarios por nombre, apellidos o nombre de usuario
export const buscarUsuarios = async (query) => {
  const usuarios = await Usuario.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.like]: `%${query}%` } },
        { apellidos: { [Op.like]: `%${query}%` } },
        { nombreUsuario: { [Op.like]: `%${query}%` } },
      ],
    },
  });
  return usuarios;
};

// Iniciar sesión
export const iniciarSesion = async (identificador, password) => {
  try {
    console.log("Identificador en controlador:", identificador);
    console.log("Password en controlador:", password);

    if (!identificador || !password) {
      throw new Error("identificador y password son requeridos");
    }

    let usuario;
    if (identificador.includes('@')) {
      // Buscar por email
      usuario = await Usuario.findOne({ where: { email: identificador } });
    } else {
      // Buscar por nombre de usuario
      usuario = await Usuario.findOne({ where: { nombreUsuario: identificador } });
    }

    if (!usuario) throw new Error("Usuario no encontrado");

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return { token, refreshToken, usuario: { nombreUsuario: usuario.nombreUsuario, rol: usuario.rol , id: usuario.id} };
  } catch (error) {
    console.error("Error en iniciarSesion:", error);
    throw error;
  }
};

// Refrescar el token
export const refrescarToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) throw new Error("Usuario no encontrado");

    const newToken = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token: newToken };
  } catch (error) {
    throw new Error("Refresh token no válido");
  }
};