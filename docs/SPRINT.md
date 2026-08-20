# SPRINT

Dokumen ini mencatat seluruh sprint proyek WONG MIT.

Sprint yang telah selesai tidak boleh diubah.

Sprint baru selalu ditambahkan di bagian bawah.

---

# Sprint Rekap 2A-1

Status

DONE

Target

Modernisasi pondasi halaman Rekap.

Hasil

✅ Selesai

---

# Sprint Rekap 2A-2

Status

DONE

Target

Modern Responsive UI.

Hasil

✅ Selesai

---

# Sprint Rekap 2A-3

Status

DONE

Target

Final UI Polish.

Hasil

✅ Desktop lebih rapi

✅ Mobile lebih nyaman

✅ Empty State lebih baik

✅ Horizontal Scroll selesai

✅ Responsive stabil

---

# Sprint Rekap 2B

Status

DONE

Target

Backend Rekap.

Fokus

- Summary Card Dinamis
- Badge Otomatis
- Sticky Header
- Sticky Column
- Integrasi Data Backend
- Optimasi Render Tabel

Catatan

Sprint ini boleh mengubah HTML, CSS, JavaScript, dan Apps Script sesuai kebutuhan.

Hasil

✅ Dependency radio mode dihapus

✅ Engine Rekap tetap satu jalur dan berbasis filter

✅ Filter Guru, Kelas, dan persiapan Mapel berjalan stabil

✅ Export tetap kompatibel dengan engine Rekap

✅ Bugfix export semester dan lebar header Excel selesai

---

# Sprint Rekap 2C

Status

DONE

Target

Summary Card Dinamis

Hasil

✅ Total Siswa

✅ Sempurna

✅ Perlu Perhatian

✅ Persentase Rata-rata

---

# Sprint Rekap 2D

Status

DONE

Target

Sticky Header

Hasil

✅ Header tabel tetap terlihat saat scroll vertikal

✅ Tidak mengganggu responsive desktop maupun mobile

---

# Sprint Rekap 2E

Status

DONE

Target

Badge Keterangan

Hasil

✅ Badge Sempurna

✅ Badge Perlu Perhatian

✅ Badge Perlu Tindak Lanjut

---

# Sprint Rekap 2F

Status

DONE

Target

Interactive Table

Fokus

- Sorting Header
- Sorting Asc/Desc
- Icon Sort
- Client-side Sorting

Hasil

✅ Sorting header berjalan pada kolom Nama Siswa, KLS, H, S, I, A, %, dan Ket

✅ Klik pertama mengurutkan Ascending

✅ Klik kedua mengurutkan Descending

✅ Indikator Icon Sort ditampilkan pada header aktif

✅ Sorting dilakukan sepenuhnya secara client-side

✅ Sorting tidak memanggil backend atau menghitung ulang Rekap

✅ Testing Desktop LOLOS

✅ Testing Mobile LOLOS

✅ Review Pengguna LOLOS

---

# Sprint Export Baru

Status

DONE

Target

Export Rekap berbasis JavaScript Memory

Fokus

- Snapshot `rekapTableData` menjadi sumber utama Export.
- Export tidak menghitung ulang Rekap apabila snapshot tersedia.
- Urutan Excel mengikuti urutan tabel terakhir, termasuk hasil sorting.
- Fallback `getRekapFinal()` tetap tersedia untuk backward compatibility.

Hasil

✅ Export menggunakan snapshot `rekapTableData` dari JavaScript Memory

✅ Export tidak memanggil `getRekapFinal()` apabila snapshot valid tersedia

✅ Urutan Excel mengikuti urutan tabel terakhir

✅ Fallback backend tetap menjaga backward compatibility

---

# Sprint Cleanup Legacy Rekap

Status

DONE

Target

Pembersihan legacy code pada engine Rekap.

Fokus

- Menghapus wrapper `getRekapUmum()`, `getRekapGuru()`, dan `getRekapWali()` yang tidak memiliki caller internal.
- Menghapus parameter `mode` pada `getRekapFinal()`.
- Menghapus blok normalisasi compatibility `mode` pada `getRekapFinal()`.
- Memastikan engine Rekap hanya menggunakan satu jalur: `getRekapFinal() → mergeDataRekap() → getDataRekap() → hitungRekap()`.

Hasil

✅ Wrapper `getRekapUmum()`, `getRekapGuru()`, dan `getRekapWali()` telah dihapus

✅ Parameter `mode` pada `getRekapFinal()` telah dihapus

✅ Blok normalisasi compatibility `mode` telah dihapus

✅ Engine Rekap hanya menggunakan satu jalur

✅ Tidak ada perubahan perilaku runtime

✅ Diagnostics LOLOS

✅ git diff --check LOLOS

---

# Sprint Rekap 6

Status

DONE

Target

Optimasi Performa Engine Rekap.

Fokus

- Menghilangkan duplikasi pemanggilan `getFilteredGuruMengajar()`.
- Menambahkan fungsi internal `getDataRekapRaw()` yang mengembalikan array langsung.
- Mengoptimalkan `mergeDataRekap()` menggunakan lookup berbasis `Map` (nisn → daftar absensi).
- Menggunakan `Set` untuk lookup filter kelas dan relasi.
- Mengoptimalkan `renderRekapTable()` menggunakan `join("")` tanpa `innerHTML +=` di dalam loop.

Hasil

✅ Duplikasi `getFilteredGuruMengajar()` telah dihilangkan

✅ `getDataRekapRaw()` telah ditambahkan

✅ `mergeDataRekap()` menggunakan `Map` lookup (kompleksitas O(n+m))

✅ `Set` digunakan untuk lookup filter kelas dan relasi

✅ `renderRekapTable()` menggunakan `join("")`

✅ Output Rekap, filtering, sorting, summary, dan export tetap identik

✅ Diagnostics LOLOS

✅ git diff --check LOLOS

✅ Testing Desktop LOLOS

✅ Testing Mobile LOLOS

✅ Review Pengguna LOLOS

---

# Sprint Rekap 7B

Status

DONE

Target

Implementasi UX Halaman Rekap.

Fokus

- Validasi periode pada `tampilkanRekap()` (tanggal awal tidak boleh lebih besar dari tanggal akhir).
- Empty state yang lebih informatif saat tidak ada data pada periode dan filter yang dipilih.
- Teks loading tombol Export menjadi "Menyiapkan Excel...".
- Toast sukses "Export berhasil." setelah export selesai.
- `aria-live="polite"` pada tabel hasil rekap.
- Petunjuk scroll horizontal pada mobile ("Geser tabel untuk melihat kolom lainnya.").
- Animasi fade-in ringan saat tabel rekap selesai dirender.

Hasil

✅ Validasi periode telah ditambahkan

✅ Empty state lebih informatif

✅ Teks loading Export "Menyiapkan Excel..." telah diterapkan

✅ Toast "Export berhasil." telah ditambahkan

✅ `aria-live="polite"` telah ditambahkan pada tabel hasil rekap

✅ Petunjuk scroll horizontal mobile telah ditambahkan

✅ Animasi fade-in tabel telah ditambahkan

✅ Diagnostics LOLOS

✅ git diff --check LOLOS

✅ Testing Desktop LOLOS

✅ Testing Mobile LOLOS

✅ Review Pengguna LOLOS

---

# SPRINT REKAP — CLOSED

Seluruh Sprint Rekap telah selesai, di-freeze, dan ditutup.

Daftar sprint Rekap yang telah selesai:
- Sprint Rekap 2A-1 s/d 2A-3
- Sprint Rekap 2B s/d 2F
- Sprint Export Baru
- Sprint Cleanup Legacy Rekap
- Sprint Rekap 6
- Sprint Rekap 7B
---

# Sprint Guru Mengajar — UX Panel & Search

Status

DONE

Target

UX Panel & Search Halaman Guru Mengajar.

Fokus

- Collapse/expand panel Daftar Mata Pelajaran.
- Collapse/expand panel Daftar Guru Mengajar.
- Search client-side tabel Mata Pelajaran (`filterMapel()`).
- Search client-side tabel Guru Mengajar (`filterGuruMengajar()`).

Hasil

✅ Collapse/expand kedua panel menggunakan Bootstrap 5 Collapse

✅ Search client-side `filterMapel()` untuk `#tableMapel`

✅ Search client-side `filterGuruMengajar()` untuk `#tableGuruMengajar`

✅ Search tidak memanggil backend

✅ Rotasi icon chevron saat collapse/expand

✅ `aria-expanded` dan `aria-controls` pada tombol toggle

✅ Runtime test desktop dan mobile LOLOS

✅ node --check Code.js LOLOS

✅ git diff --check LOLOS

---

# Sprint Guru Mengajar — UX Polish

Status

DONE

Target

UX Polish Halaman Guru Mengajar.

Fokus

- Menggabungkan struktur panel menjadi satu card utuh per panel.
- Panel default CLOSED.
- Menghilangkan kotak/ruang putih kosong saat collapse.
- Padding internal konsisten pada header dan body.
- Polish visual ringan (spacing, border/radius, warna soft, hover/focus, responsive).

Hasil

✅ Satu card utuh per panel (Daftar Mata Pelajaran dan Guru Mengajar)

✅ Panel default CLOSED

✅ Tidak ada kotak/ruang putih kosong saat collapse

✅ Judul/deskripsi dan search box tidak menempel ke tepi

✅ ID penting dipertahankan (`tableMapel`, `tableGuruMengajar`, `guruMapelBody`, `guruGuruMengajarBody`, `guruSearchMapel`, `guruSearchGuruMengajar`)

✅ Search client-side tetap berjalan tanpa perubahan

✅ Responsive desktop dan mobile

✅ Runtime test desktop dan mobile LOLOS

✅ node --check Code.js LOLOS

✅ git diff --check LOLOS

---

# Sprint DS.4 — Data Siswa Access & Export Stabilization

Status

DONE

Target

Data Siswa — Access & Export Stabilization.

Fokus

- Menghapus tombol/fitur duplikasi Tambah Siswa Manual.
- Tambah Siswa Manual dan Import Massal hanya untuk Admin dan Kepala Sekolah.
- Edit dan Hapus Siswa hanya untuk Admin dan Kepala Sekolah.
- Halaman Data Siswa dapat diakses seluruh role.
- Download Data Siswa Excel dan PDF tersedia untuk seluruh role.
- Perbaikan bug/regresi terkait perubahan tersebut.

Hasil

✅ Tombol/fitur duplikasi Tambah Siswa Manual dihapus

✅ Tambah Manual dan Import Massal hanya Admin dan Kepala Sekolah

✅ Edit dan Hapus hanya Admin dan Kepala Sekolah

✅ Halaman Data Siswa dapat diakses seluruh role

✅ Download Excel dan PDF tersedia untuk seluruh role

✅ Modal Download Data Siswa dengan filter kelas

✅ Permission check backend pada `addStudent()`, `updateStudent()`, `deleteStudent()`

✅ Utility backend export (`exportSiswaExcel()`, `exportSiswaPdf()`, `buildSiswaExportSheet()`, `getNamaBySession()`, `exportSpreadsheetAsPdf()`)

✅ Library client-side `xlsx-js-style`, `jspdf`, `jspdf-autotable`

✅ Caller frontend mengirim `sessionId` pada operasi siswa

✅ Audit `git diff` selesai

✅ node --check Code.js LOLOS

✅ git diff --check menemukan trailing whitespace pada `index.html` baris 4262, 4265, dan 4581; tidak diperbaiki pada sesi dokumentasi karena source code DS.4 tidak boleh disentuh

---

# Sprint Pengaturan

Status

ACTIVE

Target

Penyempurnaan dan penyelesaian halaman Pengaturan aplikasi secara bertahap tanpa mengganggu aplikasi production.

Fokus

- Penyempurnaan dan modularisasi Pengaturan Akademik
- Penyempurnaan dan implementasi Pengaturan Sekolah
- Penyempurnaan dan implementasi Pengaturan Sistem
- Penyempurnaan dan implementasi Pengaturan Tahun Ajaran

Progress

- Pengaturan Akademik — selesai
- Pengaturan Sekolah — belum difungsikan
- Pengaturan Sistem — belum difungsikan
- Pengaturan Tahun Ajaran — belum difungsikan

Status keseluruhan sprint tetap ACTIVE sampai seluruh bagian Pengaturan selesai dan telah melalui testing serta deploy production.

---

# Sprint Code Cleanup Phase 1

Status

DONE

Target

Penghapusan 10 fungsi unused dari Code.js.

Fokus

- Audit + global reference scan terhadap 10 target fungsi.
- 10 fungsi target: `include`, `getMasterAbsensi`, `getNamaGuruById`, `isMapelUsed`, `getKelasByNama`, `getMapelByNama`, `getKelasByGuru`, `getTemplateFolder`, `getGuruMengajarTemplateFile`, `createGuruMengajarTemplate`.
- Hapus definisi fungsi hanya — tidak ada refactor lain.
- Verifikasi: node --check, git diff --check, git diff --stat.
- Audit regression statis: Rekap, Guru Mengajar, Data Siswa, Pengaturan, Dashboard.

Hasil

✅ 10 fungsi berhasil dihapus: `include`, `getMasterAbsensi`, `getNamaGuruById`, `isMapelUsed`, `getKelasByNama`, `getMapelByNama`, `getKelasByGuru`, `getTemplateFolder`, `getGuruMengajarTemplateFile`, `createGuruMengajarTemplate`

✅ Static audit: 0 caller ditemukan di Code.js, HTML, docs/

✅ Runtime regression test setelah deploy LOLOS

✅ `getDataRekap` tidak dihapus — terbukti masih dibutuhkan di runtime

✅ `getAppInfo` dan `getRelasiMengajar` dipertahankan untuk roadmap Pengaturan/Dashboard

✅ 3 fungsi export siswa (`buildSiswaExportSheet`, `exportSiswaExcel`, `exportSiswaPdf`) tidak dihapus, ditunda

✅ `downloadTemplateGuruMengajar` tetap menggunakan `createTemplateSpreadsheet()`

✅ Tidak ada perubahan arsitektur, database, atau fitur aplikasi; perubahan source hanya cleanup 10 fungsi unused. Dokumentasi sprint diperbarui.

✅ `git diff`: 451 deletions dan 11 insertions
- 11 insertions = 2 blok komentar DRAFT yang sudah ada sebelumnya untuk `getAppInfo` dan `getRelasiMengajar`, bukan bagian cleanup

✅ `node --check Code.js` LOLOS

✅ `git diff --check` LOLOS

---

# Sprint Dashboard — Absensi Shortcut & Attendance Monitoring UX

Status

DONE

Target

Menambahkan shortcut Absensi dan penyempurnaan UX monitoring kehadiran di Dashboard.

Fokus

- Shortcut "Mulai Absensi" dari Dashboard menuju halaman Absensi.
- Penempatan responsif desktop/mobile.
- Dashboard Attendance modal: feedback loading (animasi tadpole), pencegahan klik berulang, tampilan hari/tanggal saat ini, dan info guru mengajar per kelas.
- Layout compact dengan truncation nama guru yang panjang.

Hasil

✅ Shortcut "Mulai Absensi" → `page_absensi` ditambahkan

✅ Penempatan responsif desktop/mobile

✅ Modal Attendance: feedback loading tadpole, cegah klik berulang, hari/tanggal saat ini, guru mengajar per kelas

✅ Layout compact + truncation nama guru panjang

✅ Runtime testing di Apps Script LOLOS

✅ File source berubah: `Code.js`, `index.html`, `page_dashboard.html`

✅ Working tree bersih setelah commit

✅ Commit: 9c31e82

---


# Aturan Sprint

Setiap sprint wajib melalui tahapan berikut.

1. Audit
2. Implementasi
3. Testing
4. UI Review
5. Git Commit
6. CLASP Push
7. Deploy
8. Final Review
9. Update Dokumentasi
10. Baru boleh lanjut sprint berikutnya.

---

# PRE-SPRINT PERFORMANCE — Batch Read & Batch Write

Status

DONE — P1–P3 CLOSED

Target

Audit dan optimasi komunikasi Apps Script ↔ Google Spreadsheet dengan fokus pada efisiensi READ dan WRITE tanpa mengubah business logic yang sudah stabil.

## P1 — Batch Write Absensi

Status

DONE

Hasil

✅ `saveAttendance()` menggunakan batch write untuk satu kelas.

✅ Data absensi siswa diproses sebagai array 2D dan ditulis secara batch.

✅ Jumlah record, ID Relasi, Hari, Mapel, Timestamp, dan status tetap benar.

✅ Runtime test di GAS UJI LOLOS.

## P2 — Batch Update/Revisi Absensi

Status

DONE

Hasil

✅ `reviseAttendance()` tidak lagi menghapus dan menulis record siswa satu per satu.

✅ Perubahan revisi diproses secara batch.

✅ Jumlah record tetap terjaga.

✅ Status siswa yang direvisi tetap benar.

✅ Data siswa yang tidak berubah tetap dipertahankan dengan benar.

✅ Runtime regression test di GAS UJI LOLOS.

## P3 — Dashboard Memory Lookup

Status

DONE

Hasil

✅ Pembacaan Dashboard dibatasi pada data Spreadsheet yang diperlukan.

✅ Lookup Guru/Kelas/Guru Mengajar menggunakan `Map` di memory.

✅ Pembacaan Absensi Dashboard dibatasi pada kolom yang diperlukan.

✅ Perhitungan tanggal tidak lagi melakukan `Utilities.formatDate()` untuk setiap baris Absensi.

✅ Card `Diabsen` tetap menggunakan lazy-load dan jalur backend telah dioptimalkan.

✅ Runtime test di GAS UJI LOLOS.

## Checkpoint

🟢 P1–P3 CLOSED & PRODUCTION DEPLOYED

Commit source:

`12d1a39` — `perf: optimize attendance and dashboard read write`

Tag checkpoint:

`v1.3-performance-p1-p3`

Next:

🔄 P4 — Batch Read / Page Data

Catatan:

Optimasi berikutnya tetap melalui audit bottleneck terlebih dahulu. Cache, perubahan struktur Sheet, index/summary table, dan optimasi berisiko tinggi tidak diterapkan tanpa bukti kebutuhan dan impact analysis.

---

# Sprint Pengaturan Akademik — Refactoring & Modularisasi

Status

DONE

Target

Melakukan refactoring dan modularisasi Pengaturan Akademik secara aman tanpa mengubah perilaku aplikasi, endpoint, database, maupun koneksi frontend-backend.

Fokus

- Memisahkan `getAcademicSettings()` dan `saveAcademicSettings()` dari `Code.js` ke `Pengaturan.js`.
- Memisahkan logic frontend Pengaturan Akademik dari `index.html` ke `js_pengaturan.html`.
- Mempertahankan endpoint `google.script.run` yang sudah digunakan frontend.
- Mempertahankan caller `loadPage()` → `loadAcademicSettings()`.
- Mempertahankan `page_pengaturan.html` tanpa perubahan.
- Mempertahankan database Spreadsheet dan struktur Sheet `Pengaturan`.
- Menggunakan partial loader Apps Script `<?!= getPage("js_pengaturan") ?>`.

Hasil

✅ `getAcademicSettings()` dipindahkan ke `Pengaturan.js`

✅ `saveAcademicSettings()` dipindahkan ke `Pengaturan.js`

✅ 7 fungsi frontend Pengaturan Akademik dipindahkan ke `js_pengaturan.html`

✅ 7 fungsi lama dihapus dari `index.html`

✅ `loadPage()` dan caller `loadAcademicSettings()` tetap dipertahankan

✅ `page_pengaturan.html` tidak diubah

✅ Endpoint backend tetap sama

✅ Struktur database tidak berubah

✅ `js_pengaturan.html` dimuat menggunakan partial loader Apps Script

✅ Deploy Uji LOLOS

✅ Deploy Production LOLOS

✅ Tidak ditemukan regresi pada Pengaturan Akademik

Catatan

Refactoring dilakukan secara incremental dengan prinsip Move, Don't Rewrite. Tidak dilakukan refactor tambahan terhadap logic Pengaturan di luar ruang lingkup Pengaturan Akademik.

File terkait

- `apps-script/Code.js`
- `apps-script/Pengaturan.js`
- `apps-script/index.html`
- `apps-script/js_pengaturan.html`
- `apps-script/page_pengaturan.html`

---

# Sprint Dashboard — Refactoring & Modularisasi

Status

DONE

Target

Melakukan refactoring dan modularisasi kode Dashboard secara aman tanpa mengubah perilaku, endpoint, database, maupun koneksi frontend-backend.

Fokus

- Memisahkan `getDashboardData()` dan `getDashboardAttendanceSummary()` dari `Code.js` ke `Dashboard.js`.
- Memisahkan `loadDashboard()` dan `showDashboardAttendance()` dari `index.html` ke `js_dashboard.html`.
- Mempertahankan endpoint `google.script.run` dengan nama dan signature yang sama.
- Mempertahankan `page_dashboard.html` sebagai UI Dashboard.
- Mempertahankan `getGuruProfile()` di `Code.js` sebagai dependency/profile service.
- Mempertahankan shared infrastructure seperti `getMasterSheetData()`, `getWeekDays()`, dan utilitas global.
- Menggunakan partial loader `<?!= getPage("js_dashboard") ?>`.

Hasil

✅ `getDashboardData()` dipindahkan ke `Dashboard.js`

✅ `getDashboardAttendanceSummary()` dipindahkan ke `Dashboard.js`

✅ `loadDashboard()` dipindahkan ke `js_dashboard.html`

✅ `showDashboardAttendance()` dipindahkan ke `js_dashboard.html`

✅ 2 fungsi backend lama dihapus dari `Code.js`

✅ 2 fungsi frontend lama dihapus dari `index.html`

✅ `getGuruProfile()` tetap dipertahankan di `Code.js`

✅ `page_dashboard.html` tidak diubah

✅ Endpoint dan signature tetap sama

✅ Shared dependency tetap dipertahankan

✅ `js_dashboard.html` dimuat menggunakan partial loader Apps Script

✅ Deploy Uji LOLOS

✅ Deploy Production LOLOS

✅ Testing Dashboard LOLOS

Catatan

Refactoring ini hanya mencakup modularisasi kode Dashboard. Penyempurnaan fitur Dashboard berikutnya, termasuk fitur yang belum tersedia seperti informasi jadwal mengajar dan pengembangan Dashboard lainnya, tetap menjadi pekerjaan sprint terpisah dan tidak dinyatakan selesai oleh sprint refactoring ini.

Refactoring dilakukan dengan prinsip Move, Don't Rewrite. Tidak dilakukan perubahan business logic atau penambahan fitur dalam sprint ini.

File terkait

- `apps-script/Code.js`
- `apps-script/Dashboard.js`
- `apps-script/index.html`
- `apps-script/js_dashboard.html`
- `apps-script/page_dashboard.html`

---

# Sprint Guru — Refactoring & Modularisasi

Status

DONE

Target

Melakukan refactoring dan modularisasi modul Data Guru secara aman tanpa mengubah perilaku aplikasi, endpoint, authorization, struktur database, maupun hubungan Data Guru dengan modul lain.

Fokus

- Memisahkan fungsi CRUD Data Guru dari `Code.js` ke `Guru.js`.
- Memisahkan client-side logic Data Guru dari `index.html` ke `js_guru.html`.
- Mempertahankan nama, parameter, dan perilaku seluruh endpoint Guru.
- Mempertahankan `page_guru.html` sebagai UI/view Data Guru.
- Mempertahankan fungsi shared dan fungsi Guru lintas-modul di `Code.js`.
- Menggunakan partial loader `<?!= getPage("js_guru") ?>`.
- Menerapkan prinsip Move, Don't Rewrite.

Hasil

✅ `getTeachers()` dipindahkan ke `Guru.js`

✅ `addTeacher()` dipindahkan ke `Guru.js`

✅ `getTeacherById()` dipindahkan ke `Guru.js`

✅ `updateTeacher()` dipindahkan ke `Guru.js`

✅ `deleteTeacher()` dipindahkan ke `Guru.js`

✅ `loadTeachers()` dipindahkan ke `js_guru.html`

✅ `filterGuru()` dipindahkan ke `js_guru.html`

✅ `showTambahGuru()` dipindahkan ke `js_guru.html`

✅ `simpanGuru()` dipindahkan ke `js_guru.html`

✅ `editGuru()` dipindahkan ke `js_guru.html`

✅ `hapusGuru()` dipindahkan ke `js_guru.html`

✅ Fungsi shared/lintas-modul tidak ikut dipindahkan

✅ `page_guru.html` tidak diubah

✅ Endpoint dan signature tetap sama

✅ Authorization dan cache invalidation tetap sama

✅ Deploy Uji LOLOS

✅ Testing Data Guru LOLOS

✅ Deploy Production LOLOS

Catatan

Refactoring ini hanya mencakup modularisasi kode Data Guru. Penyempurnaan fitur Data Guru atau pengembangan modul lain yang menggunakan data Guru tetap merupakan pekerjaan sprint terpisah.

Tidak dilakukan perubahan business logic, struktur database, atau kontrak endpoint dalam sprint ini.

File terkait

- `apps-script/Code.js`
- `apps-script/Guru.js`
- `apps-script/index.html`
- `apps-script/js_guru.html`
- `apps-script/page_guru.html`

---

# Sprint Kelas — Refactoring & Modularisasi

Status

DONE

Target

Melakukan refactoring dan modularisasi modul Data Kelas tanpa mengubah behavior, endpoint, struktur database, authorization, maupun dependency lintas modul.

Fokus

- Memisahkan fungsi CRUD Data Kelas dari `Code.js` ke `Kelas.js`.
- Memisahkan client-side logic Data Kelas dari `index.html` ke `js_kelas.html`.
- Mempertahankan nama, parameter, dan perilaku seluruh endpoint Kelas.
- Mempertahankan `page_kelas.html` sebagai UI/view.
- Mempertahankan fungsi shared dan fungsi Kelas lintas modul di `Code.js`.
- Mempertahankan struktur Sheet `Kelas`:
  `ID Kelas | Nama Kelas | ID Wali Kelas | Status`.
- Menggunakan partial loader `<?!= getPage("js_kelas") ?>`.
- Menerapkan prinsip Move, Don't Rewrite.

Hasil

✅ `getClasses()` dipindahkan ke `Kelas.js`

✅ `addClass()` dipindahkan ke `Kelas.js`

✅ `getClassById()` dipindahkan ke `Kelas.js`

✅ `updateClass()` dipindahkan ke `Kelas.js`

✅ `deleteClass()` dipindahkan ke `Kelas.js`

✅ Fungsi frontend Kelas dipindahkan ke `js_kelas.html`

✅ `page_kelas.html` tidak diubah

✅ Endpoint dan signature tetap sama

✅ Authorization tetap sama

✅ Cache invalidation tetap dipertahankan

✅ Dependency lintas modul tetap dipertahankan

✅ Deploy Uji LOLOS

✅ Testing Kelas LOLOS

✅ Testing lintas modul LOLOS

✅ Deploy Production LOLOS

Catatan

Refactoring ini hanya mencakup modularisasi Data Kelas. Penyempurnaan fitur Data Kelas berikutnya tetap merupakan sprint terpisah.

---

# Sprint Refactoring Modularisasi Data Siswa — CRUD

Status

DONE

Target

Memisahkan logic CRUD Data Siswa dari file utama tanpa mengubah behavior aplikasi.

Fokus

- Ekstraksi backend CRUD Siswa dari `Code.js` ke `Siswa.js`.
- Ekstraksi frontend CRUD Siswa dari `index.html` ke `js_siswa.html`.
- Mempertahankan endpoint, authorization, database, caller, dan behavior runtime.
- Menambahkan partial loader `<?!= getPage("js_siswa") ?>`.
- Tidak memindahkan fungsi export Siswa pada sprint ini.
- Menunda refactoring export lintas modul sampai struktur Rekap, Absensi, dan modul terkait telah diaudit.

Hasil

✅ Backend CRUD Siswa dipisahkan ke `Siswa.js`

✅ Frontend CRUD Siswa dipisahkan ke `js_siswa.html`

✅ `index.html` menggunakan loader `js_siswa`

✅ Fungsi export Siswa tetap dipertahankan pada struktur sebelumnya

✅ Endpoint dan behavior CRUD tetap kompatibel

✅ Deploy Uji LOLOS

✅ Testing Data Siswa LOLOS

✅ Deploy Production LOLOS