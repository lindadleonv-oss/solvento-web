import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Configuración de la conexión usando variables de entorno (.env.local)
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'solvento_db',
  port: process.env.DB_PORT || 5432,
});

export async function GET() {
  try {
    // Realizamos la consulta directamente a la tabla sensor_readings
    const query = `
      SELECT id, "nodeId", "windSpeed", "solarVoltage", "batteryLevel", "createdAt"
      FROM sensor_readings 
      ORDER BY "createdAt" DESC 
      LIMIT 20;
    `;
    
    const { rows } = await pool.query(query);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error al conectar o consultar PostgreSQL:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}