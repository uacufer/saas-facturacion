import Layout from '@/components/Layout'

export default function FacturasPage() {
  return (
    <Layout title="Facturas">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Lista de Facturas
            </h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Nueva Factura
            </button>
          </div>
          <div className="text-center py-12">
            <div className="text-gray-500">
              <p className="text-lg mb-2">No hay facturas creadas</p>
              <p className="text-sm">Comienza creando tu primera factura</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}