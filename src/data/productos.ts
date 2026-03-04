export interface Producto {
  id: string
  nombre: string
  precio: number
  imagen: string
  categoria: string
}

export const categoriasTienda = ['Categorías', 'Cabello', 'Uñas', 'Skin', 'Accesorios']

// Shampoo y acondicionador: fotos propias en public/productos/
export const productos: Producto[] = [
  { id: '1', nombre: 'Shampoo reparador', precio: 8500, imagen: '/productos/shampoo.png', categoria: 'Cabello' },
  { id: '2', nombre: 'Acondicionador hidratante', precio: 8200, imagen: '/productos/acondicionador.png', categoria: 'Cabello' },
  { id: '3', nombre: 'Esmalte semi permanente', precio: 4500, imagen: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop', categoria: 'Uñas' },
  { id: '4', nombre: 'Crema de manos', precio: 6200, imagen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop', categoria: 'Skin' },
  { id: '5', nombre: 'Secador profesional', precio: 28900, imagen: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop', categoria: 'Accesorios' },
  { id: '6', nombre: 'Plancha cerámica', precio: 19500, imagen: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&h=200&fit=crop', categoria: 'Accesorios' },
  { id: '7', nombre: 'Mascarilla capilar', precio: 7800, imagen: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop', categoria: 'Cabello' },
  { id: '8', nombre: 'Kit esmaltes x4', precio: 12000, imagen: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop', categoria: 'Uñas' },
]
