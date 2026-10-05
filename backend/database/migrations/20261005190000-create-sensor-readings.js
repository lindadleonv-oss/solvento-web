'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Idempotente: si la tabla ya existe (servidor actual), no la recrea
    try {
      await queryInterface.describeTable('sensor_readings');
      console.log('La tabla sensor_readings ya existe, se omite la creación.');
      return;
    } catch (e) {
      // No existe, se crea abajo
    }

    await queryInterface.createTable('sensor_readings', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nodeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      windSpeed: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      solarVoltage: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      batteryLevel: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sensor_readings');
  },
};
