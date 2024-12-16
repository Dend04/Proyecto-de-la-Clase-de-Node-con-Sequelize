'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Resultado', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuario',
          key: 'id',
        },
      },
      testId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Test',
          key: 'id',
        },
      },
      planchas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      abdominales: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      flexibilidad: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      velocidad: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      resistenccia: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tiempo_descanso: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      deficiencias: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Resultado');
  }
};