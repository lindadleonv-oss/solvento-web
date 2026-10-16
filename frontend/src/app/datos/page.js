"use client";
import { useEffect, useState } from 'react';

export default function LecturaDatos() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/telemetry');
      if (res.ok) {
        const data = await res.json();
        setReadings(data);
      }
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 10000);
    return () => clearInterval(interval);
  }, []);

  const latest = readings[0] || {};

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="h3 fw-bold" style={{ color: '#5F6E35' }}>Panel de Telemetría IoT</h1>
          <p className="text-muted small mb-0">Monitoreo continuo de parámetros transmitidos por el nodo en tiempo real</p>
        </div>
        <button 
          onClick={fetchTelemetry} 
          className="btn btn-outline-secondary btn-sm rounded-pill px-3"
          style={{ borderColor: '#5F6E35', color: '#5F6E35' }}
        >
          🔄 Actualizar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5 text-muted">Cargando lecturas de la base de datos...</div>
      ) : (
        <>
          {/* Tarjetas de estado actual */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card card-figma p-4">
                <span className="text-uppercase text-muted small fw-bold">Velocidad del Viento</span>
                <div className="display-6 fw-bold mt-2" style={{ color: '#5F6E35' }}>
                  {latest.windSpeed ?? '--'} <span className="fs-5 text-muted fw-normal">m/s</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-figma p-4">
                <span className="text-uppercase text-muted small fw-bold">Voltaje Solar</span>
                <div className="display-6 fw-bold mt-2" style={{ color: '#5F6E35' }}>
                  {latest.solarVoltage ?? '--'} <span className="fs-5 text-muted fw-normal">V</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-figma p-4">
                <span className="text-uppercase text-muted small fw-bold">Nivel de Batería</span>
                <div className="display-6 fw-bold mt-2" style={{ color: '#5F6E35' }}>
                  {latest.batteryLevel ?? '--'} <span className="fs-5 text-muted fw-normal">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de registros */}
          <div className="card card-figma overflow-hidden">
            <div className="card-header bg-white border-bottom py-3 px-4">
              <h5 className="mb-0 fs-6 fw-bold" style={{ color: '#5F6E35' }}>Historial Reciente de Transmisiones</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light text-muted small text-uppercase">
                  <tr>
                    <th className="py-3 px-4">Nodo</th>
                    <th className="py-3">Viento (m/s)</th>
                    <th className="py-3">Voltaje (V)</th>
                    <th className="py-3">Batería (%)</th>
                    <th className="py-3 px-4">Fecha / Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        No hay registros almacenados en la base de datos.
                      </td>
                    </tr>
                  ) : (
                    readings.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td className="px-4 fw-bold font-monospace" style={{ color: '#5F6E35' }}>{item.nodeId}</td>
                        <td>{item.windSpeed}</td>
                        <td>{item.solarVoltage}</td>
                        <td>
                          <span className="badge rounded-pill px-2 py-1" style={{ backgroundColor: '#A9BE6F', color: '#FFFFFF' }}>
                            {item.batteryLevel}%
                          </span>
                        </td>
                        <td className="px-4 small text-muted">
                          {new Date(item.createdAt).toLocaleString('es-GT')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}