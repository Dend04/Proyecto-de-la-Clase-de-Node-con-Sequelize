import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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
}, {
  timestamps: true, // Esto añade automáticamente los campos createdAt y updatedAt
  tableName: 'Usuario', // Nombre de la tabla en la base de datos
});

export default Usuario;