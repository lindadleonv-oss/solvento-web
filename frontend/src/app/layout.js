import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'SolVento - Monitoreo Energético IoT',
  description: 'Sistema híbrido eólico-solar de telemetría para resiliencia comunitaria',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className="min-vh-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#F7F9F2', color: '#2C351F' }}>
        <Navbar />
        <main className="flex-grow-1">{children}</main>
        <footer className="py-4 text-center border-top" style={{ backgroundColor: '#EDF2E3', borderColor: '#D8E2C4 !important', color: '#5F6E35' }}>
          <small className="fw-medium">SolVento © 2026 - Universidad Mesoamericana | Proyecto de Graduación</small>
        </footer>
      </body>
    </html>
  );
}