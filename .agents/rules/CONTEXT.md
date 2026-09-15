---
trigger: always_on
---

# Project Context & Session Log

Dokumen ini melacak riwayat konteks pekerjaan, fitur yang telah diimplementasikan, serta keputusan teknis (Architecture/Design) yang telah diambil sepanjang proses *development*. Tujuannya agar setiap agen AI atau *developer* baru yang masuk ke sesi dapat langsung memahami keadaan (*state*) terkini dari proyek.

## 🛠 Tech Stack & Environment
- **Backend:** Laravel 10/11
- **Frontend:** React + Inertia.js (Tailwind CSS v4)
- **E2E Testing:** Playwright (berada di folder terpisah: `apps/auto-testing`)
- **Desain & UI:** Tersimpan di `docs/DESIGN.md` (Menggunakan desain *Soft UI*, font Poppins, dan palet warna kustom Indigo/Slate).

---

## 📅 Log Aktivitas & Konteks Saat Ini

### [2026-08-28] - Implementasi Auth, Standarisasi UI & Navbar Admin
**Konteks Pekerjaan:**
Fokus pada integrasi *Authentication* yang lengkap dan konsisten dengan panduan desain (`DESIGN.md`), serta peningkatan *User Experience* di halaman *Admin*.

**Pekerjaan yang Telah Diselesaikan:**
1. **Penerapan *Auth Middleware*:** 
   - Memastikan semua rute yang berkaitan dengan Dashboard dan CRUD Master Data telah diproteksi dengan *middleware* `auth` di `routes/web.php`.
2. **Kesesuaian *Design System* (UI):** 
   - Melakukan refaktor komponen dasar (`PrimaryButton`, `SecondaryButton`, `DangerButton`, `TextInput`, dan `GuestLayout`) agar membulat (`rounded-xl` / `rounded-2xl`) dan menggunakan warna yang didefinisikan (Slate & Primary).
3. **Pengaturan Halaman Profil (`Profile/Edit.jsx`):** 
   - Bermigrasi dari `AuthenticatedLayout` bawaan Breeze ke `AdminLayout` agar konsisten dengan halaman admin lainnya.
   - Mengubah *styling* formulir pembaruan data, *password*, dan hapus akun agar menyesuaikan dengan standar warna aplikasi.
4. **Pembaruan Navigasi Admin (`AdminLayout.jsx`):** 
   - Menambahkan komponen *Dropdown* pada sudut kanan atas (Header Navbar) agar nama profil (`user.name`) dapat diklik untuk memunculkan menu **Profil** dan **Keluar**.
5. **Pembuatan `DESIGN.md`:** 
   - Mengekstraksi *design tokens* (ukuran font, radius, palet warna, dan properti bayangan) sebagai panduan *styling* frontend ke depannya.
6. **E2E Testing Setup (Playwright):** 
   - Inisiasi awal berada di folder `apps/auto-testing` dengan `playwright.config.ts` menargetkan `localhost:8000` (saat ini menggunakan `npm run dev` & `php artisan serve`).

**Aturan Keputusan Teknis (Rules Applied):**
- Menggunakan mode `/ponytail` (YAGNI / *Laziest Path*): Sebisa mungkin memodifikasi *scaffolding* bawaan Laravel Breeze tanpa menambahkan logika atau pustaka *React/PHP* eksternal secara berlebihan.
- Tidak menulis komponen *dropdown* dari nol, melainkan menggunakan kembali (`reuse`) `Dropdown.jsx` milik Breeze.

---

*(Catatan: Harap selalu perbarui dokumen ini jika ada penyelesaian modul besar, perubahan arsitektur, atau dependensi baru yang signifikan).*
