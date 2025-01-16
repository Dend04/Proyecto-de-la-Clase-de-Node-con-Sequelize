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

// Obtener perfil del usuario autenticado
export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ['id', 'nombreUsuario', 'rol'],
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ usuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil del usuario', error });
  }
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
export const iniciarSesion = async (req, res) => {
  const { identificador, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { nombreUsuario: identificador } });

    if (!usuario || !(await usuario.validarPassword(password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario.id, nombreUsuario: usuario.nombreUsuario }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
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

export const cerrarSesion = async (req, res) => {
  // Aquí puedes implementar la lógica para manejar el cierre de sesión si es necesario
  res.json({ message: 'Cierre de sesión exitoso' });
};

// Obtener estado del usuario
export const obtenerEstadoUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ['id', 'nombreUsuario', 'rol'],
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ usuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estado del usuario', error });
  }
};