# WONG MIT - ARCHITECTURE

Versi : 2.0
Status : ACTIVE
Last Update : Agustus 2026

---

# TUJUAN

Dokumen ini menjelaskan arsitektur resmi aplikasi WONG MIT.

Seluruh perubahan struktur project harus mengikuti dokumen ini.

Perubahan besar pada arsitektur hanya boleh dilakukan setelah melalui proses audit dan persetujuan pengguna.

---

# ARSITEKTUR UMUM

WONG MIT menggunakan arsitektur:

Google Apps Script (Backend)

↓

HTML Service

↓

Single Page Application (SPA)

↓

Google Spreadsheet (Database)

---

# STRUKTUR WONG MIT - update 2026-08-24

apps-script/
├── Code.js
├── Absensi.js
├── GuruMengajar.js
├── Mapel.js
├── Siswa.js
├── Guru.js
├── Kelas.js
├── Dashboard.js
├── Pengaturan.js
├── Rekap.js
├── index.html
├── js_absensi.html
├── js_gurumengajar.html
├── js_mapel.html
├── js_siswa.html
├── js_guru.html
├── js_kelas.html
├── js_dashboard.html
├── js_pengaturan.html
└── js_rekap.html

- `index.html` berfungsi sebagai shell/orchestrator, sedangkan logic domain ditempatkan pada partial frontend masing-masing.
- Modul Rekap menggunakan boundary backend `Rekap.js` dan frontend `js_rekap.html`.
- Shared utilities tetap berada pada boundary shared dan tidak diduplikasi ke modul domain.
- Export engine bersama tetap terpisah dari boundary domain Rekap.

---

# BACKEND

Seluruh backend berada pada project Google Apps Script.

Backend bertanggung jawab terhadap:

- Login
- Session
- Validasi
- Membaca Spreadsheet
- Menulis Spreadsheet
- Rekapitulasi
- Export
- Utility

Backend tidak bertugas mengatur tampilan.

---

# FRONTEND

Frontend menggunakan:

HTML

CSS

Bootstrap 5

JavaScript Vanilla

Tidak menggunakan framework seperti React, Vue, Angular, dan sejenisnya.

---

# POLA SPA

Aplikasi menggunakan konsep Single Page Application.

Flow:

Login

↓

Dashboard

↓

Sidebar

↓

Klik Menu

↓

loadPage()

↓

HTML dimuat secara dinamis

↓

JavaScript halaman dijalankan

Halaman tidak melakukan reload penuh.

---

# PEMISAHAN TUGAS

Backend

- Mengolah data
- Membaca Spreadsheet
- Menulis Spreadsheet
- Validasi

Frontend

- Menampilkan UI
- Mengelola event
- Render data
- Loading
- Empty State
- UX

Prinsip:

Business Logic berada di Backend.

Presentation Logic berada di Frontend.

---

# DATABASE

Database utama adalah Google Spreadsheet.

Spreadsheet menjadi satu-satunya sumber data (Single Source of Truth).

Frontend tidak boleh menyimpan data permanen.

---

# ENGINE

Satu fitur hanya memiliki satu engine utama.

Contoh:

Rekap Absensi

↓

getRekap()

Bukan:

getRekapGuru()

getRekapUmum()

getRekapWali()

Prinsip ini diterapkan untuk mengurangi duplikasi.

---

# REUSABLE

Setiap utility harus dapat digunakan kembali.

Apabila sudah ada fungsi yang memiliki tujuan sama:

Gunakan fungsi tersebut.

Jangan membuat fungsi baru dengan logika yang sama.

---

# CSS

CSS menggunakan pendekatan scoped.

Setiap halaman memiliki namespace sendiri.

Contoh:

rekap-

pengaturan-

dashboard-

guru-

kelas-

siswa-

absensi-

Tidak diperbolehkan membuat CSS global tanpa alasan yang kuat.

---

# HTML

Struktur HTML setiap halaman mengikuti pola berikut:

SECTION HEADER

↓

SECTION FILTER

↓

SECTION ACTION

↓

SECTION SUMMARY

↓

SECTION DATA

↓

SECTION LOADING

↓

SECTION EMPTY STATE

↓

SECTION MODAL (jika diperlukan)

Urutan dibuat konsisten agar mudah dipelihara.

---

# JAVASCRIPT

Prinsip utama:

- Hindari duplikasi
- Hindari magic number
- Hindari inline style yang berlebihan
- Hindari query selector berulang
- Gunakan event yang sudah ada apabila memungkinkan

---

# RESPONSIVE

Semua halaman wajib mendukung:

Desktop

Tablet

Mobile

Prioritas desain:

Desktop terlebih dahulu.

Kemudian disempurnakan untuk Mobile.

---

# GLOBAL COMPONENT

Beberapa komponen dirancang menjadi standar seluruh aplikasi.

Contoh:

Loading

Empty State

Summary Card

Konfirmasi

Toast / Notifikasi

Komponen tersebut harus memiliki tampilan yang konsisten.

---

# GLOBAL LOADER

Roadmap aplikasi akan memiliki satu Global Loader resmi WONG MIT.

Halaman Rekap menjadi pondasi visual pertama.

Implementasi global dilakukan setelah desain dinyatakan stabil.

---

# PENGEMBANGAN

Setiap perubahan dilakukan melalui Sprint.

Flow:

Audit

↓

Implementasi

↓

Review

↓

Testing Desktop

↓

Testing Mobile

↓

LOLOS

↓

Baru lanjut Sprint berikutnya.

---

# LARANGAN

Jangan mengubah:

- Struktur SPA
- Routing
- Flow aplikasi
- Struktur database
- ID penting
- Event penting

tanpa persetujuan pengguna.

---

# TUJUAN AKHIR

Arsitektur WONG MIT harus:

✓ Stabil

✓ Mudah dipelihara

✓ Mudah dikembangkan

✓ Minim duplikasi

✓ Konsisten

✓ Siap digunakan dalam jangka panjang.