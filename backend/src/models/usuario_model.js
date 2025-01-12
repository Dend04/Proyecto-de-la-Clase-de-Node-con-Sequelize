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
      // Generar nombre de usuario
      await generateUniqueUsername(usuario);

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
    () => `${nombres[0][0]}${apellidos[0]}`.toLowerCase(), // Primera letra del primer nombre + primer apellido
    () => nombres[1] ? `${nombres[1][0]}${apellidos[0]}`.toLowerCase() : null, // Primera letra del segundo nombre + primer apellido
    () => apellidos[1] ? `${nombres[0][0]}${apellidos[1]}`.toLowerCase() : null, // Primera letra del primer nombre + segundo apellido
    () => nombres[1] && apellidos[1] ? `${nombres[1][0]}${apellidos[1]}`.toLowerCase() : null, // Primera letra del segundo nombre + segundo apellido
    () => `${nombres[0]}${apellidos[0]}`.toLowerCase(), // Primer nombre completo + primer apellido
    () => nombres[1] ? `${nombres[1]}${apellidos[0]}`.toLowerCase() : null, // Segundo nombre completo + primer apellido
    () => apellidos[1] ? `${nombres[0]}${apellidos[1]}`.toLowerCase() : null, // Primer nombre completo + segundo apellido
    () => nombres[1] && apellidos[1] ? `${nombres[1]}${apellidos[1]}`.toLowerCase() : null, // Segundo nombre completo + segundo apellido
  ];

  let username;
  let attempts = 0;

  while (true) {
    if (attempts < posiblesCombinaciones.length) {
      // Intentar con las combinaciones predefinidas
      username = posiblesCombinaciones[attempts]();
    } else {
      // Añadir un número al final si todas las combinaciones fallan
      username = `${nombres[0][0]}${apellidos[0]}${attempts - posiblesCombinaciones.length + 1}`.toLowerCase();
    }

    // Verificar si el nombre de usuario es único
    if (username && !(await Usuario.findOne({ where: { nombreUsuario: username } }))) {
      break;
    }

    attempts++;
  }

  usuario.nombreUsuario = username;
}

export default Usuario;