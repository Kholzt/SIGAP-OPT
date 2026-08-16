# Product Requirements Document (PRD)

# Sistem Forecasting Luas Serangan OPT Menggunakan Random Forest

**Version:** 1.0  
**Status:** Draft  
**Project Type:** Machine Learning Forecasting Platform  
**Metode:** Random Forest Regressor  
**Forecast Horizon:** 1 sampai 6 bulan ke depan (Recursive Forecasting)

## 1. Latar Belakang

Dinas Pertanian membutuhkan sistem yang mampu memprediksi luas serangan Organisme Pengganggu Tanaman (OPT) berdasarkan data historis sehingga tindakan pengendalian dapat dilakukan lebih awal.

Sistem menggunakan algoritma **Random Forest Regressor** untuk melakukan forecasting luas serangan OPT setiap bulan. Prediksi dilakukan secara **recursive**, yaitu model memprediksi satu bulan ke depan dan hasil prediksi tersebut digunakan kembali sebagai input untuk memprediksi bulan berikutnya hingga mencapai enam bulan.

## 2. Tujuan

- Melakukan preprocessing data otomatis dari database.
- Melatih model Random Forest.
- Melakukan evaluasi model.
- Melakukan forecasting hingga enam bulan.
- Menyimpan model dan hasil prediksi.
- Menyediakan REST API untuk aplikasi Laravel/GIS.

## 3. Scope

### In Scope

- Koneksi database
- Data preprocessing
- Feature engineering
- Time Series Split
- Training Random Forest
- Evaluasi model
- Recursive forecasting
- Penyimpanan model
- Penyimpanan hasil prediksi
- REST API

### Out of Scope

- LSTM
- XGBoost
- AutoML
- Online Learning
- Hyperparameter tuning otomatis

## 4. Arsitektur Sistem

```text
Database
    │
    ▼
Load Dataset
    │
    ▼
Data Cleaning
    │
    ▼
Data Transformation
    │
    ▼
Feature Engineering
    │
    ▼
Time Series Split
    │
    ▼
Training Random Forest
    │
    ▼
Model Evaluation
    │
    ▼
Save Model
    │
    ▼
Recursive Forecasting (1 → 6 Bulan)
    │
    ▼
Save Prediction
    │
    ▼
REST API
```

## 5. Functional Requirements

### FR-01 Load Dataset

Mengambil data historis langsung dari database.

### FR-02 Data Cleaning

- Menghapus data duplikat
- Menangani missing value
- Validasi tipe data
- Menghapus nilai tidak valid
- Mengurutkan data berdasarkan waktu

### FR-03 Data Transformation

- Konversi tanggal
- Konversi numerik
- Encoding data kategori
- Pembentukan indeks waktu

### FR-04 Feature Engineering

#### Time Features
- Tahun
- Bulan

#### Lag Features
- Lag-1
- Lag-2
- Lag-3
- Lag-6

#### Rolling Features
- Rolling Mean 3
- Rolling Mean 6

#### Statistical Features
- Moving Average
- Growth Rate

#### Category Features
- Kecamatan
- Desa
- Jenis OPT

### FR-05 Dataset Splitting

Menggunakan **Time Series Split**.

Contoh:

```text
Fold 1
Train : 2018 2019 2020
Test  : 2021

Fold 2
Train : 2018 2019 2020 2021
Test  : 2022
```

Tidak dilakukan shuffle untuk menghindari data leakage.

### FR-06 Training Model

Menggunakan **Random Forest Regressor**.

Parameter dasar:

- n_estimators
- max_depth
- min_samples_split
- min_samples_leaf
- random_state

### FR-07 Evaluasi

Menggunakan:

- MAE
- RMSE
- R²

### FR-08 Penyimpanan Model

Model disimpan menggunakan Joblib (`random_forest.joblib`).

### FR-09 Recursive Forecasting

Model melakukan prediksi satu bulan, kemudian hasil prediksi digunakan kembali sebagai input untuk memprediksi bulan berikutnya hingga enam bulan.

### FR-10 Penyimpanan Hasil Prediksi

Contoh:

| Bulan | Prediksi |
|-------|----------:|
| Mei | 12.40 |
| Juni | 14.82 |
| Juli | 15.61 |

### FR-11 REST API

```http
POST /api/ml/train
POST /api/ml/predict
POST /api/ml/forecast
GET  /api/ml/evaluation
GET  /api/ml/history
```

## 6. Non Functional Requirements

- Training < 5 menit
- Forecast 6 bulan < 10 detik
- API Response < 2 detik
- Mendukung >100.000 data
- Logging error
- API Authentication

## 7. Database Requirement

### Histori Serangan

- id
- tanggal
- tahun
- bulan
- kecamatan
- desa
- jenis_opt
- luas_serangan
- luas_penanganan
- luas_puso

### Prediction Result

- id
- prediction_date
- forecast_month
- forecast_year
- predicted_value
- created_at

### Model Metadata

- id
- algorithm
- version
- training_date
- mae
- rmse
- r2
- model_path

## 8. Workflow Machine Learning

```text
Database
    │
Extract Data
    │
Cleaning
    │
Transformation
    │
Feature Engineering
    │
Time Series Split
    │
Training
    │
Evaluation
    │
Save Model
    │
Recursive Forecast
    │
Save Prediction
    │
REST API
```

## 9. User Flow

```text
Admin
 │
 ├── Login
 ├── Training Model
 ├── Load Data Database
 ├── Preprocessing
 ├── Training
 ├── Evaluasi
 ├── Simpan Model
 ├── Forecast 6 Bulan
 ├── Simpan Hasil
 └── Dashboard
```

## 10. Acceptance Criteria

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| AC-01 | Load Data | Data berhasil diambil dari database |
| AC-02 | Cleaning | Data bersih dari duplikat dan missing value |
| AC-03 | Transformation | Seluruh atribut berhasil ditransformasikan |
| AC-04 | Feature Engineering | Seluruh fitur terbentuk tanpa data leakage |
| AC-05 | Time Split | Dataset dibagi berdasarkan waktu |
| AC-06 | Training | Model berhasil dilatih dan disimpan |
| AC-07 | Evaluation | MAE, RMSE, dan R² berhasil dihitung |
| AC-08 | Forecast | Prediksi recursive hingga 6 bulan berhasil dilakukan |
| AC-09 | Storage | Hasil prediksi tersimpan di database |
| AC-10 | API | Seluruh endpoint berjalan sesuai spesifikasi |

## 11. Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Backend ML | Python (FastAPI) |
| Machine Learning | Scikit-learn |
| Data Processing | Pandas, NumPy |
| Database | MySQL / PostgreSQL |
| ORM | SQLAlchemy |
| Model Storage | Joblib |
| Frontend | Laravel + React (Inertia.js) |

## 12. Deliverables

1. Pipeline ekstraksi data dari database.
2. Modul preprocessing (cleaning, transformation, feature engineering).
3. Model Random Forest dengan Time Series Split.
4. Modul evaluasi (MAE, RMSE, R²).
5. Engine recursive forecasting 6 bulan.
6. Penyimpanan model dan hasil prediksi.
7. REST API.
8. Dokumentasi teknis.
