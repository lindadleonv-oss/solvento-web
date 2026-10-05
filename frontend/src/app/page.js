'use client';

import { useState, useEffect } from 'react';

export default function SolVentoDashboard() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTelemetry = async () => {
    try {
      const response = await fetch('/api/telemetry');
      if (!response.ok) throw new Error('No se pudo obtener la información');
      const data = await response.json();
      setReadings(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los datos de los sensores');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* ENCABEZADO CON LOGO */}
      <header style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', borderBottom: '2px solid #ddd', paddingBottom: '15px' }}>
        <img 
          src="/logo1.png" 
          alt="SolVento Logo" 
          style={{ width: '70px', height: '70px', objectFit: 'contain' }} 
        />
        <div>
          <h1 style={{ color: '#53733d', margin: '0 0 5px 0' }}>SolVento — Panel de Monitoreo</h1>
          <p style={{ color: '#555', margin: 0 }}>
            Sistema de energía híbrido eólico-solar para Aldea Los Paxtes, Salamá, Baja Verapaz.
          </p>
        </div>
      </header>

      {loading && <p>Cargando lecturas de telemetría...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && readings.length === 0 && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <p style={{ margin: 0, color: '#666' }}>No hay registros todavía. Esperando datos del módulo SIM900...</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {readings.map((reading) => (
          <div 
            key={reading.id} 
            style={{ 
              backgroundColor: '#ffffff', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              borderLeft: '5px solid #27ae60'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Nodo: {reading.nodeId}</h3>
            <p style={{ margin: '5px 0', color: '#555' }}>💨 <strong>Velocidad Viento:</strong> {reading.windSpeed} m/s</p>
            <p style={{ margin: '5px 0', color: '#555' }}>☀️ <strong>Voltaje Solar:</strong> {reading.solarVoltage} V</p>
            <p style={{ margin: '5px 0', color: '#555' }}>🔋 <strong>Batería:</strong> {reading.batteryLevel}%</p>
            <small style={{ color: '#999', display: 'block', marginTop: '12px' }}>
              {new Date(reading.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </main>
  );
}