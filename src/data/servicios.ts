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
}

export const profesionales: Profesional[] = [
  { id: '1', nombre: 'Valentina', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina' },
  { id: '2', nombre: 'Valeria', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valeria' },
  { id: '3', nombre: 'Jessica', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica' },
  { id: '4', nombre: 'Camila', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Camila' },
  { id: '5', nombre: 'Florencia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Florencia' },
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
