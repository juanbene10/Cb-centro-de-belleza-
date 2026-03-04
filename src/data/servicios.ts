export interface Servicio {
  id: string
  nombre: string
  precio: number
  precioOriginal?: number
  duracion: string
  categoria: string
  descuento?: number
}

export interface Profesional {
  id: string
  nombre: string
  avatar: string
  especialidad: string
  detalle?: string
  /** IDs de servicios que realiza este profesional */
  serviciosIds: string[]
}

// Fotos del personal en public/personal/ — serviciosIds referencian a servicios[].id
export const profesionales: Profesional[] = [
  { id: '1', nombre: 'Valentina', avatar: '/personal/valentina.png', especialidad: 'Manos y pies', detalle: 'Uñas esculpidas, semi permanente, polygel y podoestética.', serviciosIds: ['1', '2', '3', '4', '5', '6'] },
  { id: '2', nombre: 'Valeria', avatar: '/personal/valeria.png', especialidad: 'Peluquería', detalle: 'Corte, color, mechas y tratamientos capilares.', serviciosIds: ['9', '10', '11', '12'] },
  { id: '3', nombre: 'Jessica', avatar: '/personal/jessica.png', especialidad: 'Manos y pies', detalle: 'Esmaltado semi, esculpidas y nail art.', serviciosIds: ['1', '2', '3', '5', '6'] },
  { id: '4', nombre: 'Camila', avatar: '/personal/camila.png', especialidad: 'Facial', detalle: 'Limpieza facial, hidratación y tratamientos personalizados.', serviciosIds: ['7', '8'] },
  { id: '5', nombre: 'Florencia', avatar: '/personal/florencia.png', especialidad: 'Peluquería y color', detalle: 'Corte, coloración, balayage y cuidado del cabello.', serviciosIds: ['9', '10', '11', '12'] },
]

export const categorias = [
  'Belleza de manos y pies',
  'Facial',
  'Servicios de peluquería',
]

export const servicios: Servicio[] = [
  { id: '1', nombre: 'Polygel', precio: 26880, precioOriginal: 30000, duracion: '1h', categoria: 'Belleza de manos y pies', descuento: 20 },
  { id: '2', nombre: 'Semi manos', precio: 24000, precioOriginal: 30000, duracion: '45 min', categoria: 'Belleza de manos y pies', descuento: 20 },
  { id: '3', nombre: 'Semi pies', precio: 24000, precioOriginal: 30000, duracion: '1h', categoria: 'Belleza de manos y pies', descuento: 20 },
  { id: '4', nombre: 'Podoestética', precio: 32000, precioOriginal: 40000, duracion: '1h 10 min', categoria: 'Belleza de manos y pies', descuento: 20 },
  { id: '5', nombre: 'Esculpidas/softgel', precio: 32000, precioOriginal: 40000, duracion: '1h 15 min', categoria: 'Belleza de manos y pies', descuento: 20 },
  { id: '6', nombre: 'Pedicura semi tradicional', precio: 22000, duracion: '1h', categoria: 'Belleza de manos y pies' },
  { id: '7', nombre: 'Limpieza facial', precio: 18000, duracion: '45 min', categoria: 'Facial' },
  { id: '8', nombre: 'Hydrafacial', precio: 45000, duracion: '1h', categoria: 'Facial' },
  { id: '9', nombre: 'Corte mujer', precio: 15000, duracion: '45 min', categoria: 'Servicios de peluquería' },
  { id: '10', nombre: 'Corte hombre', precio: 12000, duracion: '30 min', categoria: 'Servicios de peluquería' },
  { id: '11', nombre: 'Color completo', precio: 35000, duracion: '2h', categoria: 'Servicios de peluquería' },
  { id: '12', nombre: 'Mechas', precio: 42000, duracion: '2h 30 min', categoria: 'Servicios de peluquería' },
]
