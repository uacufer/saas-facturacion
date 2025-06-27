from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_productos():
    return {"message": "Lista de productos - pendiente de implementar"}

@router.post("/")
async def create_producto():
    return {"message": "Crear producto - pendiente de implementar"}

@router.get("/{producto_id}")
async def get_producto(producto_id: int):
    return {"message": f"Producto {producto_id} - pendiente de implementar"}

@router.put("/{producto_id}")
async def update_producto(producto_id: int):
    return {"message": f"Actualizar producto {producto_id} - pendiente de implementar"}

@router.delete("/{producto_id}")
async def delete_producto(producto_id: int):
    return {"message": f"Eliminar producto {producto_id} - pendiente de implementar"}