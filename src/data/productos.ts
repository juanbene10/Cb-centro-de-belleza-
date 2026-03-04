export interface Producto {
  id: string
  nombre: string
  precio: number
  imagen: string
  categoria: string
}

export const categoriasTienda = ['Categorías', 'Cabello', 'Uñas', 'Skin', 'Accesorios']

// Fotos de productos: podés reemplazar por tus imágenes en public/productos/ (ej. shampoo.jpg)
const PLACEHOLDER_BASE = 'https://picsum.photos/seed'

export const productos: Producto[] = [
  { id: '1', nombre: 'Shampoo reparador', precio: 8500, imagen: `${PLACEHOLDER_BASE}/shampoo/300/300`, categoria: 'Cabello' },
  { id: '2', nombre: 'Acondicionador hidratante', precio: 8200, imagen: `${PLACEHOLDER_BASE}/acondicionador/300/300`, categoria: 'Cabello' },
  { id: '3', nombre: 'Esmalte semi permanente', precio: 4500, imagen: `${PLACEHOLDER_BASE}/esmalte/300/300`, categoria: 'Uñas' },
  { id: '4', nombre: 'Crema de manos', precio: 6200, imagen: `${PLACEHOLDER_BASE}/crema/300/300`, categoria: 'Skin' },
  { id: '5', nombre: 'Secador profesional', precio: 28900, imagen: `${PLACEHOLDER_BASE}/secador/300/300`, categoria: 'Accesorios' },
  { id: '6', nombre: 'Plancha cerámica', precio: 19500, imagen: `${PLACEHOLDER_BASE}/plancha/300/300`, categoria: 'Accesorios' },
  { id: '7', nombre: 'Mascarilla capilar', precio: 7800, imagen: `${PLACEHOLDER_BASE}/mascarilla/300/300`, categoria: 'Cabello' },
  { id: '8', nombre: 'Kit esmaltes x4', precio: 12000, imagen: `${PLACEHOLDER_BASE}/kitesmaltes/300/300`, categoria: 'Uñas' },
]
