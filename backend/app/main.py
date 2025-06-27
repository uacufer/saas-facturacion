from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.middleware.clerk_auth import ClerkAuthMiddleware
from app.api import clientes, productos, facturas

app = FastAPI(
    title="FacturSaaS API",
    description="Sistema de facturación SaaS con autenticación Clerk",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(ClerkAuthMiddleware)

@app.get("/")
async def root():
    return {"message": "FacturSaaS API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

app.include_router(clientes.router, prefix="/api/clientes", tags=["clientes"])
app.include_router(productos.router, prefix="/api/productos", tags=["productos"])
app.include_router(facturas.router, prefix="/api/facturas", tags=["facturas"])