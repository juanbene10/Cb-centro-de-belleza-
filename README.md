# Cb Centro De Belleza — Maqueta para cliente

Maqueta web del salón **Cb Centro De Belleza** (Belisario Roldán 748, San Miguel de Tucumán) lista para presentar al cliente.

---

## Cómo mostrar la maqueta

1. En la carpeta del proyecto ejecutá:
   ```bash
   npm install
   npm run dev
   ```
2. Abrí en el navegador: **http://localhost:5173**
3. Recorré: **Inicio** → **Turnos** → **Tienda** (y los botones de WhatsApp y Ubicación).

---

## Qué incluye la maqueta

| Sección | Contenido |
|--------|-----------|
| **Inicio** | Logo, eslogan “Un espacio para renovarse”, horarios, dirección y botones: Tienda Online, App de Turnos, WhatsApp, Ubicación (Maps). |
| **Turnos** | Elección de profesional (con fotos y especialidad), servicios filtrados por profesional, precios, 20% off en efectivo, banner cerrable. |
| **Tienda** | Cabecera tipo e-commerce, carrusel, banner “Un espacio para renovarse”, categorías, productos (shampoo y acondicionador con fotos reales), carrito, aviso de cookies, WhatsApp flotante. |

**Datos cargados:** dirección, horarios, WhatsApp (+54 381 672-7830), fotos del personal y de productos (shampoo/acondicionador), servicios y precios de ejemplo.

---

## Build para subir a un servidor

```bash
npm run build
npm run preview
```

La carpeta **dist/** contiene los archivos listos para publicar. Se puede desplegar en Vercel, Netlify o cualquier hosting estático.
