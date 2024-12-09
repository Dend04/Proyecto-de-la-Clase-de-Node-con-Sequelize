import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './usuario_model.js';
import Test from './test_model.js';

const Resultado = sequelize.define('Resultado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  testId: {
    type: DataTypes.INTEGER,
    references: {
      model: Test,
      key: 'id',
    },
  },
  planchas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  abdominales: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  flexibilidad: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  velocidad: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  resistenccia: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tiempo_descanso: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  deficiencias: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true,
  tableName: 'Resultado',
});

export default Resultado;