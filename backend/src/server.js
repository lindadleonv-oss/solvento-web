import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Linda.22',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'solvento_db',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Endpoint to receive data from transmitter node (POST)
app.post('/api/data', async (req, res) => {
  const { nodeId, windSpeed, solarVoltage, batteryLevel } = req.body;
  console.log('Datos recibidos del nodo transmisor:', req.body);

  try {
    const result = await pool.query(
      `INSERT INTO sensor_readings ("nodeId", "windSpeed", "solarVoltage", "batteryLevel", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING *`,
      [nodeId, windSpeed, solarVoltage, batteryLevel]
    );
    res.json({ status: 'ok', message: 'Datos recibidos y almacenados correctamente', data: result.rows[0] });
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    res.status(500).json({ status: 'error', message: 'No se pudieron guardar los datos', error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  const localAddr = server.address();
  console.log(`Servidor backend corriendo en http://0.0.0.0:${PORT}`);
  console.log(`URL pública mediante playit: http://pgsql-attitudes.tun.ply.gg:${PORT}`);
  console.log(`Dirección local: ${localAddr.address}:${localAddr.port}`);
});