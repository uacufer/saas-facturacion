from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from decimal import Decimal

class ProductoBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=200)
    descripcion: Optional[str] = None
    precio: Decimal = Field(..., gt=0)
    tipo_iva: str = Field(default="21", pattern="^(0|4|10|21)$")
    codigo: Optional[str] = Field(None, max_length=50)
    unidad: Optional[str] = Field(default="ud", max_length=20)
    activo: bool = True

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=1, max_length=200)
    descripcion: Optional[str] = None
    precio: Optional[Decimal] = Field(None, gt=0)
    tipo_iva: Optional[str] = Field(None, pattern="^(0|4|10|21)$")
    codigo: Optional[str] = Field(None, max_length=50)
    unidad: Optional[str] = Field(None, max_length=20)
    activo: Optional[bool] = None

class ProductoResponse(ProductoBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True