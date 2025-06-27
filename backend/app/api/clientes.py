from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_clientes():
    return {"message": "Lista de clientes - pendiente de implementar"}

@router.post("/")
async def create_cliente():
    return {"message": "Crear cliente - pendiente de implementar"}

@router.get("/{cliente_id}")
async def get_cliente(cliente_id: int):
    return {"message": f"Cliente {cliente_id} - pendiente de implementar"}

@router.put("/{cliente_id}")
async def update_cliente(cliente_id: int):
    return {"message": f"Actualizar cliente {cliente_id} - pendiente de implementar"}

@router.delete("/{cliente_id}")
async def delete_cliente(cliente_id: int):
    return {"message": f"Eliminar cliente {cliente_id} - pendiente de implementar"}