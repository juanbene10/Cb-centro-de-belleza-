import { useState } from 'react'
import { profesionales, servicios, categorias } from '../data/servicios'
import type { Servicio, Profesional } from '../data/servicios'

function formatPrecio(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n)
}

export default function Turnos() {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)
  const [carrito, setCarrito] = useState<Servicio[]>([])
  const [bannerVisible, setBannerVisible] = useState(true)
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<Profesional | null>(null)

  const serviciosParaMostrar = profesionalSeleccionado
    ? servicios.filter((s) => profesionalSeleccionado.serviciosIds.includes(s.id))
    : servicios

  const categoriasVisibles = profesionalSeleccionado
    ? [...new Set(serviciosParaMostrar.map((s) => s.categoria))]
    : categorias

  const filtrados = serviciosParaMostrar.filter((s) => {
    const matchBusqueda = !busqueda || s.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const matchCat = !categoriaActiva || s.categoria === categoriaActiva
    return matchBusqueda && matchCat
  })

  const porCategoria = categorias.reduce<Record<string, Servicio[]>>((acc, cat) => {
    acc[cat] = filtrados.filter((s) => s.categoria === cat)
    return acc
  }, {})

  const agregar = (s: Servicio) => setCarrito((prev) => [...prev, s])

  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null)
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(null)

  const proximosDias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })

  const horarios = ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30']

  const formatDia = (d: Date) => d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })
  const formatDiaKey = (d: Date) => d.toISOString().slice(0, 10)

  const puedeReservar = carrito.length > 0 && fechaSeleccionada && horarioSeleccionado
  const [reservaConfirmada, setReservaConfirmada] = useState<{ fecha: string; hora: string } | null>(null)

  const confirmarTurno = () => {
    if (!puedeReservar) return
    const dia = proximosDias.find((d) => formatDiaKey(d) === fechaSeleccionada)
    setReservaConfirmada({
      fecha: dia ? formatDia(dia) : fechaSeleccionada,
      hora: horarioSeleccionado ?? '',
    })
  }

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
        <h2>Elegí tu profesional</h2>
        <p className="turnos-profesionales-leyenda">Seleccioná a una para ver en qué se especializa</p>
        <div className="profesionales-grid">
          {profesionales.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`profesional-card ${profesionalSeleccionado?.id === p.id ? 'selected' : ''}`}
              onClick={() => {
              setProfesionalSeleccionado(profesionalSeleccionado?.id === p.id ? null : p)
              setCategoriaActiva(null)
            }}
            >
              <img src={p.avatar} alt={p.nombre} />
              <span className="profesional-nombre">{p.nombre}</span>
              <span className="profesional-especialidad">{p.especialidad}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="turnos-servicios">
        <h2>
          {profesionalSeleccionado
            ? `Servicios de ${profesionalSeleccionado.nombre}`
            : 'Servicios'}
        </h2>
        {!profesionalSeleccionado && (
          <p className="turnos-servicios-leyenda turnos-servicios-aviso">Elegí primero una profesional para poder agregar servicios.</p>
        )}
        {profesionalSeleccionado && (
          <p className="turnos-servicios-leyenda">Solo se muestran los servicios que realiza esta profesional.</p>
        )}
        <input
          type="search"
          placeholder="Buscar servicios..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="turnos-search"
        />
        <div className="turnos-filtros">
          {categoriasVisibles.map((cat) => (
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

        {categoriasVisibles.map((cat) => {
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
                    <button
                      type="button"
                      className={`btn-add ${!profesionalSeleccionado ? 'btn-add-disabled' : ''}`}
                      onClick={() => profesionalSeleccionado && agregar(s)}
                      disabled={!profesionalSeleccionado}
                      aria-label="Agregar"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {carrito.length > 0 && (
        <section className="turnos-fecha-hora">
          <h2>Elegí día y horario</h2>
          <p className="turnos-paso-leyenda">Seleccioná la fecha y después el horario disponible</p>
          <div className="turnos-dias">
            {proximosDias.map((d) => {
              const key = formatDiaKey(d)
              const active = fechaSeleccionada === key
              return (
                <button
                  key={key}
                  type="button"
                  className={`turnos-dia-btn ${active ? 'active' : ''}`}
                  onClick={() => setFechaSeleccionada(key)}
                >
                  <span className="turnos-dia-nombre">{d.toLocaleDateString('es-AR', { weekday: 'short' })}</span>
                  <span className="turnos-dia-num">{d.getDate()}</span>
                  <span className="turnos-dia-mes">{d.toLocaleDateString('es-AR', { month: 'short' })}</span>
                </button>
              )
            })}
          </div>
          {fechaSeleccionada && (
            <>
              <h3 className="turnos-horarios-titulo">Horarios disponibles</h3>
              <div className="turnos-horarios-grid">
                {horarios.map((h) => (
                  <button
                    key={h}
                    type="button"
                    className={`turnos-hora-btn ${horarioSeleccionado === h ? 'active' : ''}`}
                    onClick={() => setHorarioSeleccionado(h)}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </>
          )}
          {puedeReservar && (
            <button type="button" className="btn-reservar-turno" onClick={confirmarTurno}>
              Reservar turno
            </button>
          )}
        </section>
      )}

      {reservaConfirmada && (
        <div className="turnos-modal-overlay" onClick={() => setReservaConfirmada(null)}>
          <div className="turnos-modal" onClick={(e) => e.stopPropagation()}>
            <p className="turnos-modal-titulo">¡Turno reservado!</p>
            <p className="turnos-modal-texto">
              Te esperamos el <strong>{reservaConfirmada.fecha}</strong> a las <strong>{reservaConfirmada.hora}</strong>.
            </p>
            <p className="turnos-modal-sub">Nos contactaremos para confirmar.</p>
            <button type="button" className="turnos-modal-btn" onClick={() => setReservaConfirmada(null)}>
              Entendido
            </button>
          </div>
        </div>
      )}

      {bannerVisible && (
        <div className="turnos-banner">
          <p>¡Bienvenida a Cb Centro De Belleza! Pagando en efectivo tenés 20% off.</p>
          <button type="button" className="banner-close" aria-label="Cerrar" onClick={() => setBannerVisible(false)}>×</button>
        </div>
      )}

      {carrito.length > 0 && (
        <div className="carrito-turnos" style={{ bottom: bannerVisible ? '4rem' : '1.5rem' }}>
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
        .turnos-profesionales h2, .turnos-servicios h2 { font-size: 1.25rem; margin-bottom: 0.5rem; }
        .turnos-servicios-leyenda { margin: 0 0 1rem; font-size: 0.9rem; color: #555; }
        .turnos-servicios-aviso { color: var(--color-primario); font-weight: 500; }
        .btn-add-disabled { opacity: 0.5; cursor: not-allowed; }
        .turnos-profesionales-leyenda { margin: -0.5rem 0 1rem; font-size: 0.9rem; color: #555; }
        .profesionales-grid {
          display: flex; flex-wrap: wrap; gap: 1rem; padding-bottom: 0.5rem; margin-bottom: 1rem;
        }
        .profesional-card {
          flex-shrink: 0; text-align: center; width: 100px; padding: 0.75rem; border: 2px solid transparent;
          border-radius: 12px; background: white; box-shadow: 0 2px 8px var(--sombra); cursor: pointer;
          display: flex; flex-direction: column; align-items: center; gap: 0.35rem; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .profesional-card:hover { border-color: var(--color-primario-claro); box-shadow: 0 4px 12px var(--sombra); }
        .profesional-card.selected { border-color: var(--color-primario); box-shadow: 0 0 0 2px var(--color-primario-claro); }
        .profesional-card img {
          width: 64px; height: 64px; border-radius: 50%; object-fit: cover; display: block;
        }
        .profesional-nombre { font-size: 0.9rem; font-weight: 600; color: var(--texto); }
        .profesional-especialidad { font-size: 0.75rem; color: var(--color-primario); }
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
        .turnos-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;
          z-index: 100; padding: 1rem;
        }
        .turnos-modal {
          background: white; border-radius: 16px; padding: 2rem; max-width: 340px; width: 100%;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2); text-align: center;
        }
        .turnos-modal-titulo { font-size: 1.35rem; font-weight: 700; color: var(--color-primario); margin: 0 0 1rem; }
        .turnos-modal-texto { font-size: 1rem; color: var(--texto); margin: 0 0 0.5rem; line-height: 1.5; }
        .turnos-modal-texto strong { color: var(--color-primario); }
        .turnos-modal-sub { font-size: 0.9rem; color: #666; margin: 0 0 1.5rem; }
        .turnos-modal-btn {
          padding: 0.75rem 2rem; background: var(--color-primario); color: white; border: none; border-radius: 10px;
          font-size: 1rem; font-weight: 600; cursor: pointer;
        }
        .turnos-modal-btn:hover { background: var(--color-primario-hover); }
        .carrito-turnos {
          position: fixed; bottom: 4rem; right: 1rem; background: var(--color-primario); color: white; padding: 1rem;
          border-radius: 12px; box-shadow: 0 4px 12px var(--sombra);
        }
        .turnos-fecha-hora {
          margin-top: 2rem; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 2px 12px var(--sombra);
        }
        .turnos-fecha-hora h2 { font-size: 1.25rem; margin: 0 0 0.25rem; color: var(--color-primario); }
        .turnos-paso-leyenda { margin: 0 0 1rem; font-size: 0.9rem; color: #555; }
        .turnos-dias { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .turnos-dia-btn {
          display: flex; flex-direction: column; align-items: center; padding: 0.6rem 0.75rem; min-width: 56px;
          border: 2px solid #e0e0e0; border-radius: 10px; background: #fafafa; cursor: pointer; font-size: 0.85rem;
        }
        .turnos-dia-btn:hover { border-color: var(--color-primario-claro); background: var(--crema); }
        .turnos-dia-btn.active { border-color: var(--color-primario); background: var(--color-primario-claro); color: var(--texto); }
        .turnos-dia-nombre { text-transform: capitalize; color: #666; }
        .turnos-dia-num { font-weight: 700; font-size: 1.1rem; }
        .turnos-dia-mes { text-transform: capitalize; color: #666; font-size: 0.8rem; }
        .turnos-horarios-titulo { font-size: 1rem; margin: 0 0 0.75rem; color: #333; }
        .turnos-horarios-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .turnos-hora-btn {
          padding: 0.5rem 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; background: #fafafa;
          font-size: 0.9rem; cursor: pointer;
        }
        .turnos-hora-btn:hover { border-color: var(--color-primario-claro); }
        .turnos-hora-btn.active { border-color: var(--color-primario); background: var(--color-primario); color: white; }
        .btn-reservar-turno {
          width: 100%; padding: 1rem; background: var(--color-primario); color: white; border: none; border-radius: 10px;
          font-size: 1rem; font-weight: 600; cursor: pointer;
        }
        .btn-reservar-turno:hover { background: var(--color-primario-hover); }
        @media (max-width: 768px) {
          .turnos-header h1 { font-size: 1.5rem; }
          .turnos-header { margin-bottom: 1.5rem; }
          .profesionales-grid { overflow-x: auto; flex-wrap: nowrap; padding-bottom: 0.5rem; -webkit-overflow-scrolling: touch; }
          .profesional-card { flex-shrink: 0; }
          .servicio-card { padding: 0.85rem; gap: 0.75rem; }
          .btn-add { width: 44px; height: 44px; min-width: 44px; min-height: 44px; font-size: 1.35rem; }
          .turnos-banner { padding: 0.85rem 2.5rem 0.85rem 0.85rem; }
          .turnos-banner p { font-size: 0.85rem; }
          .carrito-turnos { right: 0.75rem; padding: 0.85rem; font-size: 0.9rem; }
        }
        @media (max-width: 480px) {
          .turnos { padding-bottom: 5.5rem; }
          .turnos-header h1 { font-size: 1.35rem; }
          .turnos-tagline, .turnos-horarios { font-size: 0.85rem; }
          .turnos-dia-btn { min-width: 52px; padding: 0.5rem 0.6rem; font-size: 0.8rem; }
          .turnos-hora-btn { padding: 0.6rem 0.85rem; min-height: 44px; }
          .btn-reservar-turno { padding: 0.9rem; min-height: 48px; }
          .turnos-modal { padding: 1.5rem; margin: 1rem; }
          .turnos-modal-titulo { font-size: 1.2rem; }
          .turnos-modal-btn { padding: 0.85rem 1.5rem; min-height: 48px; }
        }
      `}</style>
    </div>
  )
}
