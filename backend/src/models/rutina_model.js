import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Resultado from './resultado_model.js';

const Rutina = sequelize.define('Rutina', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resultadoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Resultado,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'Rutina',
});

export default Rutina;