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
  resultado: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deficiencias: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true,
  tableName: 'Resultado',
});

Resultado.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Resultado.belongsTo(Test, { foreignKey: 'testId' });

export default Resultado;