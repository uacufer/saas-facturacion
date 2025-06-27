import Layout from '@/components/Layout'

export default function ClientesPage() {
  return (
    <Layout title="Clientes">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Lista de Clientes
            </h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Nuevo Cliente
            </button>
          </div>
          <div className="text-center py-12">
            <div className="text-gray-500">
              <p className="text-lg mb-2">No hay clientes registrados</p>
              <p className="text-sm">Comienza añadiendo tu primer cliente</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}