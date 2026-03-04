# Deploy — Cb Centro De Belleza

## Opción 1: Vercel (recomendado)

1. Entrá a **[vercel.com](https://vercel.com)** e iniciá sesión (con GitHub).
2. Click en **Add New** → **Project**.
3. Importá el repo **juanbene10/Cb-centro-de-belleza-** desde GitHub.
4. Vercel detecta el proyecto. Dejá:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click en **Deploy**.
6. En unos minutos te dan una URL tipo `cb-centro-de-belleza-xxx.vercel.app`. Podés usar ese link o conectar un dominio propio.

---

## Opción 2: Netlify

1. Entrá a **[netlify.com](https://netlify.com)** e iniciá sesión (con GitHub).
2. **Add new site** → **Import an existing project** → elegí GitHub y el repo **Cb-centro-de-belleza-**.
3. Configuración:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Deploy**. La URL será tipo `xxx.netlify.app`.

---

## Después del deploy

- Probá: `https://tu-url.vercel.app/`, `/turnos`, `/tienda`.
- Si algo no carga (imágenes, rutas), revisá que el build sea `npm run build` y la carpeta publicada sea `dist`.
