'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { Cliente, ClienteCreate, clientesApi } from '@/lib/clientes'

export default function ClientesPage() {
  const { getToken, isLoaded } = useAuth()
  const { user } = useUser()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ClienteCreate>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    pais: 'España',
    nif_cif: '',
    activo: true,
  })

  useEffect(() => {
    if (isLoaded && user) {
      loadClientes()
    }
  }, [isLoaded, user])

  const loadClientes = async () => {
    try {
      setLoading(true)
      const token = await getToken()
      if (token) {
        const data = await clientesApi.getClientes(token)
        setClientes(data)
      }
    } catch (err) {
      setError('Error al cargar los clientes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = await getToken()
      if (token) {
        await clientesApi.createCliente(token, formData)
        setShowForm(false)
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          direccion: '',
          ciudad: '',
          codigo_postal: '',
          pais: 'España',
          nif_cif: '',
          activo: true,
        })
        await loadClientes()
      }
    } catch (err) {
      setError('Error al crear el cliente')
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      try {
        const token = await getToken()
        if (token) {
          await clientesApi.deleteCliente(token, id)
          await loadClientes()
        }
      } catch (err) {
        setError('Error al eliminar el cliente')
        console.error(err)
      }
    }
  }

  if (!isLoaded || loading) {
    return (
      <Layout title="Clientes">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Cargando...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Clientes">
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Lista de Clientes
            </h3>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {showForm ? 'Cancelar' : 'Nuevo Cliente'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NIF/CIF
                  </label>
                  <input
                    type="text"
                    value={formData.nif_cif}
                    onChange={(e) => setFormData({ ...formData, nif_cif: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Crear Cliente
                </button>
              </div>
            </form>
          )}

          {clientes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <p className="text-lg mb-2">No hay clientes registrados</p>
                <p className="text-sm">Comienza añadiendo tu primer cliente</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teléfono
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cliente.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cliente.email || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cliente.telefono || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            cliente.activo
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {cliente.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(cliente.id)}
                          className="text-red-600 hover:text-red-900 ml-2"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}