# AGENTS.md

# SIGAP-OPT Development Guide

## Project Overview

SIGAP-OPT adalah aplikasi Geographic Information System (GIS) berbasis web untuk memprediksi luas serangan Organisme Pengganggu Tanaman (OPT) pada tanaman padi menggunakan Random Forest serta melakukan pemetaan status endemis.

Tujuan utama proyek adalah menghasilkan kode yang bersih, mudah dipelihara, konsisten, scalable, dan mengikuti praktik terbaik Laravel dan React.

---

# Tech Stack

## Backend

- Laravel 12
- PHP 8.4+
- MySQL

## Frontend

- React 19
- Inertia.js
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- Lucide React

## Machine Learning

- Python
- FastAPI
- Scikit-Learn
- Random Forest

## GIS

- Leaflet

---

# Development Principles

Semua kode harus mengikuti prinsip berikut.

- SOLID Principle
- Clean Code
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple)
- Separation of Concerns
- Single Responsibility Principle
- Reusable Components
- Consistent Code Style
- Readability over Cleverness

Selalu utamakan maintainability dibanding membuat kode yang terlalu kompleks.

---

# Laravel Architecture

Gunakan arsitektur berikut.

Route

↓

Controller

↓

Service

↓

Model

↓

Database

Controller tidak boleh berisi business logic.

Controller hanya bertugas:

- menerima request
- memanggil service
- mengembalikan response
- redirect
- return Inertia
- return JSON

Semua business logic harus berada di Service.

---

# Service Layer

Semua proses berikut harus menggunakan Service.

- Login
- Logout
- Authentication
- CRUD
- Dashboard
- Upload File
- Export
- Import
- Prediction
- GIS
- Endemic Status
- Report
- Statistik

Controller tidak boleh langsung memanggil Model.

SALAH

User::create(...)

BENAR

UserService::create(...)

---

# Validation

Semua validasi menggunakan Form Request.

Jangan melakukan:

$request->validate(...)

di Controller.

Gunakan:

LoginRequest

StoreUserRequest

UpdateUserRequest

dan Form Request lainnya.

---

# Database Rules

- Gunakan Eloquent ORM.
- Hindari Raw SQL kecuali benar-benar diperlukan.
- Gunakan Migration.
- Gunakan Seeder.
- Gunakan Factory untuk testing.
- Gunakan Transaction pada proses yang mempengaruhi lebih dari satu tabel.

---

# React Architecture

Gunakan struktur berikut.

Pages

↓

Components

↓

Hooks

↓

Services

↓

API

Komponen hanya bertugas menampilkan UI.

Business logic tidak boleh berada di Component.

---

# React Folder Structure

resources/js/

pages/

components/

layouts/

hooks/

services/

validations/

utils/

constants/

types/

---

# React Component Rules

Gunakan:

- Functional Component
- Custom Hooks
- React Hook Form
- Zod Validation

Komponen harus kecil dan reusable.

Jika komponen melebihi sekitar 300 baris, pertimbangkan untuk memecahnya menjadi beberapa komponen yang lebih spesifik.

---

# UI Consistency

Seluruh halaman HARUS memiliki tampilan yang konsisten.

Pastikan selalu menggunakan:

- warna utama yang sama
- ukuran font yang sama
- border radius yang sama
- padding yang sama
- margin yang sama
- shadow yang sama
- icon style yang sama
- button style yang sama
- modal style yang sama
- input style yang sama
- table style yang sama
- card style yang sama

Jangan membuat style baru jika sudah tersedia komponen reusable.

Gunakan reusable component.

Contoh:

Button

Input

Select

Textarea

Modal

Card

Table

Badge

Loading

Pagination

Dialog

---

# Styling Rules

Gunakan Tailwind CSS.

Hindari:

- inline style
- hardcoded color
- hardcoded spacing

Gunakan utility class yang konsisten.

---

# Form Rules

Semua form WAJIB memiliki:

- validation
- loading state
- disabled submit saat loading
- error handling
- success notification
- failed notification
- reset form bila diperlukan

Submit button harus menampilkan loading spinner.

Contoh:

Save

↓

Saving...

Button tidak boleh dapat diklik dua kali saat proses submit.

---

# Toast Notification

Gunakan toast notification untuk:

- Success
- Error
- Warning
- Info

Jangan menggunakan alert().

---

# Error Handling

Semua request harus memiliki:

try-catch

Error harus memiliki pesan yang jelas.

Jangan mengembalikan Exception mentah ke frontend.

---

# API Rules

Semua request API harus melalui:

resources/js/services

Jangan memanggil axios langsung di Component.

SALAH

axios.get(...)

BENAR

UserService.getUsers()

---

# Authentication

Semua proses login menggunakan:

AuthService

Controller hanya:

Request

↓

AuthService

↓

Response

---

# Naming Convention

Controller

UserController

PredictionController

DashboardController

Service

UserService

PredictionService

AuthService

DashboardService

GISService

Component

UserTable.jsx

PredictionForm.jsx

DashboardCard.jsx

Hook

useUsers()

usePrediction()

Request

StoreUserRequest

UpdateUserRequest

---

# Prediction Rules

Semua prediksi dilakukan melalui PredictionService.

Model Random Forest dipanggil melalui API Python.

Jangan menghitung prediksi di React.

Semua preprocessing dilakukan di backend.

React hanya menerima hasil prediksi.

---

# Endemic Status Rules

Status endemis dihitung berdasarkan data historis.

Gunakan indikator:

- RT
- RP
- RRP
- Frekuensi

Jangan menggunakan data prediksi untuk menghitung status endemis.

Perhitungan dilakukan di EndemicStatusService.

---

# GIS Rules

Semua koordinat berasal dari database.

Peta menggunakan Leaflet.

React hanya menampilkan data yang dikirim backend.

Jangan melakukan perhitungan spasial di frontend.

---

# Dashboard Rules

Dashboard hanya menerima data yang telah diproses oleh DashboardService.

Seluruh statistik dihitung di backend.

---

# Security

Gunakan:

- CSRF Protection
- Authorization
- Policy
- Middleware
- Form Request Validation

Jangan mempercayai input frontend.

---

# Performance

Gunakan:

- eager loading
- pagination
- lazy loading bila diperlukan
- caching jika memungkinkan

Hindari query N+1.

---

# Code Quality

Selalu prioritaskan:

- keterbacaan
- maintainability
- scalability

Daripada membuat kode yang terlalu singkat tetapi sulit dipahami.

---

# Reusability

Jika kode digunakan lebih dari satu kali,

Refactor menjadi:

- Component
- Hook
- Service
- Helper

Hindari duplikasi kode.

---

# Documentation

Setiap function harus memiliki nama yang jelas.

Gunakan komentar hanya bila logika cukup kompleks.

Jangan memberi komentar untuk kode yang sudah jelas.

---

# Git Convention

Gunakan format commit berikut.

feat:

fix:

refactor:

style:

docs:

test:

chore:

---

# Things To Avoid

Jangan:

- Business Logic di Controller
- Business Logic di React Component
- Query Database di Controller
- Axios langsung di Component
- Inline CSS
- Hardcoded Color
- Hardcoded URL
- Hardcoded Configuration
- Duplicate Code
- Nested Component yang terlalu dalam
- Function yang terlalu panjang
- Class yang terlalu besar
- Magic Number
- Magic String

---

# AI Coding Instructions

Saat menghasilkan kode:

- Selalu ikuti struktur folder proyek.
- Jangan mengubah arsitektur tanpa diminta.
- Gunakan Service untuk seluruh business logic.
- Gunakan Form Request untuk validasi.
- Gunakan Clean Code.
- Gunakan SOLID.
- Gunakan reusable component.
- Gunakan custom hook bila diperlukan.
- Gunakan loading pada seluruh proses submit.
- Gunakan toast notification.
- Tambahkan error handling yang baik.
- Selalu tulis kode yang konsisten dengan file lain.
- Pertahankan style UI yang seragam di seluruh aplikasi.
- Prioritaskan maintainability dibanding menulis kode yang rumit.
- Jangan membuat dependency baru kecuali benar-benar diperlukan.
- Selalu pertimbangkan performa dan keamanan saat menulis kode.
