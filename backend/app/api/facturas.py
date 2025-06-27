from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_facturas():
    return {"message": "Lista de facturas - pendiente de implementar"}

@router.post("/")
async def create_factura():
    return {"message": "Crear factura - pendiente de implementar"}

@router.get("/{factura_id}")
async def get_factura(factura_id: int):
    return {"message": f"Factura {factura_id} - pendiente de implementar"}

@router.put("/{factura_id}")
async def update_factura(factura_id: int):
    return {"message": f"Actualizar factura {factura_id} - pendiente de implementar"}

@router.delete("/{factura_id}")
async def delete_factura(factura_id: int):
    return {"message": f"Eliminar factura {factura_id} - pendiente de implementar"}