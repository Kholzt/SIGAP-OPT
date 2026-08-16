from __future__ import annotations

from typing import Any, Dict, List, Optional

from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.config.db import get_db, test_db_connection
from app.src.services.opt_service import OptService

app = FastAPI(
    title="SIGAP-TANI Forecasting Backend API",
    description="Backend API dan Machine Learning Forecasting Luas Serangan OPT menggunakan Random Forest",
    version="1.0.0",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health"])
def root():
    """Root endpoint untuk memeriksa status API."""
    return {
        "status": "online",
        "app": "SIGAP-TANI Backend API",
        "version": "1.0.0",
        "database_connected": test_db_connection(),
    }


@app.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint untuk monitoring."""
    try:
        db_ok = test_db_connection()
        return {"status": "healthy" if db_ok else "degraded", "database": db_ok}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database connection error: {str(e)}",
        )


@app.get("/api/histori", tags=["Histori OPT"])
def get_histori(
    bulan: Optional[int] = Query(None, ge=1, le=12, description="Filter bulan (1-12)"),
    tahun: Optional[int] = Query(None, ge=2000, description="Filter tahun"),
    kecamatan_id: Optional[int] = Query(None, description="Filter ID Kecamatan"),
    opt_id: Optional[int] = Query(None, description="Filter ID OPT"),
    musim_tanaman: Optional[str] = Query(None, description="Filter musim tanaman (contoh: '24/25')"),
    include_relations: bool = Query(True, description="Sertakan nama kecamatan dan nama OPT"),
    limit: int = Query(50, ge=1, le=1000, description="Jumlah record maksimal"),
    offset: int = Query(0, ge=0, description="Offset data"),
    db: Session = Depends(get_db),
):
    """Mengambil daftar histori serangan OPT dengan filter dinamis."""
    service = OptService(db)
    data = service.get_histori_serangan(
        bulan=bulan,
        tahun=tahun,
        kecamatan_id=kecamatan_id,
        opt_id=opt_id,
        musim_tanaman=musim_tanaman,
        include_relations=include_relations,
        limit=limit,
        offset=offset,
    )
    total = service.count_histori_serangan(
        bulan=bulan,
        tahun=tahun,
        kecamatan_id=kecamatan_id,
        opt_id=opt_id,
        musim_tanaman=musim_tanaman,
    )
    return {
        "success": True,
        "total": total,
        "count": len(data),
        "limit": limit,
        "offset": offset,
        "data": data,
    }


@app.get("/api/master/kecamatan", tags=["Master Data"])
def get_kecamatan(db: Session = Depends(get_db)):
    """Mengambil daftar seluruh kecamatan."""
    service = OptService(db)
    return {"success": True, "data": service.get_kecamatan_list()}


@app.get("/api/master/opt", tags=["Master Data"])
def get_opt(db: Session = Depends(get_db)):
    """Mengambil daftar seluruh jenis OPT."""
    service = OptService(db)
    return {"success": True, "data": service.get_opt_list()}


@app.get("/api/master/summary", tags=["Master Data"])
def get_summary(db: Session = Depends(get_db)):
    """Mengambil ringkasan data ketersediaan (tahun, musim, total record)."""
    service = OptService(db)
    min_yr, max_yr = service.get_year_range()
    return {
        "success": True,
        "total_records": service.count_histori_serangan(),
        "year_range": {"min_year": min_yr, "max_year": max_yr},
        "musim_tanaman_list": service.get_distinct_musim_tanaman(),
        "total_kecamatan": len(service.get_kecamatan_list()),
        "total_opt": len(service.get_opt_list()),
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main.py:app", host="127.0.0.1", port=8000, reload=True)
