
'use strict';
module.exports = {
  up: async (queryInterface, { INTEGER, STRING, DATE, DATEONLY, ENUM, TEXT }) => {
    await queryInterface.createTable({
      tableName: 'Users',
      schema: process.env.SCHEMA_NAME,
    }, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      email: {
        type: STRING,
        allowNull: false,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  }
};
