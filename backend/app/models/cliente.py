from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    nombre = Column(String(200), nullable=False)
    email = Column(String(255), nullable=True)
    telefono = Column(String(20), nullable=True)
    direccion = Column(Text, nullable=True)
    ciudad = Column(String(100), nullable=True)
    codigo_postal = Column(String(10), nullable=True)
    pais = Column(String(50), nullable=True, default="España")
    nif_cif = Column(String(20), nullable=True)
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    facturas = relationship("Factura", back_populates="cliente")

    __table_args__ = (
        Index('idx_cliente_user_id', 'user_id'),
        Index('idx_cliente_user_email', 'user_id', 'email'),
    )