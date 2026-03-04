import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      {!isHome && (
        <header style={{
          background: 'var(--color-primario)',
          color: 'white',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <Link to="/" style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>
            Cb Centro De Belleza
          </Link>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.9)' }}>Inicio</Link>
            <Link to="/turnos" style={{ color: 'rgba(255,255,255,0.9)' }}>Turnos</Link>
            <Link to="/tienda" style={{ color: 'rgba(255,255,255,0.9)' }}>Tienda</Link>
          </nav>
        </header>
      )}
      <main>{children}</main>
    </>
  )
}
