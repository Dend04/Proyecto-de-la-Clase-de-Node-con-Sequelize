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
  respuesta_boolean: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  respuesta_textual: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  respuesta_numerica: {
    type: DataTypes.INTEGER,
    allowNull: true,
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