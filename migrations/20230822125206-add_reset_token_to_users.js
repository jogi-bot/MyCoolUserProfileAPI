'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users', // table name
      'resetToken', // new column name
      {
        type: Sequelize.STRING, // Use the appropriate data type for your needs
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'resetToken');
  }
};
