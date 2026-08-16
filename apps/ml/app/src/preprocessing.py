from __future__ import annotations

from typing import Generator, List, Optional, Tuple, Union

import numpy as np
import pandas as pd


class OptDataPreprocessor:
    """Modul Preprocessing dan Feature Engineering untuk Dataset Serangan OPT

    sesuai dengan spesifikasi PRD (FR-02, FR-03, FR-04, FR-05).
    """

    def __init__(self, target_column: str = "jumlah_serangan"):
        self.target_column = target_column

    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """FR-02: Data Cleaning

        - Menghapus duplikat
        - Menangani missing values
        - Validasi tipe data numerik
        - Menghapus nilai negatif tidak valid
        - Mengurutkan data secara kronologis
        """
        if df.empty:
            return df

        cleaned = df.copy()

        # 1. Hapus duplikat
        cleaned = cleaned.drop_duplicates()

        # 2. Validasi tipe data
        cleaned["tahun"] = pd.to_numeric(cleaned["tahun"], errors="coerce").fillna(0).astype(int)
        cleaned["bulan"] = pd.to_numeric(cleaned["bulan"], errors="coerce").fillna(0).astype(int)
        cleaned["kecamatan_id"] = pd.to_numeric(cleaned["kecamatan_id"], errors="coerce").fillna(0).astype(int)
        cleaned["opt_id"] = pd.to_numeric(cleaned["opt_id"], errors="coerce").fillna(0).astype(int)

        if self.target_column in cleaned.columns:
            cleaned[self.target_column] = (
                pd.to_numeric(cleaned[self.target_column], errors="coerce").fillna(0.0).clip(lower=0.0)
            )

        if "luas_puso" in cleaned.columns:
            cleaned["luas_puso"] = pd.to_numeric(cleaned["luas_puso"], errors="coerce").fillna(0.0).clip(lower=0.0)

        # 3. Filter data yang memiliki tahun dan bulan valid
        cleaned = cleaned[(cleaned["tahun"] > 0) & (cleaned["bulan"] >= 1) & (cleaned["bulan"] <= 12)]

        # 4. Urutkan secara kronologis
        cleaned = cleaned.sort_values(by=["tahun", "bulan", "kecamatan_id", "opt_id"]).reset_index(drop=True)

        return cleaned

    def create_features(
        self,
        df: pd.DataFrame,
        lags: Tuple[int, ...] = (1, 2, 3, 6),
        windows: Tuple[int, ...] = (3, 6),
    ) -> pd.DataFrame:
        """FR-04: Feature Engineering

        - Time Features: bulan (sin/cos encoding), tahun
        - Lag Features: Lag-1, Lag-2, Lag-3, Lag-6 per (kecamatan_id, opt_id)
        - Rolling Features: Rolling Mean 3, Rolling Mean 6
        - Growth Rate: Laju pertumbuhan serangan
        """
        if df.empty:
            return df

        feat_df = self.clean_data(df)

        # 1. Cyclical Time Features (Sin/Cos untuk bulan)
        feat_df["sin_bulan"] = np.sin(2 * np.pi * feat_df["bulan"] / 12.0)
        feat_df["cos_bulan"] = np.cos(2 * np.pi * feat_df["bulan"] / 12.0)

        # Grouping per kecamatan dan opt untuk lag & rolling features
        grouped = feat_df.groupby(["kecamatan_id", "opt_id"])

        # 2. Lag Features
        for lag in lags:
            feat_df[f"lag_{lag}"] = grouped[self.target_column].shift(lag)

        # 3. Rolling Features (Mean)
        for w in windows:
            # Menggunakan closed='left' agar tidak bocor (data leakage) nilai bulan saat ini
            feat_df[f"rolling_mean_{w}"] = (
                grouped[self.target_column]
                .transform(lambda s: s.shift(1).rolling(window=w, min_periods=1).mean())
            )

        # 4. Statistical Feature: Growth Rate / Difference (Lag-1 diff)
        feat_df["diff_lag1_lag2"] = feat_df["lag_1"] - feat_df["lag_2"]

        return feat_df

    def time_series_split_by_year(
        self,
        df: pd.DataFrame,
        test_year: int,
    ) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """FR-05: Time Series Split

        Membagi data training (tahun < test_year) dan testing (tahun == test_year)
        tanpa shuffle untuk menghindari data leakage.
        """
        train = df[df["tahun"] < test_year].copy()
        test = df[df["tahun"] == test_year].copy()
        return train, test


def prepare_opt_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """Fungsi pembantu untuk memproses dataset mentah menjadi dataset berfitur."""
    preprocessor = OptDataPreprocessor()
    return preprocessor.create_features(df)
