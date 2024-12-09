import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pregunta from './pregunta_model.js';

const Respuesta = sequelize.define('Respuesta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  respuesta_boolean: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  respuesta_textual: {
    type: DataTypes.STRING,
    allowNull: false,
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