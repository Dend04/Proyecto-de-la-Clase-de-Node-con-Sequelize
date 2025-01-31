import Usuario from "../models/usuario_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import multer from 'multer';
import path from 'path';

// Crear un nuevo usuario
export const crearUsuario = async (userData) => {
  try {
    const nuevoUsuario = await Usuario.create(userData);
    return {
      success: true,
      message: "Usuario creado exitosamente",
      data: nuevoUsuario,
    };
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return {
        success: false,
        message: "El correo electrónico o nombre de usuario ya está en uso",
        error: error.errors.map((e) => e.message),
      };
    } else if (error.name === "SequelizeValidationError") {
      return {
        success: false,
        message: "Error de validación de datos",
        error: error.errors.map((e) => e.message),
      };
    } else {
      return {
        success: false,
        message: "Error al crear el usuario",
        error: error.message,
      };
    }
  }
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
export const obtenerPerfil = async (req) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: [
        "id",
        "nombreUsuario",
        "rol",
        "peso",
        "altura",
        "email",
        "nombre",
        "segundoNombre",
        "apellidos",
        "enfermedadCronica",
        "estadoFisicoActual",
      ],
    });

    return usuario || null;
  } catch (error) {
    throw new Error("Error al obtener perfil del usuario");
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

  const usuarioExistente = await Usuario.findOne({
    where: { nombreUsuario: nuevoNombreUsuario },
  });
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
export async function iniciarSesion(nombreUsuario, password) {
  try {
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });

    if (!usuario) throw new Error("Usuario no encontrado");

    const contrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!contrasenaValida) throw new Error("Contraseña incorrecta");

    const accessToken = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        nombreUsuario: usuario.nombreUsuario,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: usuario.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}

// Refrescar el token
export const refrescarToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) throw new Error("Usuario no encontrado");

    const newToken = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        nombreUsuario: usuario.nombreUsuario,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token: newToken };
  } catch (error) {
    throw new Error("Refresh token no válido");
  }
};

// Cerrar sesión
export const cerrarSesion = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token)
      return res.status(400).json({ error: "Token no proporcionado" });

    // Aquí podrías agregar el token a una lista de revocación
    await revocarToken(token);

    res.json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
};

// Función ficticia para revocar un token
const revocarToken = async (token) => {
  // Implementa la lógica para almacenar el token en una lista de revocación
};

// Obtener estado del usuario
export const obtenerEstadoUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ["id", "nombreUsuario", "rol"],
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ usuario });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener estado del usuario", error });
  }
};

// Configuración de multer para almacenar las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  }
});

const upload = multer({ storage: storage });

// Middleware para subir la imagen
export const uploadFotoPerfil = upload.single('fotoPerfil');
