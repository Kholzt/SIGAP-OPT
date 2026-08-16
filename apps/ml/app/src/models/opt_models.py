from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import BigInteger, Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.config.db import Base


class Kecamatan(Base):
    """Model untuk tabel kecamatan."""

    __tablename__ = "kecamatan"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nama_kecamatan = Column(String(30), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)

    histori_serangan = relationship("HistoriSerangan", back_populates="kecamatan")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nama_kecamatan": self.nama_kecamatan,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class Opt(Base):
    """Model untuk tabel opt (Organisme Pengganggu Tanaman)."""

    __tablename__ = "opt"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nama_opt = Column(String(30), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)

    histori_serangan = relationship("HistoriSerangan", back_populates="opt")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nama_opt": self.nama_opt,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class HistoriSerangan(Base):
    """Model untuk tabel histori_serangan."""

    __tablename__ = "histori_serangan"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    bulan = Column(Integer, nullable=False)
    tahun = Column(Integer, nullable=False)
    kecamatan_id = Column(BigInteger, ForeignKey("kecamatan.id"), nullable=False)
    opt_id = Column(BigInteger, ForeignKey("opt.id"), nullable=False)
    jumlah_serangan = Column(Float, nullable=False, default=0.0)
    musim_tanaman = Column(String(255), nullable=True)
    luas_puso = Column(Float, nullable=True, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)

    kecamatan = relationship("Kecamatan", back_populates="histori_serangan")
    opt = relationship("Opt", back_populates="histori_serangan")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "bulan": self.bulan,
            "tahun": self.tahun,
            "kecamatan_id": self.kecamatan_id,
            "opt_id": self.opt_id,
            "jumlah_serangan": self.jumlah_serangan,
            "musim_tanaman": self.musim_tanaman,
            "luas_puso": self.luas_puso,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class StatusEndemis(Base):
    """Model untuk tabel status_endemis."""

    __tablename__ = "status_endemis"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    opt_id = Column(BigInteger, ForeignKey("opt.id"), nullable=False)
    kecamatan_id = Column(BigInteger, ForeignKey("kecamatan.id"), nullable=False)
    musim_tanaman = Column(String(10), nullable=False)
    status = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "opt_id": self.opt_id,
            "kecamatan_id": self.kecamatan_id,
            "musim_tanaman": self.musim_tanaman,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class ModelMetadata(Base):
    """Model untuk tabel model_metadata (menyimpan histori training & metrik model)."""

    __tablename__ = "model_metadata"

    id = Column(Integer, primary_key=True, autoincrement=True)
    algorithm = Column(String(100), nullable=False, default="Random Forest Regressor")
    version = Column(String(50), nullable=False, default="1.0.0")
    training_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    mae = Column(Float, nullable=True)
    rmse = Column(Float, nullable=True)
    r2 = Column(Float, nullable=True)
    model_path = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=True)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "algorithm": self.algorithm,
            "version": self.version,
            "training_date": self.training_date.isoformat() if self.training_date else None,
            "mae": self.mae,
            "rmse": self.rmse,
            "r2": self.r2,
            "model_path": self.model_path,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
