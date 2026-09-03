# WONG MIT - ARCHITECTURE

Versi : 2.0
Status : ACTIVE
Last Update : September 2026

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

# MAINTENANCE MODE GATE

Sprint 4D. Global gate untuk `mode_maintenance` (Sheet `Pengaturan`).

Alur:

- Sumber kebenaran: server-side. Helper `isMaintenanceMode()` (`Sistem.js`) membaca Sheet fresh (fail-open); gate berada di `Auth.js`: `checkLogin()`, `checkSession()`, `checkRole()` — Admin-only bypass.
- Bootstrap tanpa session: probe `getMaintenanceStatus()` (endpoint publik additive) sebelum menampilkan login — ON → Maintenance Page penuh; OFF/gagal → alur login existing 100% normal.
- Session/resume non-Admin saat ON: `checkSession()` → `false` → probe → Maintenance Page.
- Active tab: RPC ditolak `checkRole()` dengan pesan khusus; failure handler navigasi mengarahkan ke Maintenance Page.
- Maintenance Page (frontend `index.html`) murni presentasi; otoritas tetap server-side.
- `getAppInfo()` tidak memuat `modeMaintenance`; `doGet()` tidak berubah.
- Maintenance OFF = perilaku existing 100% normal.

---

# IDENTITY & BRANDING ARCHITECTURE

Identitas aplikasi dan identitas sekolah merupakan dua boundary yang berbeda dan tidak boleh dicampurkan.

## IDENTITAS APLIKASI

Identitas aplikasi berlaku pada level deployment/platform.

Data utama:

* `nama_aplikasi`
* `logo_aplikasi`
* `favicon`
* `versi_aplikasi`

Pemilik kontrak baca:
`getAppInfo()`

Identity aplikasi harus dapat diakses sebelum login apabila diperlukan oleh halaman login.

## IDENTITAS SEKOLAH

Identitas sekolah merupakan konfigurasi sekolah pada deployment tersebut.

Data utama:

* `nama_sekolah`
* `kepala_sekolah`
* `logo_sekolah`

Pemilik kontrak baca:
`getSchoolIdentity(sessionId)`

Identitas sekolah digunakan setelah autentikasi.

## ATURAN PEMISAHAN

* Nama sekolah tidak boleh menjadi bagian permanen dari metadata aplikasi.
* Nama aplikasi tidak boleh dianggap sebagai nama sekolah.
* `logo_aplikasi` dan `favicon` adalah identitas aplikasi.
* `logo_sekolah` adalah identitas sekolah.
* Kontrak lama yang masih membawa field lintas-boundary tidak boleh dihapus mendadak apabila masih digunakan; migrasi dilakukan bertahap dan backward compatible.

## GITHUB PAGES WRAPPER & FAVICON PRODUCTION

Production WONG MIT berjalan dengan arsitektur wrapper:

root `index.html` (GitHub Pages)

↓

iframe Apps Script `/exec`

↓

sandbox Apps Script (googleusercontent)

↓

`getAppInfo()`

↓

`faviconUrl` (derived File ID via resolver)

↓

postMessage ke `window.top`

↓

listener root wrapper

↓

`<link rel="icon">`

↓

tab browser production

Fakta arsitektur:

* Root `index.html` (GitHub Pages) dan `apps-script/index.html` (HTML Service) adalah dua dokumen berbeda; iframe dan wrapper tidak berbagi origin.
* Favicon tab browser production berasal dari root wrapper (dokumen top-level), bukan dari dokumen iframe.
* Karena lintas-origin, pengiriman favicon dilakukan dengan `postMessage` (type `wongmit-favicon`) dari iframe Apps Script ke `window.top`, dengan validasi ketat di wrapper (URL HTTPS hostname `drive.google.com` saja).
* Fallback favicon statis pada root wrapper tetap tersedia dan dipakai bila tidak ada payload valid.
* Saat `/exec` Apps Script dibuka langsung, tab top-level adalah bootstrap Google Apps Script, sehingga favicon tab tetap favicon bawaan Google Apps Script — batasan platform, bukan kustomisasi yang mungkin dari kode aplikasi.
* Sheet `Pengaturan` tetap menyimpan File ID favicon sebagai sumber konfigurasi; derived URL hanya bergerak saat runtime.

## MODEL DEPLOYMENT

Arsitektur yang ditargetkan adalah:

1 deployment WONG MIT
+
1 Spreadsheet sekolah

untuk setiap sekolah.

Dengan model ini data sekolah tetap terisolasi pada deployment/database masing-masing tanpa memerlukan tenant column pada database existing.

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