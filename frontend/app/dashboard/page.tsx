import { currentUser } from '@clerk/nextjs/server'
import Layout from '@/components/Layout'

export default async function DashboardPage() {
  const user = await currentUser()

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">C</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Clientes Activos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">P</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Productos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">F</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Facturas Este Mes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">€</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Ingresos Este Mes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    €0.00
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            ¡Bienvenido, {user?.firstName}!
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Tu sistema de facturación está listo. Comienza por:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <h4 className="font-medium text-gray-900 mb-2">1. Añadir Clientes</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Gestiona tu cartera de clientes
                </p>
                <a href="/clientes" className="text-blue-600 text-sm font-medium hover:text-blue-500">
                  Ir a Clientes →
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <h4 className="font-medium text-gray-900 mb-2">2. Crear Productos</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Define tus productos y servicios
                </p>
                <a href="/productos" className="text-blue-600 text-sm font-medium hover:text-blue-500">
                  Ir a Productos →
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <h4 className="font-medium text-gray-900 mb-2">3. Generar Facturas</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Crea y envía tus facturas
                </p>
                <a href="/facturas" className="text-blue-600 text-sm font-medium hover:text-blue-500">
                  Ir a Facturas →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}