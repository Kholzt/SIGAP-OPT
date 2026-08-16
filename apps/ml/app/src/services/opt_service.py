from __future__ import annotations

from typing import Any, Dict, List, Optional, Tuple

from sqlalchemy import text


class OptService:
    """Service untuk mengambil data OPT dari tabel histori_serangan."""

    TABLE_NAME = "histori_serangan"

    def __init__(self, db: Any):
        self.db = db

    def _build_query(
        self,
        bulan: Optional[int] = None,
        tahun: Optional[int] = None,
        kecamatan_id: Optional[int] = None,
        opt_id: Optional[int] = None,
        musim_tanaman: Optional[str] = None,
        include_relations: bool = True,
        limit: Optional[int] = None,
        offset: int = 0,
    ):
        if include_relations:
            query = """
                SELECT
                    hs.id,
                    hs.bulan,
                    hs.tahun,
                    hs.kecamatan_id,
                    hs.opt_id,
                    hs.jumlah_serangan,
                    hs.musim_tanaman,
                    hs.luas_puso,
                    hs.created_at,
                    hs.updated_at,
                    k.nama_kecamatan,
                    o.nama_opt
                FROM histori_serangan hs
                LEFT JOIN kecamatan k ON hs.kecamatan_id = k.id
                LEFT JOIN opt o ON hs.opt_id = o.id
            """
            prefix = "hs."
        else:
            query = """
                SELECT
                    id,
                    bulan,
                    tahun,
                    kecamatan_id,
                    opt_id,
                    jumlah_serangan,
                    musim_tanaman,
                    luas_puso,
                    created_at,
                    updated_at
                FROM histori_serangan
            """
            prefix = ""

        where_clauses = []
        params: Dict[str, Any] = {}

        if bulan is not None:
            where_clauses.append(f"{prefix}bulan = :bulan")
            params["bulan"] = bulan

        if tahun is not None:
            where_clauses.append(f"{prefix}tahun = :tahun")
            params["tahun"] = tahun

        if kecamatan_id is not None:
            where_clauses.append(f"{prefix}kecamatan_id = :kecamatan_id")
            params["kecamatan_id"] = kecamatan_id

        if opt_id is not None:
            where_clauses.append(f"{prefix}opt_id = :opt_id")
            params["opt_id"] = opt_id

        if musim_tanaman:
            where_clauses.append(f"{prefix}musim_tanaman = :musim_tanaman")
            params["musim_tanaman"] = musim_tanaman

        if where_clauses:
            query += " WHERE " + " AND ".join(where_clauses)

        query += f"""
            ORDER BY {prefix}tahun DESC, {prefix}bulan DESC, {prefix}created_at DESC
        """

        if limit is not None:
            query += """
                LIMIT :limit OFFSET :offset
            """
            params["limit"] = limit
            params["offset"] = offset

        return query, params

    def get_histori_serangan(
        self,
        bulan: Optional[int] = None,
        tahun: Optional[int] = None,
        kecamatan_id: Optional[int] = None,
        opt_id: Optional[int] = None,
        musim_tanaman: Optional[str] = None,
        include_relations: bool = True,
        limit: Optional[int] = None,
        offset: int = 0,
    ) -> List[Dict[str, Any]]:
        if self.db is None:
            raise ValueError("Database connection/session is required.")

        query, params = self._build_query(
            bulan=bulan,
            tahun=tahun,
            kecamatan_id=kecamatan_id,
            opt_id=opt_id,
            musim_tanaman=musim_tanaman,
            include_relations=include_relations,
            limit=limit,
            offset=offset,
        )

        result = self.db.execute(text(query), params)
        rows = result.fetchall()

        data = []
        for row in rows:
            item = {
                "id": row[0],
                "bulan": row[1],
                "tahun": row[2],
                "kecamatan_id": row[3],
                "opt_id": row[4],
                "jumlah_serangan": row[5],
                "musim_tanaman": row[6],
                "luas_puso": row[7],
                "created_at": row[8],
                "updated_at": row[9],
            }
            if include_relations and len(row) >= 12:
                item["nama_kecamatan"] = row[10]
                item["nama_opt"] = row[11]
            data.append(item)

        return data

    def get_by_opt_id(self, opt_id: int) -> List[Dict[str, Any]]:
        return self.get_histori_serangan(opt_id=opt_id)

    def get_by_kecamatan(self, kecamatan_id: int) -> List[Dict[str, Any]]:
        return self.get_histori_serangan(kecamatan_id=kecamatan_id)

    def count_histori_serangan(
        self,
        bulan: Optional[int] = None,
        tahun: Optional[int] = None,
        kecamatan_id: Optional[int] = None,
        opt_id: Optional[int] = None,
        musim_tanaman: Optional[str] = None,
    ) -> int:
        query = "SELECT COUNT(*) FROM histori_serangan"
        where_clauses = []
        params: Dict[str, Any] = {}

        if bulan is not None:
            where_clauses.append("bulan = :bulan")
            params["bulan"] = bulan

        if tahun is not None:
            where_clauses.append("tahun = :tahun")
            params["tahun"] = tahun

        if kecamatan_id is not None:
            where_clauses.append("kecamatan_id = :kecamatan_id")
            params["kecamatan_id"] = kecamatan_id

        if opt_id is not None:
            where_clauses.append("opt_id = :opt_id")
            params["opt_id"] = opt_id

        if musim_tanaman:
            where_clauses.append("musim_tanaman = :musim_tanaman")
            params["musim_tanaman"] = musim_tanaman

        if where_clauses:
            query += " WHERE " + " AND ".join(where_clauses)

        result = self.db.execute(text(query), params)
        row = result.fetchone()
        return int(row[0]) if row else 0

    def get_kecamatan_list(self) -> List[Dict[str, Any]]:
        """Mengambil seluruh data master kecamatan."""
        result = self.db.execute(text("SELECT id, nama_kecamatan FROM kecamatan ORDER BY nama_kecamatan ASC"))
        return [{"id": row[0], "nama_kecamatan": row[1]} for row in result.fetchall()]

    def get_opt_list(self) -> List[Dict[str, Any]]:
        """Mengambil seluruh data master OPT."""
        result = self.db.execute(text("SELECT id, nama_opt FROM opt ORDER BY nama_opt ASC"))
        return [{"id": row[0], "nama_opt": row[1]} for row in result.fetchall()]

    def get_year_range(self) -> Tuple[Optional[int], Optional[int]]:
        """Mengambil tahun minimal dan maksimal dari histori serangan."""
        result = self.db.execute(text("SELECT MIN(tahun), MAX(tahun) FROM histori_serangan"))
        row = result.fetchone()
        return (row[0], row[1]) if row else (None, None)

    def get_distinct_musim_tanaman(self) -> List[str]:
        """Mengambil daftar distinct musim tanaman."""
        result = self.db.execute(
            text("SELECT DISTINCT musim_tanaman FROM histori_serangan WHERE musim_tanaman IS NOT NULL ORDER BY musim_tanaman ASC")
        )
        return [row[0] for row in result.fetchall() if row[0]]