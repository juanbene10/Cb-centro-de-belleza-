import { useState } from 'react'
import { profesionales, servicios, categorias } from '../data/servicios'
import type { Servicio } from '../data/servicios'

function formatPrecio(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n)
}

export default function Turnos() {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)
  const [carrito, setCarrito] = useState<Servicio[]>([])

  const filtrados = servicios.filter((s) => {
    const matchBusqueda = !busqueda || s.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const matchCat = !categoriaActiva || s.categoria === categoriaActiva
    return matchBusqueda && matchCat
  })

  const porCategoria = categorias.reduce<Record<string, Servicio[]>>((acc, cat) => {
    acc[cat] = filtrados.filter((s) => s.categoria === cat)
    return acc
  }, {})

  const agregar = (s: Servicio) => setCarrito((prev) => [...prev, s])

  return (
    <div className="turnos container">
      <section className="turnos-header">
        <h1>Cb Centro De Belleza</h1>
        <p className="turnos-tagline">✨ Un espacio para renovarse ✨</p>
        <div className="turnos-rating">
          <span className="stars">★★★★★</span>
          <span>4.9 (220)</span>
        </div>
        <p className="turnos-status">Abierto ahora</p>
        <p className="turnos-horarios">
          🕑 Lunes 14:30 a 21 hs · Martes a sábado 9:30 a 21 hs
        </p>
        <p className="turnos-address">
          📍 Belisario Roldán 748, T4000 San Miguel de Tucumán ·{' '}
          <a href="https://www.google.com/maps/search/?api=1&query=Cb+Centro+De+Belleza" target="_blank" rel="noopener noreferrer">
            Ver ubicación
          </a>
        </p>
      </section>

      <section className="turnos-profesionales">
        <h2>Profesionales</h2>
        <div className="profesionales-grid">
          {profesionales.map((p) => (
            <div key={p.id} className="profesional-card">
              <img src={p.avatar} alt={p.nombre} />
              <span>{p.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="turnos-servicios">
        <h2>Servicios</h2>
        <input
          type="search"
          placeholder="Buscar servicios..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="turnos-search"
        />
        <div className="turnos-filtros">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={categoriaActiva === cat ? 'active' : ''}
              onClick={() => setCategoriaActiva(categoriaActiva === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {categorias.map((cat) => {
          const list = porCategoria[cat]
          if (!list?.length) return null
          return (
            <div key={cat} className="servicios-categoria">
              <h3>{cat}</h3>
              <div className="servicios-grid">
                {list.map((s) => (
                  <div key={s.id} className="servicio-card">
                    {s.descuento && (
                      <span className="servicio-badge">{s.descuento}% OFF</span>
                    )}
                    <div className="servicio-info">
                      <strong>{s.nombre}</strong>
                      <span className="servicio-duracion">{s.duracion}</span>
                      <div className="servicio-precio">
                        {s.precioOriginal && (
                          <span className="precio-antiguo">{formatPrecio(s.precioOriginal)}</span>
                        )}
                        <span>{formatPrecio(s.precio)}</span>
                      </div>
                    </div>
                    <button type="button" className="btn-add" onClick={() => agregar(s)} aria-label="Agregar">
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <div className="turnos-banner">
        <p>¡Bienvenida a Cb Centro De Belleza! Pagando en efectivo tenés 20% off.</p>
        <button type="button" className="banner-close" aria-label="Cerrar">×</button>
      </div>

      {carrito.length > 0 && (
        <div className="carrito-turnos">
          <strong>Tu selección ({carrito.length})</strong>
          <p>Total: {formatPrecio(carrito.reduce((sum, s) => sum + s.precio, 0))}</p>
        </div>
      )}

      <style>{`
        .turnos { padding-bottom: 5rem; }
        .turnos-header { text-align: center; margin-bottom: 2rem; }
        .turnos-header h1 { margin: 0 0 0.25rem; font-size: 1.75rem; color: var(--color-primario); }
        .turnos-tagline { margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--texto-suave); }
        .turnos-rating { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.25rem; }
        .turnos-horarios { margin: 0 0 0.25rem; font-size: 0.9rem; color: #555; }
        .stars { color: #eab308; }
        .turnos-status { color: #16a34a; margin: 0 0 0.25rem; font-weight: 500; }
        .turnos-address { margin: 0; font-size: 0.9rem; color: #555; }
        .turnos-address a { color: var(--color-primario); }
        .turnos-profesionales h2, .turnos-servicios h2 { font-size: 1.25rem; margin-bottom: 1rem; }
        .profesionales-grid {
          display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 2rem;
        }
        .profesional-card {
          flex-shrink: 0; text-align: center; width: 80px;
        }
        .profesional-card img {
          width: 64px; height: 64px; border-radius: 50%; object-fit: cover; display: block; margin: 0 auto 0.5rem;
        }
        .profesional-card span { font-size: 0.85rem; }
        .turnos-search {
          width: 100%; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem; font-size: 1rem;
        }
        .turnos-filtros { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .turnos-filtros button {
          padding: 0.5rem 1rem; border: 1px solid var(--color-primario); background: transparent; color: var(--color-primario);
          border-radius: 999px; font-size: 0.9rem;
        }
        .turnos-filtros button.active { background: var(--color-primario); color: white; }
        .servicios-categoria { margin-bottom: 2rem; }
        .servicios-categoria h3 { font-size: 1rem; color: #555; margin-bottom: 0.75rem; }
        .servicios-grid { display: flex; flex-direction: column; gap: 0.75rem; }
        .servicio-card {
          display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border-radius: 12px;
          box-shadow: 0 2px 8px var(--sombra); position: relative;
        }
        .servicio-badge {
          position: absolute; top: 0.5rem; right: 0.5rem; background: var(--descuento); color: white;
          font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;
        }
        .servicio-info { flex: 1; min-width: 0; }
        .servicio-info strong { display: block; }
        .servicio-duracion { font-size: 0.85rem; color: #666; }
        .servicio-precio { margin-top: 0.25rem; }
        .precio-antiguo { text-decoration: line-through; color: #888; margin-right: 0.5rem; }
        .btn-add {
          width: 40px; height: 40px; border-radius: 50%; border: none; background: var(--color-primario); color: white;
          font-size: 1.25rem; line-height: 1; flex-shrink: 0;
        }
        .turnos-banner {
          position: fixed; bottom: 0; left: 0; right: 0; background: var(--color-primario); color: white; padding: 1rem 3rem 1rem 1rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .turnos-banner p { margin: 0; font-size: 0.9rem; }
        .banner-close { background: none; border: none; color: white; font-size: 1.5rem; padding: 0 0.5rem; }
        .carrito-turnos {
          position: fixed; bottom: 4rem; right: 1rem; background: var(--color-primario); color: white; padding: 1rem;
          border-radius: 12px; box-shadow: 0 4px 12px var(--sombra);
        }
      `}</style>
    </div>
  )
}
