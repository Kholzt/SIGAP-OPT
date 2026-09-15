---
trigger: always_on
---

# Playwright Testing Guidelines

Dokumen ini berisi konteks mengenai environment E2E testing yang digunakan di repository ini agar asisten AI selalu memahami setup dan arsitektur yang berjalan pada setiap sesi.

## Arsitektur Aplikasi
- **Backend:** Laravel
- **Frontend:** React.js menggunakan Inertia.js (Berada di `apps/web/resources/js`)
- **Testing Tool:** Playwright
- **Direktori Testing:** `apps/auto-testing`

## Struktur Pengujian (Playwright)
Playwright dikonfigurasi terpisah dari project web utama dan berlokasi di direktori `apps/auto-testing`.
- **Config:** `apps/auto-testing/playwright.config.ts` (Secara default `baseURL` merujuk ke port dimana frontend / aplikasi Laravel berjalan, misal: `http://localhost:8000`).
- **Tests Directory:** `apps/auto-testing/tests/`

## Strategi Pembuatan Skenario Pengujian (CRUD)
Aplikasi menggunakan UI berbasis Inertia.js, sehingga pembuatan tes harus berfokus pada interaksi realistis pengguna.

### 1. Penggunaan Stable Locators
Setiap test case harus diprioritaskan menggunakan locator berikut agar tes stabil meskipun ada perubahan pada styling atau class CSS (seperti Tailwind classes):
- `getByRole` (contoh: `getByRole('button', { name: 'Simpan' })`)
- `getByLabel` (contoh: `getByLabel('Email')`)
- `getByPlaceholder` (contoh: `getByPlaceholder('Contoh: Kecamatan Banjarmasin Selatan')`)
- `getByText`

### 2. Skenario Autentikasi (`auth.spec.ts`)
- URL form login: `/login`
- Field Form: Label `Email` dan `Password`
- Submit: Tombol berlabel `Log in`
- Validasi berhasil: Mengecek redirect ke halaman Dashboard.

### 3. Skenario Master Data / CRUD (Contoh: `kecamatan.spec.ts`)
Semua operasi CRUD (Create, Read, Update, Delete) biasanya diproteksi oleh Autentikasi.
- **Setup Tes:** Selalu gunakan `test.beforeEach` untuk melakukan rutinitas login (mengisi form login) sebelum masuk ke endpoint master data seperti `/kecamatan`.
- **Create:** Buka modal dengan menekan tombol (contoh: `Tambah Kecamatan`), isi form dengan `getByPlaceholder`, klik `Simpan`, dan validasi flash message success (`getByText`) serta kehadiran baris data di tabel.
- **Update:** Buat data sementara terlebih dahulu, cari menggunakan row filter `locator('tr').filter({ hasText: '...' })`, klik tombol `Edit`, lakukan update, lalu simpan dan validasi perubahannya di tabel.
- **Delete:** Buat data sementara, cari berdasarkan row filter, klik tombol `Hapus`, lakukan konfirmasi dialog pada modal `Ya, Hapus`, dan pastikan baris data tidak lagi terlihat (`not.toBeVisible()`).

Gunakan pola pembuatan data sementara (*on-the-fly*) ini di dalam masing-masing skenario agar setiap test case berdiri sendiri (Independent) dan menghindari error akibat bentroknya data yang tersisa di database.

Selalu simpan history dalam context ini
