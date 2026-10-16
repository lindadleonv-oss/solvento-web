export default function About() {
    return (
      <div className="container py-5" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-5">
          <span className="badge rounded-pill px-3 py-2 mb-2 fw-medium" style={{ backgroundColor: '#A9BE6F', color: '#FFFFFF' }}>
            Investigación Académica
          </span>
          <h1 className="h2 fw-bold mb-3" style={{ color: '#5F6E35' }}>Sobre SolVento</h1>
          <p className="text-muted">
            Proyecto de desarrollo tecnológico para la generación eléctrica descentralizada y el monitoreo ambiental en zonas vulnerables.
          </p>
        </div>
  
        <div className="card card-figma p-5 mb-4">
          <h2 className="h4 fw-bold mb-3" style={{ color: '#5F6E35' }}>Contexto y Motivación</h2>
          <p className="text-muted leading-relaxed">
            En múltiples regiones rurales, la infraestructura eléctrica convencional resulta frágil frente a eventos climáticos y emergencias. El colapso del suministro interrumpe servicios vitales como la carga de dispositivos de comunicación, iluminación de centros comunitarios y la obtención de información oportuna.
          </p>
          <p className="text-muted leading-relaxed mb-0">
            <strong>SolVento</strong> surge como un modelo de ingeniería enfocado en resolver esta problemática mediante una arquitectura híbrida eólica-solar acompañada de una plataforma IoT de bajo costo, alta disponibilidad y fácil despliegue.
          </p>
        </div>
  
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card card-figma p-4 h-100">
              <h3 className="h5 fw-bold mb-3" style={{ color: '#5F6E35' }}>Especificaciones Técnicas</h3>
              <ul className="text-muted small list-unstyled vstack gap-2 mb-0">
                <li>✓ <strong>Hardware:</strong> Módulo GSM SIM900 + Microcontrolador.</li>
                <li>✓ <strong>Backend:</strong> Next.js App Router + API Routes.</li>
                <li>✓ <strong>Base de Datos:</strong> PostgreSQL para almacenamiento.</li>
                <li>✓ <strong>Redes:</strong> Comunicación HTTP POST vía túnel TCP.</li>
              </ul>
            </div>
          </div>
  
          <div className="col-md-6">
            <div className="card card-figma p-4 h-100">
              <h3 className="h5 fw-bold mb-3" style={{ color: '#5F6E35' }}>Respaldo Institucional</h3>
              <p className="text-muted small mb-0">
                Desarrollado como proyecto de graduación para la carrera de Ingeniería en Sistemas en la <strong>Universidad Mesoamericana</strong>, alineado con estándares internacionales de documentación técnica IEEE.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }