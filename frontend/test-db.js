const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });

// 1. Conexión directa para la prueba
const sequelize = new Sequelize(
  process.env.DB_NAME || 'solvento_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

// 2. Definir el modelo temporalmente aquí para la prueba
const SensorReading = sequelize.define('SensorReading', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
}, {
  tableName: 'sensor_readings',
  timestamps: true,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('¡Conexión establecida con éxito en PostgreSQL!');

    await sequelize.sync({ force: false });
    console.log('¡Tabla sensor_readings creada/sincronizada correctamente!');

    process.exit(0);
  } catch (error) {
    console.error('Error al conectar o sincronizar la base de datos:', error);
    process.exit(1);
  }
}

testConnection();