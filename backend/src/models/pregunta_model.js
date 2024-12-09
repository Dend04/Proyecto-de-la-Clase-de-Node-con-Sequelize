import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Test from './test_model.js';

const Pregunta = sequelize.define('Pregunta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  texto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  testId: {
    type: DataTypes.INTEGER,
    references: {
      model: Test,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'Pregunta',
});

export default Pregunta;