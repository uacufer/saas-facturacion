from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ClienteBase(BaseModel):
    nombre: str
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None
    direccion: Optional[str] = None
    ciudad: Optional[str] = None
    codigo_postal: Optional[str] = None
    pais: Optional[str] = "España"
    nif_cif: Optional[str] = None
    activo: bool = True

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(BaseModel):
    nombre: Optional[str] = None
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None
    direccion: Optional[str] = None
    ciudad: Optional[str] = None
    codigo_postal: Optional[str] = None
    pais: Optional[str] = None
    nif_cif: Optional[str] = None
    activo: Optional[bool] = None

class ClienteResponse(ClienteBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True