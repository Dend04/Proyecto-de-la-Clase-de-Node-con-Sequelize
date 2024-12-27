import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Test = sequelize.define('Test', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: true, // Permitir que sea nulo
  },
  dificultad: {
    type: DataTypes.ENUM('facil', 'medio', 'dificil'),
    allowNull: true, // Permitir que sea nulo
  },
  etiqueta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'Test',
});

export default Test;