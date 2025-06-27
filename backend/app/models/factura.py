from sqlalchemy import Column, Integer, String, DateTime, Text, Numeric, Boolean, ForeignKey, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Factura(Base):
    __tablename__ = "facturas"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    numero = Column(String(50), nullable=False)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=False)
    fecha_emision = Column(DateTime(timezone=True), server_default=func.now())
    fecha_vencimiento = Column(DateTime(timezone=True), nullable=True)
    subtotal = Column(Numeric(10, 2), nullable=False, default=0)
    iva_total = Column(Numeric(10, 2), nullable=False, default=0)
    total = Column(Numeric(10, 2), nullable=False, default=0)
    estado = Column(String(20), nullable=False, default="borrador")
    notas = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    cliente = relationship("Cliente", back_populates="facturas")
    lineas = relationship("LineaFactura", back_populates="factura", cascade="all, delete-orphan")

    __table_args__ = (
        Index('idx_factura_user_id', 'user_id'),
        Index('idx_factura_user_numero', 'user_id', 'numero'),
        Index('idx_factura_user_cliente', 'user_id', 'cliente_id'),
    )


class LineaFactura(Base):
    __tablename__ = "lineas_factura"

    id = Column(Integer, primary_key=True, index=True)
    factura_id = Column(Integer, ForeignKey("facturas.id"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos.id"), nullable=True)
    descripcion = Column(String(200), nullable=False)
    cantidad = Column(Numeric(10, 2), nullable=False, default=1)
    precio_unitario = Column(Numeric(10, 2), nullable=False)
    tipo_iva = Column(String(10), nullable=False, default="21")
    subtotal = Column(Numeric(10, 2), nullable=False)
    iva = Column(Numeric(10, 2), nullable=False)
    total = Column(Numeric(10, 2), nullable=False)

    factura = relationship("Factura", back_populates="lineas")
    producto = relationship("Producto")

    __table_args__ = (
        Index('idx_linea_factura_id', 'factura_id'),
    )