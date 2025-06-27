from sqlalchemy import Column, Integer, String, DateTime, Text, Numeric, Boolean, Index
from sqlalchemy.sql import func
from app.db.database import Base

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    nombre = Column(String(200), nullable=False)
    descripcion = Column(Text, nullable=True)
    precio = Column(Numeric(10, 2), nullable=False)
    tipo_iva = Column(String(10), nullable=False, default="21")
    codigo = Column(String(50), nullable=True)
    unidad = Column(String(20), nullable=True, default="ud")
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    __table_args__ = (
        Index('idx_producto_user_id', 'user_id'),
        Index('idx_producto_user_codigo', 'user_id', 'codigo'),
    )