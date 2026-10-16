export default function Rastreo() {
    // Coordenadas geográficas exactas de Aldea Los Paxtes
    const lat = 14.9000;
    const lng = -90.3500;
  
    return (
      <div className="container py-5">
        <div className="mb-5">
          <h1 className="h3 fw-bold" style={{ color: '#5F6E35' }}>Geolocalización del Nodo</h1>
          <p className="text-muted small">Ubicación física del sitio piloto e infraestructura desplegada</p>
        </div>
  
        <div className="row g-4">
          {/* Panel lateral con metadatos */}
          <div className="col-lg-4">
            <div className="card card-figma p-4 h-100">
              <h2 className="h5 fw-bold border-bottom pb-3 mb-4" style={{ color: '#5F6E35', borderColor: '#D8E2C4 !important' }}>
                Detalles de Instalación
              </h2>
              <div className="mb-3">
                <span className="d-block text-muted small text-uppercase fw-bold">Comunidad Piloto</span>
                <span className="fw-semibold" style={{ color: '#2C351F' }}>Aldea Los Paxtes</span>
              </div>
              <div className="mb-3">
                <span className="d-block text-muted small text-uppercase fw-bold">Ubicación Administrativa</span>
                <span className="text-secondary">Salamá, Baja Verapaz, Guatemala</span>
              </div>
              <div className="mb-3">
                <span className="d-block text-muted small text-uppercase fw-bold">Coordenadas Exactas (GPS)</span>
                <span className="font-monospace text-secondary">14° 54' 00" N, 90° 21' 00" O</span>
                <span className="d-block font-monospace text-muted small">({lat}, {lng})</span>
              </div>
              <div className="mt-4">
                <span className="d-block text-muted small text-uppercase fw-bold mb-2">Estado de Red</span>
                <span className="badge px-3 py-2 rounded-pill fw-medium shadow-sm" style={{ backgroundColor: '#A9BE6F', color: '#FFFFFF' }}>
                  ● En línea (GSM / SIM900)
                </span>
              </div>
            </div>
          </div>
  
          {/* Mapa Interactivo */}
          <div className="col-lg-8">
            <div className="card card-figma overflow-hidden h-100 shadow-sm" style={{ minHeight: '400px' }}>
              <iframe
                title="Mapa de ubicación del nodo en Aldea Los Paxtes"
                width="100%"
                height="100%"
                className="flex-grow-1 border-0"
                style={{ minHeight: '400px' }}
                src={`https://maps.google.com/maps?q=${lat},${lng}&z=13&output=embed`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }