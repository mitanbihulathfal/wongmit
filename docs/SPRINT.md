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

- Pengaturan Akademik — DONE
- Pengaturan Sekolah — DONE
- Pengaturan Sistem — belum difungsikan
- Pengaturan Tahun Ajaran — belum difungsikan

Catatan

Pengaturan Akademik dan Pengaturan Sekolah telah selesai diimplementasikan, melalui testing dan deploy uji, serta dinyatakan LOLOS.

Pengaturan Sekolah mencakup:
- Identitas sekolah
- Nama sekolah
- Kepala sekolah
- Logo sekolah
- Upload, replace, dan hapus logo sekolah berbasis Google Drive
- Integrasi logo sekolah sebagai consumer identitas sekolah

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

# Sprint Modularisasi Infrastructure — Master Data, Export, Auth & Calendar

Status

DONE

Target

Menyelesaikan modularisasi shared infrastructure WONG MIT agar `Code.js` dan struktur aplikasi lebih terorganisasi tanpa mengubah endpoint, database, atau behavior production.

Fokus

- Master Data Infrastructure
- Export Engine
- Auth / Session / Role
- Calendar Infrastructure
- Audit dependency lintas modul
- Mempertahankan fungsi top-level Apps Script
- Memastikan regression setelah setiap extraction

Hasil

### Master Data

✅ Master Data Infrastructure dipisahkan ke `MasterData.js`

✅ Shared master-sheet access dan cache tetap kompatibel

### Export

✅ Export Engine dipisahkan ke `Export.js`

✅ `createExportSpreadsheet()`

✅ `createExportFileName()`

✅ `exportSpreadsheetAsXlsx()`

✅ `cleanupExportSpreadsheet()`

✅ `exportSpreadsheetAsPdf()`

✅ Export domain tetap berada pada modul masing-masing

### Auth / Session / Role

✅ Auth dipisahkan ke `Auth.js`

✅ `checkLogin()`

✅ `createSession()`

✅ `checkSession()`

✅ `logoutSession()`

✅ `getRoleBySession()`

✅ `checkRole()`

✅ Session dan authorization tetap kompatibel

### Calendar

✅ Calendar Infrastructure dipisahkan ke `Calendar.js`

✅ `getWeekDays()`

✅ `validateWeekDay()`

✅ `getWeeklyHolidays()`

✅ `isSchoolHoliday()`

✅ `getAttendanceCalendarContext()`

✅ `getNamaHariIndonesia()`

✅ Calendar Context Absensi tetap berjalan

### Validasi

✅ Audit dependency lintas modul LOLOS

✅ Deploy Uji LOLOS

✅ Deploy Production LOLOS

✅ Regression lintas modul LOLOS

✅ Tidak ada perubahan database

✅ Endpoint runtime tetap kompatibel

Catatan

Batch ini menutup refactoring shared infrastructure utama yang telah diprioritaskan sebelum masuk ke fase penyempurnaan fitur.

Setelah batch ini selesai, fokus pengembangan kembali ke sprint fitur, dimulai dari Sprint Pengaturan.

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

# Sprint Guru Mengajar — Refactoring & Modularisasi

Status

DONE

Target

Memisahkan backend dan frontend Guru Mengajar dari file utama tanpa mengubah behavior runtime.

Fokus

* Backend `Code.js` → `GuruMengajar.js`
* Frontend `index.html` → `js_gurumengajar.html`
* Penambahan loader `<?!= getPage("js_gurumengajar") ?>`
* Mempertahankan `page_gurumengajar.html`
* Mempertahankan endpoint dan dependency shared
* Memastikan dependency lintas modul Absensi dan Rekap tetap berjalan

Hasil

✅ Backend Guru Mengajar berhasil dimodularisasi

✅ Frontend Guru Mengajar berhasil dimodularisasi

✅ `loadMasterImportGuruMengajar()` dan `renderPreviewGuruMengajar()` berhasil dipindahkan

✅ Loader `js_gurumengajar` berhasil ditambahkan

✅ Endpoint dan behavior runtime tetap kompatibel

✅ Deploy Uji LOLOS

✅ Testing Guru Mengajar LOLOS

✅ Deploy Production LOLOS

# Sprint Guru Mengajar — Bugfix Preview Import Massal

Status

DONE

Target

Memperbaiki validasi preview Import Massal Guru Mengajar yang menandai data master yang valid sebagai error.

Fokus

* Audit `renderPreviewGuruMengajar()`
* Verifikasi master Guru, Kelas, dan Mapel
* Verifikasi validasi Hari dan Status
* Menyamakan pencocokan preview dengan struktur master data

Hasil

✅ Validasi Guru diperbaiki

✅ Validasi Kelas diperbaiki

✅ Validasi Mapel diperbaiki

✅ Validasi Hari tetap berjalan

✅ Preview data valid tidak lagi ditandai merah secara keliru

✅ Tombol Upload aktif ketika seluruh data valid

✅ Import Massal berhasil diuji

✅ Deploy Production LOLOS

# Sprint Mapel — Refactoring & Modularisasi

Status

DONE

Target

Memisahkan domain Mata Pelajaran dari file utama tanpa mengubah behavior runtime.

Hasil

✅ Backend Mapel dipisahkan ke `Mapel.js`.

✅ Frontend Mapel dipisahkan ke `js_mapel.html`.

✅ Loader `<?!= getPage("js_mapel") ?>` ditambahkan.

✅ Endpoint dan signature Google Apps Script tetap kompatibel.

✅ Import Mapel tetap berjalan.

✅ Download Template Mapel tetap berjalan.

✅ Dependency Guru Mengajar tetap berjalan.

✅ Deploy Uji LOLOS.

✅ Deploy Production LOLOS.

Catatan

Refactoring Mapel selesai tanpa perubahan database dan tanpa perubahan behavior runtime yang terdeteksi.

#### Refactoring Absensi Harian — SELESAI

Absensi Harian telah dimodularisasi secara atomic:
`Code.js` → `Absensi.js`
`index.html` → `js_absensi.html`

Loader frontend:
`<?!= getPage("js_absensi") ?>`

Seluruh fungsi dan state Absensi yang termasuk boundary modul telah dipindahkan, termasuk alur Absensi Baru, Draft, Simpan, dan Revisi.

Hasil Deploy Uji:
**LOLOS seluruh QA Absensi Harian.**

# Sprint Rekap — Refactoring & Modularisasi

Status

DONE

Target

Memisahkan boundary backend dan frontend Rekap Absensi tanpa mengubah behavior, endpoint, database, authorization, maupun engine Rekap.

Fokus

- Memindahkan logic backend Rekap dari `Code.js` ke `Rekap.js`.
- Memindahkan logic frontend Rekap dari `index.html` ke `js_rekap.html`.
- Menambahkan loader `<?!= getPage("js_rekap") ?>`.
- Mempertahankan dependency lintas modul.
- Mempertahankan shared utility.
- Mempertahankan export engine bersama.
- Mempertahankan satu jalur engine Rekap:
  `getRekapFinal() → mergeDataRekap() → getDataRekap() → hitungRekap()`.

Hasil

✅ Backend Rekap dipisahkan ke `Rekap.js`

✅ Frontend Rekap dipisahkan ke `js_rekap.html`

✅ Loader Rekap ditambahkan ke `index.html`

✅ State/filter frontend Rekap ikut dimodularisasi

✅ `updateFilterGuruRekap()` dipindahkan ke `js_rekap.html`

✅ Shared utilities tetap pada boundary masing-masing

✅ Export engine bersama tidak diubah

✅ Endpoint dan signature tetap sama

✅ Database dan authorization tetap sama

✅ Deploy Uji LOLOS

✅ Testing Rekap LOLOS

✅ Regression lintas modul LOLOS

Catatan

Refactoring ini hanya memindahkan boundary modul dan tidak mengubah business logic Rekap.

Modul Rekap tetap berstatus FROZEN setelah extraction.

---

# Sprint Final Cleanup / Dead Code Audit

Status

DONE

Target

Menutup fase Refactoring Modulasi dengan menghapus legacy/dead code yang telah terbukti tidak memiliki caller atau reference aktif.

Fokus

- Audit caller dan reference seluruh repository.
- Verifikasi direct call, `google.script.run`, internal backend caller, dynamic reference, dependency, dan loader.
- Tidak menghapus fungsi yang masih digunakan atau belum terbukti aman.
- Mempertahankan shared utility dan fungsi roadmap.

Hasil

✅ `openImportModal()` dihapus dari `index.html`.

✅ `getGuruOptions()` dihapus dari `Code.js`.

✅ `getKelasOptions()` dihapus dari `Code.js`.

✅ `getMapelOptions()` dihapus dari `Code.js`.

✅ `getMasterSiswa()` dipertahankan karena masih digunakan oleh Rekap.

✅ `getStudentsByClass()` dipertahankan karena masih digunakan oleh Absensi.

✅ `getWaliKelasOptions()` dipertahankan karena masih digunakan oleh Kelas.

✅ `getAppInfo()`, `invalidateFrontendMasterData()`, dan fungsi export siswa yang masih diperlukan roadmap dipertahankan.

✅ `js_import.html` tetap aktif melalui loader `index.html`.

✅ Tidak ada perubahan database atau behavior fitur yang disengaja.

Status akhir

FASE REFACTORING MODULASI + CLEANUP FINAL SELESAI

---

# Sprint Pengaturan — UX Preview → Detail → Edit

Status

DONE

Target

Menyempurnakan fondasi UX halaman Pengaturan agar seluruh card bersifat read-only pada keadaan awal dan aksi Edit hanya tersedia melalui tampilan Detail.

Fokus

- Mengubah interaksi card Pengaturan dari direct edit menjadi Preview → Detail → Edit.
- Menghilangkan tombol Edit dari card preview.
- Menghilangkan placeholder toast pada Pengaturan Sekolah, Sistem, dan Tahun Ajaran.
- Menyiapkan detail view terpusat untuk seluruh card Pengaturan.
- Mempertahankan kontrak backend Pengaturan Akademik.
- Mempertahankan role check, validasi, cache invalidation, dan behavior backend existing.
- Menggunakan event delegation untuk aksi card dan action button.
- Menjaga responsive layout dan desain visual WONG MIT.

Hasil

✅ Card Pengaturan tidak lagi menggunakan `onclick` inline.

✅ Empat card Pengaturan menggunakan state preview/read-only.

✅ Tombol `Edit` tidak lagi tampil pada card preview.

✅ Klik card membuka Detail dan tidak langsung membuka mode Edit.

✅ Detail Akademik menampilkan Tahun Ajaran, Semester, dan Hari Libur.

✅ Edit Akademik hanya tersedia dari Detail Akademik.

✅ Save Akademik tetap menggunakan `saveAcademicSettings()` tanpa perubahan kontrak backend.

✅ Cancel dari form Edit kembali ke Detail Akademik.

✅ Detail dapat kembali ke preview empat card.

✅ Pengaturan Sekolah, Sistem, dan Tahun Ajaran tidak lagi menampilkan placeholder toast lama.

✅ Pengaturan Sekolah, Sistem, dan Tahun Ajaran memiliki detail view informatif sebagai fondasi sprint berikutnya.

✅ Aksi Edit, Simpan, Batal, dan Kembali menggunakan event delegation.

✅ Keyboard Enter/Space pada card tetap didukung.

✅ `Pengaturan.js` tidak diubah.

✅ Role check, validasi backend, dan cache invalidation tetap dipertahankan.

✅ `git diff --check` LOLOS.

✅ Deploy Uji LOLOS.

✅ Testing runtime Pengaturan LOLOS.

✅ Testing event handling LOLOS.

✅ Regression test lintas modul LOLOS.

✅ Testing role LOLOS.

Commit

`2ecfbcd` — `feat(pengaturan): perbaiki flow preview-detail-edit`

Catatan

Sprint ini hanya menyempurnakan fondasi UX Pengaturan. Implementasi backend dan fungsi operasional Pengaturan Sekolah, Pengaturan Sistem, dan Pengaturan Tahun Ajaran tetap menjadi sprint berikutnya sesuai roadmap.

# Sprint 3A-1 — Backend Identity Foundation

Status

DONE

Target

Membangun fondasi backend identitas sekolah tanpa mengubah kontrak Pengaturan Akademik.

Fokus

* `getSchoolIdentity(sessionId)`
* `saveSchoolIdentity(sessionId, data)`
* Role check
* Master Data cache
* Cache invalidation
* Dukungan key `logo_aplikasi`
* File ID Google Drive sebagai nilai asset

Hasil

✅ Backend Identity Foundation selesai

✅ `getAcademicSettings()` tidak berubah

✅ `saveAcademicSettings()` tidak berubah

✅ Role check sesuai pola existing

✅ Cache invalidation diterapkan

✅ Tidak ada perubahan frontend

Commit

`a717d1d`

Validasi

✅ Deploy Uji LOLOS

✅ Regression Pengaturan Akademik LOLOS

✅ Dashboard LOLOS

✅ Data Siswa LOLOS

✅ Guru Mengajar LOLOS

✅ Absensi LOLOS

✅ Rekap LOLOS

# Sprint 3A-2 — UI Pengaturan Sekolah

Status

DONE

Target

Membangun UI Pengaturan Sekolah dengan pola Preview → Detail → Edit.

Fokus

* Preview card
* Detail Sekolah
* Edit
* Save
* Cancel
* Validasi Nama Sekolah
* Integrasi `getSchoolIdentity()`
* Integrasi `saveSchoolIdentity()`
* File ID Google Drive

Hasil

✅ Preview card tanpa tombol Edit

✅ Detail Sekolah

✅ Form Edit Sekolah

✅ Save + confirmation

✅ Cancel

✅ Refresh data setelah save

✅ Event delegation

✅ Tidak ada perubahan backend

Validasi

✅ Deploy Uji LOLOS

✅ Preview → Detail → Edit LOLOS

✅ Save LOLOS

✅ Cancel LOLOS

✅ Validasi Nama Sekolah LOLOS

✅ Regression Pengaturan Akademik LOLOS

Commit

`feat(pengaturan): add school identity UI`

# Sprint 3A-3.1 — Identity Reader Foundation

Status

DONE

Target

Mengintegrasikan identitas sekolah ke consumer aplikasi secara bertahap.

Fokus

- Dashboard subtitle menggunakan `nama_sekolah`.
- Mempertahankan fallback.
- Tidak mengubah kontrak `getDashboardData()`.
- Tidak mengubah `getAppInfo()`.
- Tidak menyentuh Export/Rekap/Siswa.
- Menjaga boundary pre-login dan post-login.

Hasil

✅ `page_dashboard.html` menggunakan identity-aware subtitle.

✅ `js_dashboard.html` menggunakan `getSchoolIdentity(sessionId)` sebagai reader terpisah.

✅ Subtitle menjadi `Website ONline Guru [Nama Sekolah]`.

✅ Fallback branding lama tetap tersedia.

✅ Penulisan identity menggunakan `innerText`.

✅ Tidak ada perubahan backend.

Validasi

✅ Syntax check LOLOS

✅ Scope file LOLOS

✅ Regression Dashboard LOLOS

✅ Deploy Uji LOLOS

Commit

`29266bd`

Status

DONE

---

# Sprint Pengaturan — 3A-3.2 Application Identity Foundation

Status

DONE

Target

Membangun fondasi identity aplikasi yang terpisah dari identity sekolah dan dapat digunakan sebelum login.

Fokus

- Menetapkan `getAppInfo()` sebagai single owner identity aplikasi.
- Membaca identity aplikasi dari Sheet `Pengaturan`.
- Mendukung akses tanpa session untuk kebutuhan pre-login.
- Menetapkan `nama_aplikasi` sebagai sumber nama aplikasi.
- Mempertahankan alias legacy `appName` dan `logo`.
- Menjaga pemisahan identity aplikasi dan identity sekolah.

Hasil

✅ `getAppInfo()` membaca konfigurasi melalui `getMasterSheetData("Pengaturan")`

✅ `namaAplikasi` membaca key `nama_aplikasi`

✅ Default `namaAplikasi` = `Administratif Guru`

✅ `appLongName` menggunakan nama universal tanpa nama sekolah

✅ `logoAplikasi`, `favicon`, dan `versiAplikasi` tersedia

✅ Alias legacy `appName` dan `logo` dipertahankan

✅ `getAppInfo()` dapat dipanggil tanpa session

✅ `getSchoolIdentity()` tidak diubah

✅ Consumer frontend belum diubah

✅ Micro-test `getAppInfo()` LOLOS

✅ Deploy Uji LOLOS

✅ Deploy Production LOLOS

Commit

`486eea4`

Catatan

Sprint ini hanya membangun fondasi reader identity aplikasi. Integrasi identity aplikasi ke login, sidebar, title, dan consumer branding lainnya dilakukan pada sprint berikutnya.

# Sprint 3A-3.3 — Application Identity Consumer Integration

Status

DONE

Target

Mengintegrasikan identity aplikasi ke consumer frontend secara bertahap tanpa mencampurkan identity aplikasi dengan identity sekolah.

Fokus

- Mengintegrasikan `nama_aplikasi` ke halaman Login.
- Menggunakan `getAppInfo()` sebagai reader identity aplikasi pre-login.
- Mempertahankan fallback branding existing.
- Tidak menggunakan `appLongName` sebagai tagline Login.
- Tidak mengubah kontrak `getAppInfo()`.

Hasil

✅ `nama_aplikasi` berhasil digunakan sebagai nama aplikasi pada Login

✅ Identity aplikasi tetap configurable per deployment

✅ Tagline Login tetap menggunakan branding statis existing

✅ Identity aplikasi dan tagline tidak tercampur

✅ Fallback branding tetap dipertahankan

✅ `getSchoolIdentity()` tidak digunakan pada Login

✅ `getAppInfo()` tetap dapat digunakan tanpa session

Validasi

✅ Syntax check LOLOS

✅ Deploy Uji LOLOS

✅ Login branding LOLOS

Commit

`dc07d64` — `feat(identity): integrate application name on login`

Catatan

Integrasi consumer lainnya seperti Sidebar, Title, dan branding frontend lainnya belum dilakukan dan tetap menjadi pekerjaan sprint berikutnya.


# Micro-Fix — Application Identity Freshness & Login Anti-Flash

Status

DONE

Target

Memastikan perubahan identity aplikasi terbaca secara fresh pada Login dan menghilangkan branding flash tanpa mengubah kontrak identity aplikasi.

Fokus

- Memastikan `getAppInfo()` tidak menggunakan Master Data cache untuk pembacaan identity aplikasi.
- Mempertahankan kontrak dan return object `getAppInfo()`.
- Menghilangkan flash branding lama pada Login.
- Mempertahankan fallback branding.
- Tidak mengubah consumer lain.
- Menghapus micro-test sementara setelah pengujian selesai.

Hasil

✅ `getAppInfo()` membaca Sheet `Pengaturan` secara langsung untuk kebutuhan freshness

✅ Perubahan manual `nama_aplikasi` terbaca tanpa menunggu TTL Master Data cache

✅ Kontrak `getAppInfo()` tetap dipertahankan

✅ Branding flash Login berhasil dihilangkan

✅ Fallback branding tetap dipertahankan

✅ `appLongName` tidak digunakan sebagai tagline Login

✅ `testGetAppInfo()` telah dihapus setelah pengujian

Validasi

✅ Deploy Uji LOLOS

✅ Freshness `nama_aplikasi` LOLOS

✅ Anti-flash Login LOLOS

✅ Fallback branding LOLOS

Commit

`6ee9aeb` — `fix(identity): refresh application branding`

Catatan

Micro-fix ini tidak mengubah `getSchoolIdentity()`, Master Data cache layer secara global, consumer lain, maupun kontrak `getAppInfo()`.


# Sprint 3A-3.4 — Configurable Application Branding

Status

DONE

Target

Menjadikan tagline/deskripsi aplikasi configurable melalui Sheet Pengaturan tanpa mengubah kontrak `getAppInfo()` dan tanpa menjadikan branding WONG sebagai default universal.

Fokus

- Menambahkan key `tagline_aplikasi` sebagai sumber `appLongName`.
- Fallback `appLongName` tetap `Aplikasi Administratif Guru Online` (universal).
- Mengaktifkan tagline Login dari `appLongName`.
- Mempertahankan fallback branding statis Login.
- Mempertahankan anti-flash branding Login yang sudah LOLOS.
- Tidak mengubah kontrak `getAppInfo()`.
- Tidak menyentuh consumer lain maupun modul frozen.

Hasil

✅ `tagline_aplikasi` menjadi sumber `appLongName` pada `getAppInfo()`

✅ Tagline Login kini configurable per deployment

✅ Fallback universal tetap dipertahankan, bukan "Website ONline Guru"

✅ Anti-flash branding Login tetap bekerja

✅ Freshness tagline terbaca langsung tanpa TTL cache

✅ Kontrak `getAppInfo()` tidak berubah

✅ `getSchoolIdentity()` dan identity sekolah tidak tersentuh

Validasi

✅ Syntax check LOLOS

✅ git diff --check LOLOS

✅ clasp push ke GAS Uji LOLOS

✅ Deploy Uji LOLOS

✅ Tagline configurable LOLOS

✅ Fallback tagline LOLOS

✅ Anti-flash LOLOS

✅ Login dan Dashboard tetap normal

Commit

`9b18dc3` — `feat(identity): make app tagline configurable`

Catatan

Key `tagline_aplikasi` ditambahkan manual pada Sheet Pengaturan per deployment. Consumer branding lainnya (Sidebar, Title) masih menjadi pekerjaan sprint berikutnya.
# Sprint 3A-3.5 — Application Identity Consumer: Sidebar & Title

Status

DONE

Target

Mengintegrasikan identity aplikasi ke Sidebar dan Title dengan satu consumer identity frontend bersama, tanpa RPC ganda dan tanpa mengubah kontrak backend.



Fokus

- Satu consumer `loadAppIdentity()` dengan cache client-side `cachedAppInfo` untuk Login, Sidebar, dan Title.
- Sidebar (logo, nama, tagline) dinamis dari identity aplikasi。
- `<title>` / `document.title` dinamis dari `namaAplikasi`。
- Anti-flash Login dan Sidebar dipertahankan; fallback branding statis tetap tampil bila RPC gagal/kosong。
- Tidak mengubah `getAppInfo()`, `getSchoolIdentity()`, auth/session, maupun consumer lain।



Hasil

✅ Login, Sidebar, dan Title memakai satu hasil `getAppInfo()` tanpa RPC ganda
✅ Sidebar (logo, nama, tagline) dinamis dari identity aplikasi
            
✅ `<title>` dinamis dari `namaAplikasi` dengan fallback statis
            
✅ Anti-flash Login dan Sidebar tetap bekerja
            
✅ Fallback branding tetap aman
            
Validasi

✅ Syntax check LOLOS
✅ clasp push ke GAS Uji LOLOS
✅ Deploy Uji Sidebar, Title, Login LOLOS



Commit

`58bc97e` — `feat(identity): complete branding consumers and school logo upload` (commit ini mencakup seluruh rangkaian 3A-3.5 sampai 3A-3.6-FIX-2)

Catatan

Consumer bersama ini menjadi fondasi konsumsi branding aplikasi pada Dashboard dan asset pada sprint berikutnya。


# Sprint 3A-3.6 — Application Branding Asset & Dashboard Consumer

Status

DONE

Target

Menambahkan resolver asset File ID → URL, mengintegrasikan logo aplikasi dinamis pada Login/Sidebar, dan menjadikan judul Dashboard dinamis tanpa menambah RPC identity。





Fokus

- Resolver `resolveDriveImageUrl()`: File ID di Sheet → URL image untuk `<img>` frontend (tanpa DriveApp saat render)。
- Derived field `logoAplikasiUrl` (`getAppInfo()`) dan `logoSekolahUrl` (`getSchoolIdentity()`)；File ID tetap satu-satunya nilai di Sheet。
- Logo Login/Sidebar dari `logoAplikasiUrl` dengan urutan prioritas: URL resolver → URL langsung → fallback statis via `onerror` (anti-loop)。
- Judul Dashboard `"Dashboard " + namaAplikasi` via `cachedAppInfo`(tanpa RPC tambahan)。
- Preview visual Logo Sekolah dan Logo Aplikasi pada Detail Pengaturan Sekolah。



Hasil

✅ Logo Login/Sidebar dinamis dari `logo_aplikasi`; kosong/invalid/unshared → fallback aman, bukan broken image
✅ Judul Dashboard dinamis tanpa RPC `getAppInfo()` ganda
✅ File ID tetap satu-satunya nilai asset di Sheet;kontrak tidak berubah
✅ Preview asset pada Detail Pengaturan Sekolah
            
Validasi

✅ Deploy Uji LOLOS(logo dinamis,fallback,judul Dashboard,preview asset)

Commit

`58bc97e` — commit sumber rangkaian 3A-3.5 sampai 3A-3.6-FIX-2

Catatan

Konsumen logo sekolah saat ini hanya detail Card Pengaturan Sekolah;tidak ada pemakaian logo sekolah pada login/sidebar/aplikasi。
# Micro-Fix — 3A-3.6-FIX-1 Dashboard Tagline Dinamis

Status

DONE

Target

Menjadikan subtitle Dashboard dinamis dari tagline aplikasi + nama sekolah tanpa RPC identity tambahan.



Fokus

- Komposisi `appLongName + " " + nama_sekolah` (`cachedAppInfo.appLongName` + identity sekolah dari `loadDashboardIdentity`).
- Fallback statis subtitle tetap dipertahankan.
- Tidak mengubah `getDashboardData()` maupun anti-flash yang sudah LOLOS.



Hasil

✅ Subtitle Dashboard dinamis dari `cachedAppInfo.appLongName` + nama sekolah
✅ Tanpa RPC `getAppInfo()` baru
✅ Fallback subtitle tetap aman

Validasi

✅ Deploy Uji LOLOS (subtitle dinamis, fallback, regression Dashboard)

Commit

`58bc97e` — commit sumber rangkaian 3A-3.5 sampai 3A-3.6-FIX-2

Catatan

Tidak ada RPC `getAppInfo()` tambahan pada Dashboard.



# Sprint 3A-3.6-FIX-2 — Penyempurnaan Card Pengaturan Sekolah + Upload Logo Sekolah

Status

DONE

Target

Memfokuskan Card Pengaturan Sekolah hanya pada identitas sekolah dan menyediakan upload logo sekolah yang profesional, aman, dan Admin-only.



Fokus

- Card Sekolah hanya: `nama_sekolah`, `kepala_sekolah`, `logo_sekolah`. `logo_aplikasi`/`favicon` tidak lagi diedit dari Card Sekolah dan menjadi domain Card Sistem (Sprint 4).
- Upload dua fase: pilih file → validasi client + preview lokal → konfirmasi Upload → backend Admin-only → validasi server-side (MIME/ekstensi/ukuran) → folder "Assets WONG MIT" (tepat satu, tidak dibuat otomatis) → sharing `ANYONE_WITH_LINK / VIEW` → File ID otomatis terisi → Simpan = commit.
- Format: JPG/JPEG/PNG; maksimal 2 MB; SVG ditolak pada versi ini.
- Replace/delete: file lama dihapus dari Drive HANYA setelah commit konfigurasi sukses; Sheet tidak pernah menunjuk file terhapus; Cancel anti-orphan; Hapus Gambar menangani pending upload dan pending deletion.
- Final patch: Login dan Sidebar menampilkan logo aplikasi dari `logo_aplikasi` (`logoAplikasiUrl`) secara dinamis dengan fallback `onerror`; boundary tetap via `getAppInfo()` (tanpa session).

Hasil

✅ `logo_aplikasi`/`favicon` di Sheet tetap utuh setelah Simpan Card Sekolah
✅ Tidak ada lagi `ReferenceError: updateValue is not defined` (helper `updateSettingValue()` top-level)
✅ Pemilihan file tidak memicu upload otomatis (upload hanya saat konfirmasi)
✅ File ID terisi setelah upload sukses; preview/detail sinkron
✅ Cancel/Hapus tidak meninggalkan orphan file
✅ Replace tidak pernah menunjuk Sheet ke file terhapus
✅ Logo Login/Sidebar dinamis dari `logo_aplikasi` dengan fallback aman

Validasi

✅ Syntax check LOLOS (backend + frontend)
✅ Deploy Uji LOLOS (upload dua fase, Hapus Kasus A/B, cancel anti-orphan, replace, fallback logo, regression)

Commit

`58bc97e` — `feat(identity): complete branding consumers and school logo upload`

Catatan

Sprint 4 Card Sistem akan menangani `nama_aplikasi`, `tagline_aplikasi`, `logo_aplikasi`, `favicon`, `versi_aplikasi`, `mode_maintenance`, Backup, Restore, dan Log Aktivitas; Card Tahun Ajaran/Proses Akademik juga masih menjadi agenda terpisah.
