# Plan de Implementación - FacturSaaS MVP

## [✓] Fase 1: Infraestructura Base (COMPLETADA)

### 1. [✓] Configurar Docker Compose
- [✓] PostgreSQL con volumen persistente
- [✓] Backend FastAPI con Dockerfile.dev
- [✓] Frontend Next.js (OBLIGATORIO en Docker con Dockerfile.dev)
- [✓] Usar `npm install` en lugar de `npm ci` para desarrollo

### 2. [✓] Estructura Backend FastAPI con Autenticación Clerk
- [✓] Crear estructura de carpetas (app/, models/, api/, db/, middleware/)
- [✓] Configurar FastAPI básico con CORS
- [✓] Integrar Clerk para autenticación (middleware preparado)
- [✓] Configurar SQLAlchemy y conexión a PostgreSQL
- [✓] Crear modelos base con `user_id` vinculado a Clerk

### 3. [✓] Configurar Frontend Next.js con Clerk
- [✓] Instalar @clerk/nextjs
- [✓] Configurar ClerkProvider en layout
- [✓] Proteger rutas con middleware
- [✓] Configurar Axios/Fetch para llamadas API con auth headers
- [✓] Layout base con navegación y componente de usuario

---

## [✓] Fase 2: Funcionalidades Core con Autenticación

### 1. [✓] CRUD de Clientes (Protegido por Usuario) - COMPLETADO
- [✓] **API endpoints en Backend:**
  - [✓] GET /api/clientes - Solo clientes del usuario autenticado
  - [✓] POST /api/clientes - Asignar automáticamente `user_id`
  - [✓] PUT /api/clientes/{id} - Verificar que el cliente pertenece al usuario
  - [✓] DELETE /api/clientes/{id} - Verificar pertenencia
  - [✓] GET /api/clientes/{id} - Obtener cliente específico con verificación
- [✓] **Schemas Pydantic para validación:**
  - [✓] ClienteBase, ClienteCreate, ClienteUpdate, ClienteResponse
  - [✓] Validación de email con EmailStr
  - [✓] Campos opcionales y requeridos correctamente definidos
- [✓] **Interfaz en Frontend:**
  - [✓] Lista filtrada por usuario actual con `useAuth()`
  - [✓] Formulario de creación con validación
  - [✓] Tabla responsiva con estados activo/inactivo
  - [✓] Funcionalidad de eliminación con confirmación
  - [✓] Manejo de errores y estados de carga
  - [✓] API client TypeScript con tipos definidos

**Archivos implementados:**
- `backend/app/schemas/cliente.py` - Schemas Pydantic
- `backend/app/api/clientes.py` - Endpoints CRUD protegidos
- `frontend/lib/clientes.ts` - API client con tipos TypeScript
- `frontend/app/clientes/page.tsx` - Interfaz completa con autenticación

**Correcciones realizadas:**
- [✓] Agregado `pydantic[email]` para validación de emails
- [✓] Corregido middleware para permitir `/favicon.ico`
- [✓] Actualizado `next.config.js` removiendo `appDir` deprecado
- [✓] Agregado `/sign-in` y `/sign-up` a rutas públicas de Clerk

### 2. [✓] CRUD de Productos/Servicios (Protegido por Usuario) - COMPLETADO
- [✓] **API endpoints con validación de pertenencia**
  - [✓] GET /api/productos - Solo productos del usuario autenticado
  - [✓] POST /api/productos - Asignar automáticamente `user_id`
  - [✓] PUT /api/productos/{id} - Verificar que el producto pertenece al usuario
  - [✓] DELETE /api/productos/{id} - Verificar pertenencia
  - [✓] GET /api/productos/{id} - Obtener producto específico con verificación
- [✓] **Schemas Pydantic para validación:**
  - [✓] ProductoBase, ProductoCreate, ProductoUpdate, ProductoResponse
  - [✓] Validación de precio con Decimal y gt=0
  - [✓] Validación de tipo_iva con pattern regex (0|4|10|21)
  - [✓] Campos opcionales y requeridos correctamente definidos
- [✓] **Interfaz con datos del usuario actual**
  - [✓] Lista filtrada por usuario actual con `useAuth()`
  - [✓] Formulario de creación con validación
  - [✓] Tabla responsiva con información completa
  - [✓] Funcionalidad de eliminación con confirmación
  - [✓] Manejo de errores y estados de carga
  - [✓] API client TypeScript con tipos definidos
- [✓] **Gestión de tipos de IVA**
  - [✓] Select con opciones: 0% (Exento), 4% (Superreducido), 10% (Reducido), 21% (General)
  - [✓] Validación en backend y frontend
  - [✓] Visualización del porcentaje en la tabla

**Archivos implementados:**
- `backend/app/schemas/producto.py` - Schemas Pydantic con validaciones
- `backend/app/api/productos.py` - Endpoints CRUD protegidos por usuario
- `frontend/lib/productos.ts` - API client con tipos TypeScript
- `frontend/app/productos/page.tsx` - Interfaz completa con autenticación y formulario

**Correcciones realizadas:**
- [✓] Actualizadas validaciones Pydantic v2 (regex → pattern, decimal_places removido)
- [✓] Backend tested e imports funcionando correctamente

**✅ COMPLETADO - Configuración de Base de Datos:**
- [✓] **Problema identificado:** Las tablas no existían en PostgreSQL
- [✓] **Solución:** Configurar migraciones con Alembic
- [✓] Inicializar Alembic en `/backend/` con `alembic init alembic`
- [✓] Configurar `alembic.ini` con DATABASE_URL de PostgreSQL
- [✓] Configurar `alembic/env.py` para importar modelos automáticamente
- [✓] Crear migración inicial para `clientes`, `productos`, `facturas` y `lineas_factura`
- [✓] Ejecutar migraciones con `alembic upgrade head` - tablas creadas correctamente
- [✓] Probar inserción de datos - base de datos funcionando perfectamente

**Archivos de migración creados:**
- `backend/alembic.ini` - Configuración de migraciones
- `backend/alembic/env.py` - Script de entorno configurado
- `backend/alembic/versions/56a081a46bbd_initial_migration_clientes_and_.py` - Migración inicial

**Tablas creadas en PostgreSQL:**
- `clientes` - Con índices por user_id y email
- `productos` - Con índices por user_id y código  
- `facturas` - Con índices por user_id, cliente_id y número
- `lineas_factura` - Con índice por factura_id
- `alembic_version` - Control de versiones de migraciones

---

## 🧾 Fase 3: Sistema de Facturación Multi-tenant

### 1. Crear Factura con Seguridad
- [ ] **Validar que cliente y productos pertenecen al usuario**
- [ ] Formulario con selección de SUS clientes
- [ ] Añadir líneas de SUS productos
- [ ] Cálculo automático de totales e IVA
- [ ] Numeración automática de facturas por usuario

### 2. Lista y Vista de Facturas
- [ ] **Filtrado automático por `user_id`**
- [ ] Estados: borrador, enviada, pagada
- [ ] Vista detallada con verificación de pertenencia
- [ ] Búsqueda y filtros avanzados

---

## 🚀 Fase 4: Mejoras con Contexto de Usuario

### 1. Generación de PDF
- [ ] Plantilla personalizable por usuario
- [ ] Logo de empresa del usuario
- [ ] Envío por email

### 2. Dashboard con métricas por usuario
- [ ] Facturas del mes
- [ ] Clientes activos
- [ ] Productos más vendidos
- [ ] Gráficos de evolución

### 3. Configuración de perfil empresarial
- [ ] Datos fiscales de la empresa
- [ ] Logo y personalización
- [ ] Configuración de numeración de facturas

---

## 🔐 Arquitectura de Seguridad Clerk + CRUD

### Frontend (Next.js):
- ClerkProvider envuelve la app
- Middleware protege rutas privadas
- useUser() para datos del usuario
- Headers con Bearer token en API calls

### Backend (FastAPI):
- Middleware verifica JWT de Clerk
- Extrae `userId` del token
- Todos los modelos incluyen `user_id`
- Queries filtradas por `user_id`
- Validación de pertenencia en updates/deletes

### Base de Datos:
- Índices en columnas `user_id`
- Foreign keys para integridad
- Sin datos de usuarios (gestionados por Clerk)

---

## 📝 Notas de Implementación

- **Multi-tenancy**: Cada recurso está aislado por `user_id`
- **Seguridad**: Doble verificación (JWT + pertenencia de recursos)
- **Escalabilidad**: Preparado para múltiples usuarios desde el inicio
- **Mantenibilidad**: Separación clara entre autenticación (Clerk) y autorización (app)