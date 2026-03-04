import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      {!isHome && (
        <header className="app-header">
          <Link to="/" className="brand">Cb Centro De Belleza</Link>
          <nav className="app-nav">
            <Link to="/">Inicio</Link>
            <Link to="/turnos">Turnos</Link>
            <Link to="/tienda">Tienda</Link>
          </nav>
        </header>
      )}
      <main>{children}</main>
    </>
  )
}
