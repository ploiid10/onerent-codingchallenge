'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Property', {
      id: {
        type: Sequelize.UUID,   
        allowNull: false,
        primaryKey: true,
        defaultValue : Sequelize.UUIDV4
      },
      street: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      rent: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'User', 
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Property');
  }
};