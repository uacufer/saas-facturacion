from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.producto import Producto
from app.schemas.producto import ProductoCreate, ProductoUpdate, ProductoResponse

router = APIRouter()

def get_current_user_id(request: Request) -> str:
    """Extrae el user_id del estado de la request (establecido por el middleware)"""
    if not hasattr(request.state, 'user_id') or not request.state.user_id:
        raise HTTPException(status_code=401, detail="Usuario no autenticado")
    return request.state.user_id

@router.get("/", response_model=List[ProductoResponse])
async def get_productos(
    request: Request,
    db: Session = Depends(get_db)
):
    """Obtener todos los productos del usuario autenticado"""
    user_id = get_current_user_id(request)
    productos = db.query(Producto).filter(Producto.user_id == user_id).all()
    return productos

@router.post("/", response_model=ProductoResponse)
async def create_producto(
    producto_data: ProductoCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Crear un nuevo producto asignándolo automáticamente al usuario autenticado"""
    user_id = get_current_user_id(request)
    
    db_producto = Producto(
        user_id=user_id,
        **producto_data.dict()
    )
    
    db.add(db_producto)
    db.commit()
    db.refresh(db_producto)
    
    return db_producto

@router.get("/{producto_id}", response_model=ProductoResponse)
async def get_producto(
    producto_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    """Obtener un producto específico verificando que pertenece al usuario"""
    user_id = get_current_user_id(request)
    
    producto = db.query(Producto).filter(
        Producto.id == producto_id,
        Producto.user_id == user_id
    ).first()
    
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    return producto

@router.put("/{producto_id}", response_model=ProductoResponse)
async def update_producto(
    producto_id: int,
    producto_data: ProductoUpdate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Actualizar un producto verificando que pertenece al usuario"""
    user_id = get_current_user_id(request)
    
    producto = db.query(Producto).filter(
        Producto.id == producto_id,
        Producto.user_id == user_id
    ).first()
    
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    update_data = producto_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(producto, field, value)
    
    db.commit()
    db.refresh(producto)
    
    return producto

@router.delete("/{producto_id}")
async def delete_producto(
    producto_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    """Eliminar un producto verificando que pertenece al usuario"""
    user_id = get_current_user_id(request)
    
    producto = db.query(Producto).filter(
        Producto.id == producto_id,
        Producto.user_id == user_id
    ).first()
    
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    db.delete(producto)
    db.commit()
    
    return {"message": "Producto eliminado exitosamente"}