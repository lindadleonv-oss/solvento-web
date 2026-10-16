import Link from 'next/link';

export default function Home() {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mx-auto my-5 py-4" style={{ maxWidth: '850px' }}>
        <span 
          className="badge rounded-pill px-3 py-2 mb-3 fw-semibold shadow-sm" 
          style={{ backgroundColor: '#A9BE6F', color: '#FFFFFF', fontSize: '0.85rem' }}
        >
          Tecnología & Resiliencia Comunitaria
        </span>
        
        <h1 className="display-4 fw-bold mb-4" style={{ color: '#5F6E35', letterSpacing: '-0.025em' }}>
          Solvento un proyecto que nace del sol y el viento :)
        </h1>
        
        {/* Texto corregido con color visible y legible */}
        <p className="lead mb-5" style={{ color: '#4A5629', fontSize: '1.15rem', lineHeight: '1.6' }}>
          Sistema autónomo eólico-solar diseñado para garantizar respaldo eléctrico, comunicación crítica y monitoreo ambiental en comunidades vulnerables.
        </p>

        {/* Botones con visibilidad garantizada */}
        <div className="d-flex justify-content-center gap-3">
        <Link 
            href="/datos" 
            className="btn btn-lg px-4 rounded-pill fw-medium shadow-sm"
            style={{ borderColor: '#5F6E35', color: '#5F6E35', borderWidth: '2px', backgroundColor: 'transparent' }}
          >
            Ver Monitoreo en Vivo
          </Link>
          
          <Link 
            href="/rastreo" 
            className="btn btn-lg px-4 rounded-pill fw-medium shadow-sm"
            style={{ borderColor: '#5F6E35', color: '#5F6E35', borderWidth: '2px', backgroundColor: 'transparent' }}
          >
            Ubicación del Nodo
          </Link>
        </div>
      </div>

      {/* Cards Informativas */}
      <div className="row g-4 mt-5">
        <div className="col-md-4">
          <div className="card card-figma p-4 h-100">
            <div className="fs-2 mb-3" style={{ color: '#5F6E35' }}>⚡</div>
            <h3 className="h5 fw-bold mb-2" style={{ color: '#5F6E35' }}>Generación Híbrida</h3>
            <p style={{ color: '#525B44' }} className="small mb-0">
              Aprovechamiento simultáneo de radiación solar y flujo eólico mediante microturbinas optimizadas para entornos off-grid.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-figma p-4 h-100">
            <div className="fs-2 mb-3" style={{ color: '#5F6E35' }}>📡</div>
            <h3 className="h5 fw-bold mb-2" style={{ color: '#5F6E35' }}>Telemetría IoT</h3>
            <p style={{ color: '#525B44' }} className="small mb-0">
              Transmisión remota de lecturas de tensión y velocidad del viento a través de redes GSM con SIM900 hacia una base centralizada.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-figma p-4 h-100">
            <div className="fs-2 mb-3" style={{ color: '#5F6E35' }}>🛡️</div>
            <h3 className="h5 fw-bold mb-2" style={{ color: '#5F6E35' }}>Resiliencia Comunitaria</h3>
            <p style={{ color: '#525B44' }} className="small mb-0">
              Garantía de respaldo eléctrico crítico para recarga de dispositivos de emergencia, iluminación y coordinación local.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}