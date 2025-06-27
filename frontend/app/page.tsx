import { SignIn, SignUp, UserButton, useUser } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function HomePage() {
  const user = await currentUser()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              FacturSaaS
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sistema de facturación para tu negocio
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <Link href="/sign-in" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4">
                Iniciar Sesión
              </Link>
              <Link href="/sign-up" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">FacturSaaS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/clientes" className="text-gray-700 hover:text-gray-900">
                Clientes
              </Link>
              <Link href="/productos" className="text-gray-700 hover:text-gray-900">
                Productos
              </Link>
              <Link href="/facturas" className="text-gray-700 hover:text-gray-900">
                Facturas
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Bienvenido, {user.firstName}!
              </h2>
              <p className="text-gray-600 mb-6">
                Tu sistema de facturación está listo para usar
              </p>
              <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Ir al Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}