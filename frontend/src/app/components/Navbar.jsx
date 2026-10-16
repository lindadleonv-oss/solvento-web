"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Lectura de Datos', href: '/datos' },
    { name: 'Rastreo', href: '/rastreo' },
    { name: 'Sobre Nosotros', href: '/about' },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3 shadow-sm" style={{ borderColor: '#D8E2C4' }}>
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-decoration-none" style={{ color: '#5F6E35' }}>
          {/* LOGO: Reemplaza el src con la ruta de tu imagen (ej. /logo.png o un enlace externo) */}
          <img 
            src="/logo.png" 
            alt="SolVento Logo" 
            width="36" 
            height="36" 
            className="d-inline-block align-text-top object-fit-contain"
            // Si la imagen no carga todavía o no la tienes en public/, puedes usar una imagen temporal o SVG por defecto:
            onError={(e)=>{e.target.src='https://cdn-icons-png.flaticon.com/512/3222/3222800.png'}}
          />
          <span>Sol<span style={{ color: '#A9BE6F' }}>Vento</span></span>
          <span className="badge ms-1 fs-6 fw-normal rounded-pill px-2 py-1" style={{ backgroundColor: '#A9BE6F', color: '#FFFFFF', fontSize: '0.75rem' }}>
            IoT
          </span>
        </Link>

        <div className="navbar-nav ms-auto flex-row gap-4 align-items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-decoration-none fw-medium transition"
                style={{
                  color: isActive ? '#5F6E35' : '#525B44',
                  borderBottom: isActive ? '2px solid #5F6E35' : 'none',
                  paddingBottom: '2px'
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}