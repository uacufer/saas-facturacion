import { clientApiCall } from './api'

export interface Cliente {
  id: number
  user_id: string
  nombre: string
  email?: string
  telefono?: string
  direccion?: string
  ciudad?: string
  codigo_postal?: string
  pais?: string
  nif_cif?: string
  activo: boolean
  created_at: string
  updated_at?: string
}

export interface ClienteCreate {
  nombre: string
  email?: string
  telefono?: string
  direccion?: string
  ciudad?: string
  codigo_postal?: string
  pais?: string
  nif_cif?: string
  activo?: boolean
}

export interface ClienteUpdate {
  nombre?: string
  email?: string
  telefono?: string
  direccion?: string
  ciudad?: string
  codigo_postal?: string
  pais?: string
  nif_cif?: string
  activo?: boolean
}

export const clientesApi = {
  async getClientes(token: string): Promise<Cliente[]> {
    const response = await clientApiCall(token, {
      method: 'GET',
      url: '/api/clientes',
    })
    return response.data
  },

  async createCliente(token: string, cliente: ClienteCreate): Promise<Cliente> {
    const response = await clientApiCall(token, {
      method: 'POST',
      url: '/api/clientes',
      data: cliente,
    })
    return response.data
  },

  async updateCliente(token: string, id: number, cliente: ClienteUpdate): Promise<Cliente> {
    const response = await clientApiCall(token, {
      method: 'PUT',
      url: `/api/clientes/${id}`,
      data: cliente,
    })
    return response.data
  },

  async deleteCliente(token: string, id: number): Promise<void> {
    await clientApiCall(token, {
      method: 'DELETE',
      url: `/api/clientes/${id}`,
    })
  },

  async getCliente(token: string, id: number): Promise<Cliente> {
    const response = await clientApiCall(token, {
      method: 'GET',
      url: `/api/clientes/${id}`,
    })
    return response.data
  },
}