import { useState } from 'react'
import { productos, categoriasTienda } from '../data/productos'
import type { Producto } from '../data/productos'

function formatPrecio(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n)
}

export default function Tienda() {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Categorías')
  const [carrito, setCarrito] = useState<{ producto: Producto; qty: number }[]>([])

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

  return (
    <div className="tienda">
      <header className="tienda-header">
        <div className="tienda-top">
          <span className="tienda-badge">CENTRO DE BELLEZA</span>
        </div>
        <h1 className="tienda-logo">Cb</h1>
        <input
          type="search"
          placeholder="¿Qué estás buscando?"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="tienda-search"
        />
        <div className="tienda-actions">
          <span className="tienda-user">Entrá / Registrate</span>
          <span className="tienda-cart">
            Carrito ({cantCarrito}) {formatPrecio(totalCarrito)}
          </span>
        </div>
      </header>

      <nav className="tienda-nav">
        <button type="button" className="nav-item">CATEGORIAS ▾</button>
        <button type="button" className="nav-item active">INICIO</button>
        <button type="button" className="nav-item">PRODUCTOS</button>
        <button type="button" className="nav-item">CONTACTO</button>
        <button type="button" className="nav-item">SERVICIOS</button>
      </nav>

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
              <img src={p.imagen} alt={p.nombre} onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect fill="%23f0f0f0" width="300" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="14">Sin imagen</text></svg>') }} />
              <h3>{p.nombre}</h3>
              <p className="producto-precio">{formatPrecio(p.precio)}</p>
              <button type="button" className="btn-principal btn-sm" onClick={() => agregar(p)}>
                Agregar al carrito
              </button>
            </article>
          ))}
        </div>
      </div>

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
        .tienda-header { text-align: center; padding: 1rem; }
        .tienda-top { margin-bottom: 0.5rem; }
        .tienda-badge { font-size: 0.8rem; color: var(--color-primario); font-weight: 600; }
        .tienda-logo { font-size: 2rem; font-weight: 800; margin: 0 0 1rem; letter-spacing: 0.05em; color: var(--color-primario); }
        .tienda-search {
          width: 100%; max-width: 400px; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px;
          margin-bottom: 1rem; font-size: 1rem; display: block; margin-left: auto; margin-right: auto;
        }
        .tienda-actions { display: flex; justify-content: center; gap: 1.5rem; font-size: 0.9rem; }
        .tienda-nav {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; background: var(--color-primario);
          padding: 0.75rem; margin-bottom: 1rem;
        }
        .nav-item {
          background: none; border: none; color: white; padding: 0.5rem 1rem; font-size: 0.9rem; font-weight: 500;
        }
        .nav-item.active { text-decoration: underline; }
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
        .producto-card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
        .producto-card h3 { font-size: 0.95rem; margin: 0.75rem 0.5rem 0; }
        .producto-precio { font-weight: 700; margin: 0.25rem 0 0.75rem; }
        .btn-sm { max-width: none; padding: 0.5rem 1rem; font-size: 0.85rem; }
        .whatsapp-float {
          position: fixed; bottom: 1.5rem; right: 1.5rem; width: 56px; height: 56px; border-radius: 50%;
          background: #25d366; color: white; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}