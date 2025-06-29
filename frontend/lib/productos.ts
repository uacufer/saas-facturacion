import { clientApiCall } from './api'

export interface Producto {
  id: number
  user_id: string
  nombre: string
  descripcion?: string
  precio: number
  tipo_iva: string
  codigo?: string
  unidad?: string
  activo: boolean
  created_at: string
  updated_at?: string
}

export interface ProductoCreate {
  nombre: string
  descripcion?: string
  precio: number
  tipo_iva?: string
  codigo?: string
  unidad?: string
  activo?: boolean
}

export interface ProductoUpdate {
  nombre?: string
  descripcion?: string
  precio?: number
  tipo_iva?: string
  codigo?: string
  unidad?: string
  activo?: boolean
}

export const productosApi = {
  async getProductos(getToken: () => Promise<string | null>): Promise<Producto[]> {
    return clientApiCall('/api/productos/', 'GET', null, getToken)
  },

  async createProducto(data: ProductoCreate, getToken: () => Promise<string | null>): Promise<Producto> {
    return clientApiCall('/api/productos/', 'POST', data, getToken)
  },

  async getProducto(id: number, getToken: () => Promise<string | null>): Promise<Producto> {
    return clientApiCall(`/api/productos/${id}`, 'GET', null, getToken)
  },

  async updateProducto(id: number, data: ProductoUpdate, getToken: () => Promise<string | null>): Promise<Producto> {
    return clientApiCall(`/api/productos/${id}`, 'PUT', data, getToken)
  },

  async deleteProducto(id: number, getToken: () => Promise<string | null>): Promise<void> {
    return clientApiCall(`/api/productos/${id}`, 'DELETE', null, getToken)
  }
}