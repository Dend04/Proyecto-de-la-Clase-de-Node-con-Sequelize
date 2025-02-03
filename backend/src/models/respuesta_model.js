import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pregunta from './pregunta_model.js';

const Respuesta = sequelize.define('Respuesta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.ENUM('multiple', 'unica', 'texto', 'numero'),
    allowNull: false,
  },
  respuesta: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  correcta: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  preguntaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Pregunta,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'Respuesta',
});

export default Respuesta;