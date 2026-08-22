# WONG MIT - PROJECT STATUS

Versi : 2.0
Status : ACTIVE DEVELOPMENT
Last Update : Agustus 2026

---

# RINGKASAN

WONG MIT (Website ONline Guru MI Tanbihul Athfal) sedang berada pada tahap pengembangan aktif.

Fokus pengembangan saat ini adalah menyelesaikan seluruh modul inti dengan arsitektur yang stabil, konsisten, dan mudah dipelihara.

---

# STATUS MODUL

## Dashboard

Status:
SELESAI

Kondisi:

- Dashboard telah menggunakan desain modern.
- Responsive desktop dan mobile.
- Menampilkan informasi utama aplikasi.
- Menambahkan shortcut "Mulai Absensi" dari Dashboard menuju halaman Absensi (`page_absensi`), responsif desktop dan mobile.
- Dashboard Attendance modal memiliki feedback loading (animasi tadpole), mencegah klik berulang, menampilkan hari/tanggal saat ini, dan info guru mengajar per kelas.
- Layout monitoring kehadiran lebih compact dengan truncation nama guru panjang.
- `getRelasiMengajar` tetap dipertahankan untuk kebutuhan Dashboard.
- Refactoring modularisasi Dashboard telah selesai.
- Backend Dashboard dipisahkan ke `Dashboard.js`.
- Frontend Dashboard dipisahkan ke `js_dashboard.html`.
- Endpoint dan perilaku runtime Dashboard tetap kompatibel.
- Deploy Uji dan Deploy Production setelah refactoring telah LOLOS.
- Penyempurnaan fitur Dashboard di luar refactoring masih berlanjut pada sprint terpisah.

---

## Data Siswa

Status:
SELESAI

Kondisi:

- CRUD berjalan.
- Import massal tersedia.
- Export tersedia.
- Layout modern.
- Responsive.
- Halaman Data Siswa dapat diakses oleh seluruh role (Admin, Kepala Sekolah, Wali Kelas, Guru Mapel).
- Tambah Manual, Import Massal, Edit, dan Hapus hanya untuk Admin dan Kepala Sekolah.
- Download Data Siswa Excel dan PDF tersedia untuk seluruh role (dengan filter kelas).
- Refactoring modularisasi Data Siswa telah diselesaikan sampai boundary frontend utama.
- Backend CRUD Siswa dipisahkan ke `Siswa.js`.
- Frontend logic CRUD Siswa dipisahkan ke `js_siswa.html`.
- `renderStudentsTable()` dan event listener `fileImportSiswa` telah dipindahkan ke `js_siswa.html`.
- Loader Siswa tetap menggunakan mekanisme `getPage()`.
- Fungsi export Siswa (`showModalDownloadSiswa`, `siapkanDataExportSiswa`, `downloadSiswaExcel`, `downloadSiswaPdf`) masih ditahan di struktur export lama dan bukan bagian extraction ini.
- Refactoring export lintas modul ditunda sampai struktur Absensi dan Rekap selesai diaudit.
- Endpoint, database, authorization, dan perilaku runtime CRUD Siswa tetap kompatibel.
- Deploy Uji dan Deploy Production setelah refactoring telah LOLOS.
- Refactoring export lintas modul ditunda sampai struktur modul Rekap, Absensi, dan modul terkait lainnya telah diaudit.

Masih dapat menerima penyempurnaan apabila diperlukan.

---

## Data Guru

Status:
SELESAI

Kondisi:

- CRUD berjalan.
- Responsive.
- Mengikuti desain global aplikasi.
- Refactoring modularisasi Data Guru telah selesai.
- Backend CRUD Guru berada di `Guru.js`.
- Frontend logic Guru berada di `js_guru.html`.
- `page_guru.html` tetap sebagai UI/view.
- Endpoint, authorization, dan dependency lintas modul tetap dipertahankan.
- Deploy Uji dan Production setelah refactoring telah LOLOS.
- Pengembangan fitur Data Guru berikutnya tetap diperlakukan sebagai sprint terpisah.

---

## Data Kelas

Status:
SELESAI

Kondisi:

- CRUD berjalan.
- Digunakan oleh modul lain.
- Refactoring modularisasi Data Kelas telah selesai.
- Backend CRUD Kelas berada di `Kelas.js`.
- Frontend logic Kelas berada di `js_kelas.html`.
- `page_kelas.html` tetap sebagai UI/view.
- Struktur Sheet `Kelas` tetap:
  `ID Kelas | Nama Kelas | ID Wali Kelas | Status`.
- Endpoint, authorization, cache invalidation, dan dependency lintas modul tetap dipertahankan.
- Deploy Uji dan Production setelah refactoring telah LOLOS.
- Pengembangan fitur Data Kelas berikutnya tetap diperlakukan sebagai sprint terpisah.

---

## Relasi Guru Kelas

Status:
DIHAPUS

Kondisi:

- Halaman "Relasi Guru Kelas" telah dihapus dari project karena sudah tidak digunakan.
- Relasi guru dengan kelas kini ditangani melalui modul Guru Mengajar.

---

## Guru Mengajar

Status:
SELESAI

Kondisi:

* Modul telah digunakan untuk menentukan jadwal guru mengajar.
* Panel Daftar Mata Pelajaran dan Guru Mengajar dapat collapse/expand (default CLOSED).
* Search client-side tersedia untuk tabel Mata Pelajaran (`filterMapel()`) dan Guru Mengajar (`filterGuruMengajar()`).
* UX Polish selesai: satu card utuh per panel, padding konsisten, responsive desktop/mobile.
* Refactoring modularisasi Guru Mengajar telah selesai.
* Backend Guru Mengajar dipisahkan ke `GuruMengajar.js`.
* Frontend logic Guru Mengajar dipisahkan ke `js_gurumengajar.html`.
* Loader `<?!= getPage("js_gurumengajar") ?>` ditambahkan ke `index.html`.
* `page_gurumengajar.html` tetap dipertahankan sebagai UI/view.
* Endpoint `google.script.run`, authorization, dependency shared, dan struktur database tetap dipertahankan.
* Dependency lintas modul seperti Absensi dan Rekap tetap berjalan setelah extraction.
* Fitur Import Massal Guru Mengajar tetap berjalan setelah modularisasi.
* Bug validasi preview Import Massal Guru Mengajar telah diperbaiki dengan menyesuaikan pencocokan data terhadap master Guru, Kelas, dan Mapel.
* Deploy Uji dan Deploy Production setelah modularisasi serta bugfix telah LOLOS.
* Pengembangan fitur Guru Mengajar berikutnya tetap diperlakukan sebagai sprint terpisah.

Masih memungkinkan dilakukan optimasi di masa depan.

---

## Mata Pelajaran (Mapel)

Status:
SELESAI

Kondisi:

* CRUD Mata Pelajaran berjalan.
* Import Mapel tersedia.
* Template Mapel tersedia.
* Refactoring modularisasi Mapel telah selesai.
* Backend Mapel dipisahkan ke `Mapel.js`.
* Frontend logic Mapel dipisahkan ke `js_mapel.html`.
* Loader `<?!= getPage("js_mapel") ?>` ditambahkan ke `index.html`.
* Dependency shared seperti `getMapelOptions`, `getMasterSheetData`, `checkRole`, dan cache invalidation tetap dipertahankan sesuai boundary masing-masing.
* Endpoint `google.script.run`, authorization, database, dan behavior runtime tetap kompatibel.
* Dependency Mapel terhadap Guru Mengajar tetap berjalan setelah extraction.
* Deploy Uji dan Deploy Production setelah modularisasi telah LOLOS.
* Pengembangan fitur Mapel berikutnya tetap diperlakukan sebagai sprint terpisah.

Refactoring Mapel selesai tanpa perubahan struktur database dan tanpa perubahan behavior runtime yang terdeteksi.

---

## Absensi Harian

Status:
SELESAI

Kondisi:

- Proses absensi berjalan.
- Mendukung revisi absensi.
- Menjadi sumber data utama rekap.

---

## Rekap Absensi

Status:
PRODUCTION + FROZEN
(Sprint Rekap 6 dan Sprint Rekap 7B selesai — seluruh Sprint Rekap telah selesai dan di-freeze)
Modul Rekap tidak lagi dikembangkan kecuali ditemukan bug nyata.

Modul Rekap telah selesai meliputi:
- Cleanup Legacy (penghapusan wrapper legacy dan parameter mode)
- Optimasi Performa (Map lookup, getDataRekapRaw, Set, join render)
- UX (validasi periode, empty state informatif, toast export, aria-live, petunjuk scroll mobile, animasi fade-in)

Kondisi saat ini:

- UI modern.
- Responsive desktop.
- Responsive mobile.
- Filter periode.
- Filter guru.
- Filter kelas.
- Filter mapel.
- Empty State modern.
- Loading Skeleton.
- Summary Card dinamis.
- Sticky Header tabel.
- Badge Keterangan dinamis.
- Engine Rekap berbasis filter.
- Export backend tetap kompatibel.
- Nilai semester export menggunakan single source of truth.
- Horizontal scroll mobile.
- Interactive Table dengan sorting client-side.
- Sorting Ascending dan Descending.
- Indikator sorting pada header tabel.
- Sorting tidak memanggil backend atau menghitung ulang Rekap.
- Export menggunakan snapshot `rekapTableData` dari JavaScript Memory sebagai sumber utama.
- Export mengikuti urutan tabel terakhir, termasuk hasil sorting.
- Backend menggunakan `getRekapFinal()` sebagai fallback apabila snapshot tidak tersedia atau tidak valid.
- Wrapper `getRekapUmum()`, `getRekapGuru()`, dan `getRekapWali()` telah dihapus.
- Parameter `mode` pada `getRekapFinal()` telah dihapus.
- Engine Rekap hanya menggunakan satu jalur: `getRekapFinal() → mergeDataRekap() → getDataRekap() → hitungRekap()`.
- Engine Rekap telah dioptimasi performa tanpa mengubah arsitektur maupun output.
- Duplikasi `getFilteredGuruMengajar()` telah dihilangkan.
- `mergeDataRekap()` menggunakan lookup berbasis `Map` (kompleksitas O(n+m)).
- `renderRekapTable()` menggunakan `join("")` tanpa `innerHTML +=` di dalam loop.
- `getDataRekap` tetap dipertahankan — terbukti masih dibutuhkan di runtime (Sprint Code Cleanup Phase 1).

Sprint berikutnya:

Belum ditentukan. Akan mengikuti roadmap dan keputusan pengguna.

---

## Pengaturan

Status:
ACTIVE

Kondisi:

- Digunakan sebagai pusat konfigurasi aplikasi.
- Pengaturan Akademik telah selesai dimodularisasi dan telah lolos Deploy Uji serta Deploy Production.
- Backend Pengaturan Akademik dipisahkan ke `Pengaturan.js`.
- Frontend Pengaturan Akademik dipisahkan ke `js_pengaturan.html`.
- Endpoint dan perilaku runtime Pengaturan Akademik tetap kompatibel.
- `getAppInfo` tetap dipertahankan untuk kebutuhan Pengaturan Sistem pada tahap berikutnya.
- Pengaturan Sekolah masih dalam tahap penyempurnaan dan belum difungsikan.
- Pengaturan Sistem masih dalam tahap penyempurnaan dan belum difungsikan.
- Pengaturan Tahun Ajaran masih dalam tahap penyempurnaan dan belum difungsikan.
- Sprint Pengaturan secara keseluruhan tetap ACTIVE sampai seluruh bagian Pengaturan selesai dan telah melalui testing serta deploy production.

---

# ARSITEKTUR

Status:
STABIL

Seluruh halaman baru wajib mengikuti:

- AI_RULES.md
- ARCHITECTURE.md
- DATABASE.md

---

# DOKUMENTASI

Status:

Sedang disempurnakan.

Dokumentasi yang menjadi acuan saat ini:

- AI_RULES.md
- Analisis_WONG_MIT.md
- ARCHITECTURE.md
- DATABASE.md
- PROJECT_STATUS.md
- ROADMAP.md
- SPRINT.md
- CHANGELOG.md

Dokumentasi teknis tambahan akan dibuat ketika proyek memasuki fase stabil.

---

# TARGET BERIKUTNYA

Sprint aktif berikutnya adalah Sprint Pengaturan.

Roadmap aktif berikutnya:

1. Pengaturan
2. Dashboard
3. Penyempurnaan modul produksi lainnya

---

# STATUS PROYEK

Overall Progress:

Pondasi aplikasi:
Sangat Stabil

UI:
Stabil

Backend:
Stabil

Database:
Stabil

Responsive:
Stabil

Dokumentasi:
Sedang Disempurnakan

Project siap melanjutkan sprint berikutnya.