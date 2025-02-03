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

// Definir la relación entre Test y Pregunta
Test.hasMany(Pregunta, { foreignKey: 'testId', as: 'Preguntas' }); // Un Test tiene muchas Preguntas
Pregunta.belongsTo(Test, { foreignKey: 'testId' }); // Una Pregunta pertenece a un Test


export default Pregunta;