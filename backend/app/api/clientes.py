from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.cliente import Cliente
from app.schemas.cliente import ClienteCreate, ClienteUpdate, ClienteResponse

router = APIRouter()

def get_current_user_id(request: Request) -> str:
    """Extrae el user_id del estado de la request (establecido por el middleware)"""
    if not hasattr(request.state, 'user_id') or not request.state.user_id:
        raise HTTPException(status_code=401, detail="Usuario no autenticado")
    return request.state.user_id

@router.get("/", response_model=List[ClienteResponse])
async def get_clientes(
    request: Request,
    db: Session = Depends(get_db)
):
    """Obtener todos los clientes del usuario autenticado"""
    user_id = get_current_user_id(request)
    clientes = db.query(Cliente).filter(Cliente.user_id == user_id).all()
    return clientes

@router.post("/", response_model=ClienteResponse)
async def create_cliente(
    cliente_data: ClienteCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Crear un nuevo cliente asignándolo automáticamente al usuario autenticado"""
    user_id = get_current_user_id(request)
    
    db_cliente = Cliente(
        user_id=user_id,
        **cliente_data.dict()
    )
    
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    
    return db_cliente

@router.get("/{cliente_id}", response_model=ClienteResponse)
async def get_cliente(
    cliente_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    """Obtener un cliente específico verificando que pertenece al usuario"""
    user_id = get_current_user_id(request)
    
    cliente = db.query(Cliente).filter(
        Cliente.id == cliente_id,
        Cliente.user_id == user_id
    ).first()
    
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    
    return cliente

@router.put("/{cliente_id}", response_model=ClienteResponse)
async def update_cliente(
    cliente_id: int,
    cliente_data: ClienteUpdate,
    request: Request,
    db: Session = Depends(get_db)
):
    """Actualizar un cliente verificando que pertenece al usuario"""
    user_id = get_current_user_id(request)
    
    cliente = db.query(Cliente).filter(
        Cliente.id == cliente_id,
        Cliente.user_id == user_id
    ).first()
    
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    
    update_data = cliente_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(cliente, field, value)
    
    db.commit()
    db.refresh(cliente)
    
    return cliente

@router.delete("/{cliente_id}")
async def delete_cliente(
    cliente_id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    """Eliminar un cliente verificando que pertenece al usuario"""
    user_id = get_current_user_id(request)
    
    cliente = db.query(Cliente).filter(
        Cliente.id == cliente_id,
        Cliente.user_id == user_id
    ).first()
    
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    
    db.delete(cliente)
    db.commit()
    
    return {"message": "Cliente eliminado exitosamente"}