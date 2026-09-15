# Design System & Styling Guide

Dokumen ini mendeskripsikan panduan desain (UI/UX) dan *design tokens* yang digunakan pada `apps/web` (SIGAP-TANI). Panduan ini memastikan konsistensi visual di seluruh aplikasi.

## 1. Typography
- **Primary Font:** `Poppins`
- **Fallback Fonts:** `ui-sans-serif, system-ui, sans-serif`
*(Didefinisikan secara global pada `body` dan `--font-sans` di dalam `app.css`)*

## 2. Color Palette
Aplikasi ini menggunakan Tailwind CSS default palette yang dikonfigurasi ulang, dengan fokus utama pada warna `Indigo` sebagai warna **Primary** dan `Slate` untuk netral/teks.

### Primary Colors (Indigo)
- `--color-primary-50`: `#eef2ff` (Soft background)
- `--color-primary-100`: `#e0e7ff` (Hover background muda)
- `--color-primary-400`: `#818cf8` (Focus rings)
- `--color-primary-500`: `#6366f1` (Warna utama / Main actions / Default Buttons)
- `--color-primary-600`: `#4f46e5` (Hover states untuk Main actions)

### Neutral / Grayscale (Slate)
- `slate-50` - `slate-100`: Background untuk halaman admin, baris tabel selang-seling, dan tombol *Cancel*.
- `slate-400` - `slate-500`: Teks sekunder, deskripsi pendukung, placeholder, dan ikon.
- `slate-800` - `slate-900`: Teks utama, judul (*headings*).

### Semantic Colors
- **Danger/Error:** `rose-500` (untuk tombol hapus, ikon peringatan), `rose-600` (teks error validasi), dan `rose-50` (background notifikasi error).
- **Success:** (Menggunakan warna default hijau dari Alert component).

## 3. Spacing & Border Radius
Desain aplikasi ini condong pada tampilan modern yang lembut (soft UI / glassmorphism tipis) dengan sudut yang membulat (rounded).

- **Radius MD (`rounded-md`):** `0.5rem` (8px) - Elemen kecil, dropdown, atau checkbox.
- **Radius LG (`rounded-lg`):** `0.75rem` (12px) - Field pencarian, *action buttons* kecil pada tabel.
- **Radius XL (`rounded-xl`):** `1rem` (16px) - Tombol utama (Simpan/Batal), field form input utama.
- **Radius 2XL (`rounded-2xl`):** `1.5rem` (24px) - Card container, kontainer Modal dialog, dan Panel utama.

## 4. Komponen & Styling Pattern

### Buttons (Tombol)
- **Primary Button:** `bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl px-4 py-2.5 transition shadow-sm`
- **Secondary / Cancel Button:** `bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl px-4 py-2 transition`
- **Danger Button:** `bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl px-5 py-2 transition`
- **Action Button (Table):** Menggunakan warna transparan yang *subtle*. Contoh Edit: `text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg`.

### Form Inputs
- **Base Style:** `border border-slate-200 rounded-xl px-4 py-2.5 text-sm w-full transition`
- **Focus State:** `focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent`
- **Error State:** `border-rose-400 bg-rose-50`

### Cards & Tables
- **Container:** `bg-white rounded-2xl border border-slate-200 shadow-xs`
- **Table Head:** `bg-slate-50 text-slate-500 uppercase text-xs tracking-wider`
- **Table Row:** `hover:bg-slate-50 transition`

### Modals / Overlays
- **Backdrop:** `bg-slate-900/40 backdrop-blur-sm` (Memberikan efek blur estetik di belakang modal).
- **Dialog Box:** `bg-white rounded-2xl shadow-2xl p-6`

## 5. Implementasi & Dependencies
- Menggunakan Tailwind CSS v4 (seperti yang terlihat pada `@theme` syntax di `app.css`).
- Ikon menggunakan `lucide-react` (konsisten dengan ketebalan outline stroke modern).
