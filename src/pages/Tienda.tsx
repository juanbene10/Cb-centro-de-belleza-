import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { productos, categoriasTienda } from '../data/productos'
import type { Producto } from '../data/productos'

function formatPrecio(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n)
}

const carouselImages = [
  '/productos/shampoo.png',
  '/productos/acondicionador.png',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
]

export default function Tienda() {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Categorías')
  const [carrito, setCarrito] = useState<{ producto: Producto; qty: number }[]>([])
  const [cookiesAceptadas, setCookiesAceptadas] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const filtrados = productos.filter((p) => {
    const matchBusqueda = !busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const matchCat = categoria === 'Categorías' || p.categoria === categoria
    return matchBusqueda && matchCat
  })

  const totalCarrito = carrito.reduce((sum, i) => sum + i.producto.precio * i.qty, 0)
  const cantCarrito = carrito.reduce((sum, i) => sum + i.qty, 0)

  const agregar = (p: Producto) => {
    setCarrito((prev) => {
      const idx = prev.findIndex((i) => i.producto.id === p.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 }
        return next
      }
      return [...prev, { producto: p, qty: 1 }]
    })
  }

  const CAROUSEL_ITEM_WIDTH = 120
  const CAROUSEL_GAP = 8
  const scrollCarousel = (dir: number) => {
    if (carouselRef.current) {
      const step = (CAROUSEL_ITEM_WIDTH + CAROUSEL_GAP) * dir
      carouselRef.current.scrollBy({ left: step, behavior: 'smooth' })
    }
  }

  return (
    <div className="tienda">
      <div className="tienda-top-bar">
        <span className="tienda-top-text">CENTRO DE BELLEZA</span>
      </div>

      <header className="tienda-header">
        <div className="tienda-header-busqueda">
          <input
            type="search"
            placeholder="¿Qué estás buscando?"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="tienda-search-input"
          />
          <button type="submit" className="tienda-search-btn" aria-label="Buscar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </div>
        <Link to="/" className="tienda-logo">Cb</Link>
        <div className="tienda-actions">
          <span className="tienda-user">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Entrá / Registrate
          </span>
          <div className="tienda-cart">
            <span className="tienda-cart-label">Carrito ({cantCarrito})</span>
            <span className="tienda-cart-total">{formatPrecio(totalCarrito)}</span>
          </div>
        </div>
      </header>

      <nav className="tienda-nav">
        <span className="nav-item nav-label">CATEGORÍAS ▾</span>
        <Link to="/" className="nav-item">INICIO</Link>
        <button type="button" className="nav-item active" onClick={() => setCategoria('Categorías')}>PRODUCTOS</button>
        <a href="https://wa.me/543816727830" target="_blank" rel="noopener noreferrer" className="nav-item">CONTACTO</a>
        <Link to="/turnos" className="nav-item">SERVICIOS</Link>
      </nav>

      <section className="tienda-carousel-wrap">
        <button type="button" className="carousel-arrow carousel-prev" onClick={() => scrollCarousel(-1)} aria-label="Anterior">‹</button>
        <div className="tienda-carousel" ref={carouselRef}>
          {carouselImages.map((src, i) => (
            <div key={i} className="carousel-item">
              <div className="carousel-item-inner">
                <img src={src} alt="" />
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="carousel-arrow carousel-next" onClick={() => scrollCarousel(1)} aria-label="Siguiente">›</button>
      </section>

      <section className="tienda-hero">
        <p className="tienda-hero-text">Un espacio para renovarse</p>
      </section>

      <div className="tienda-filtros">
        {categoriasTienda.map((cat) => (
          <button
            key={cat}
            type="button"
            className={categoria === cat ? 'active' : ''}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="container">
        <div className="productos-grid">
          {filtrados.map((p) => (
            <article key={p.id} className="producto-card">
              <div className="producto-img-wrap">
                <img src={p.imagen} alt={p.nombre} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect fill="%23f0f0f0" width="300" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="14">Sin imagen</text></svg>') }} />
              </div>
              <h3>{p.nombre}</h3>
              <p className="producto-precio">{formatPrecio(p.precio)}</p>
              <button type="button" className="btn-principal btn-sm" onClick={() => agregar(p)}>
                Agregar al carrito
              </button>
            </article>
          ))}
        </div>
      </div>

      {!cookiesAceptadas && (
        <div className="tienda-cookies">
          <p>Al navegar por este sitio aceptás el uso de cookies para agilizar tu experiencia de compra.</p>
          <button type="button" onClick={() => setCookiesAceptadas(true)}>Entendido</button>
        </div>
      )}

      <a
        href="https://wa.me/543816727830"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <style>{`
        .tienda { padding-bottom: 2rem; }
        .tienda-top-bar {
          background: var(--color-primario-claro); padding: 0.4rem 1rem; text-align: right;
        }
        .tienda-top-text { font-size: 0.8rem; font-weight: 600; color: var(--texto-suave); }
        .tienda-header {
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          padding: 1rem; background: white; flex-wrap: wrap; max-width: 1200px; margin: 0 auto;
        }
        .tienda-header-busqueda { display: flex; flex: 1; min-width: 180px; max-width: 400px; }
        .tienda-search-input {
          flex: 1; padding: 0.6rem 0.75rem; border: 1px solid #ddd; border-right: none; border-radius: 8px 0 0 8px; font-size: 0.95rem;
        }
        .tienda-search-btn {
          padding: 0.6rem 0.75rem; border: 1px solid #ddd; border-radius: 0 8px 8px 0;
          background: var(--color-primario-claro); color: var(--texto); cursor: pointer;
        }
        .tienda-logo { font-size: 1.75rem; font-weight: 800; letter-spacing: 0.05em; color: var(--texto); text-decoration: none; }
        .tienda-actions { display: flex; align-items: center; gap: 1.25rem; font-size: 0.9rem; }
        .tienda-user { display: flex; align-items: center; gap: 0.4rem; color: var(--texto); }
        .tienda-cart { display: flex; flex-direction: column; align-items: flex-end; }
        .tienda-cart-label { font-size: 0.85rem; }
        .tienda-cart-total { font-weight: 700; }
        .tienda-nav {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 0.25rem; background: var(--color-primario);
          padding: 0.6rem 1rem;
        }
        .nav-item {
          background: none; border: none; color: white; padding: 0.5rem 1rem; font-size: 0.9rem; font-weight: 500; text-decoration: none;
        }
        .nav-item:hover { opacity: 0.95; }
        .nav-item.active { text-decoration: underline; }
        .nav-item.nav-label { cursor: default; }
        .tienda-carousel-wrap {
          position: relative; max-width: 1200px; margin: 0 auto; padding: 0 2.5rem;
        }
        .carousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.9); border: 1px solid #ddd; font-size: 1.5rem; line-height: 1; cursor: pointer; z-index: 1;
        }
        .carousel-prev { left: 0.5rem; }
        .carousel-next { right: 0.5rem; }
        .tienda-carousel {
          display: flex; gap: 8px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 1rem 0;
          scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth;
        }
        .tienda-carousel::-webkit-scrollbar { display: none; }
        .carousel-item {
          flex-shrink: 0; width: 120px; height: 180px; scroll-snap-align: start; scroll-snap-stop: always;
          border-radius: 8px; overflow: hidden; background: var(--crema);
        }
        .carousel-item-inner {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 8px;
        }
        .carousel-item img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; }
        .tienda-hero {
          min-height: 200px; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, var(--color-primario-claro) 0%, var(--crema) 100%); margin: 1rem 0;
        }
        .tienda-hero-text {
          font-size: 1.75rem; font-weight: 700; color: var(--texto); margin: 0; letter-spacing: 0.02em;
        }
        .tienda-filtros { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; padding: 0 1rem 1rem; }
        .tienda-filtros button {
          padding: 0.5rem 1rem; border: 1px solid #ccc; background: white; border-radius: 999px; font-size: 0.9rem;
        }
        .tienda-filtros button.active { background: var(--color-primario); color: white; border-color: var(--color-primario); }
        .productos-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1.5rem;
        }
        .producto-card {
          background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px var(--sombra);
          text-align: center; padding-bottom: 1rem;
        }
        .producto-card .producto-img-wrap {
          width: 100%; aspect-ratio: 3/4; background: var(--crema); display: flex; align-items: center; justify-content: center; padding: 0.75rem;
        }
        .producto-card .producto-img-wrap img { width: 100%; height: 100%; object-fit: contain; }
        .producto-card h3 { font-size: 0.95rem; margin: 0.75rem 0.5rem 0; }
        .producto-precio { font-weight: 700; margin: 0.25rem 0 0.75rem; }
        .btn-sm { max-width: none; padding: 0.5rem 1rem; font-size: 0.85rem; }
        .tienda-cookies {
          position: fixed; bottom: 1.5rem; left: 1rem; max-width: 320px; padding: 1rem;
          background: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); z-index: 10;
        }
        .tienda-cookies p { margin: 0 0 0.75rem; font-size: 0.85rem; line-height: 1.4; }
        .tienda-cookies button {
          padding: 0.5rem 1rem; background: var(--color-primario); color: white; border: none; border-radius: 6px; font-size: 0.9rem; cursor: pointer;
        }
        .whatsapp-float {
          position: fixed; bottom: 1.5rem; right: 1.5rem; width: 56px; height: 56px; border-radius: 50%;
          background: #25d366; color: white; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}