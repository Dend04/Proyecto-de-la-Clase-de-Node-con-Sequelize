import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  segundoNombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  rol: {
    type: DataTypes.ENUM('usuario', 'administrador'),
    allowNull: false,
    defaultValue: 'usuario',
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  altura: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  enfermedadCronica: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estadoFisicoActual: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Esto añade automáticamente los campos createdAt y updatedAt
  tableName: 'Usuario', // Nombre de la tabla en la base de datos
  hooks: {
    beforeCreate: async (usuario) => {
      // Generar nombre de usuario si no se proporciona
      if (!usuario.nombreUsuario) {
        await generateUniqueUsername(usuario);
      }

      // Hashear la contraseña
      if (usuario.password) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      }
    },
    beforeUpdate: async (usuario) => {
      // Hashear la contraseña si ha sido modificada
      if (usuario.password) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      }
    },
  },
});

async function generateUniqueUsername(usuario) {
  const nombres = [usuario.nombre, usuario.segundoNombre].filter(Boolean);
  const apellidos = usuario.apellidos.split(' ');

  // Definir posibles combinaciones de nombres y apellidos
  const posiblesCombinaciones = [
    () => `${nombres[0][0]}${apellidos[0]}`.toLowerCase(),
    () => nombres[1] ? `${nombres[1][0]}${apellidos[0]}`.toLowerCase() : null,
    () => apellidos[1] ? `${nombres[0][0]}${apellidos[1]}`.toLowerCase() : null,
    () => nombres[1] && apellidos[1] ? `${nombres[1][0]}${apellidos[1]}`.toLowerCase() : null,
    () => `${nombres[0]}${apellidos[0]}`.toLowerCase(),
    () => nombres[1] ? `${nombres[1]}${apellidos[0]}`.toLowerCase() : null,
    () => apellidos[1] ? `${nombres[0]}${apellidos[1]}`.toLowerCase() : null,
    () => nombres[1] && apellidos[1] ? `${nombres[1]}${apellidos[1]}`.toLowerCase() : null,
  ];

  let username;
  let attempts = 0;

  while (true) {
    if (attempts < posiblesCombinaciones.length) {
      username = posiblesCombinaciones[attempts]();
    } else {
      username = `${nombres[0][0]}${apellidos[0]}${attempts - posiblesCombinaciones.length + 1}`.toLowerCase();
    }

    if (username && !(await Usuario.findOne({ where: { nombreUsuario: username } }))) {
      break;
    }

    attempts++;
  }

  usuario.nombreUsuario = username;
}

export default Usuario;