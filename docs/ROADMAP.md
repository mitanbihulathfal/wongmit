# ROADMAP

Roadmap resmi pengembangan WONG MIT.

Dokumen ini hanya berisi target besar proyek.

Detail teknis sprint terdapat pada SPRINT.md.

---

# FASE 1

FOUNDATION

Status

ACTIVE

Meliputi

- Dashboard
- Data Guru
- Data Siswa
- Data Kelas
- Relasi Guru Kelas
- Guru Mengajar
- Pengaturan

---

# CHECKPOINT — SPRINT 2F

Status

🟢 SELESAI & TERUJI

Target

Menjadikan `Pengaturan.hari_libur` sebagai Single Source of Truth untuk kalender sekolah dan mengintegrasikannya secara aman ke konsumen Guru Mengajar dan Absensi.

Hasil

- ✅ Kontrak nama hari distandarkan menggunakan `Ahad` sebagai istilah aplikasi untuk Sunday/Minggu.
- ✅ `getWeekDays()` menjadi sumber tunggal 7 hari standar aplikasi.
- ✅ Dropdown Hari Guru Mengajar tidak lagi hardcode.
- ✅ Template Excel Guru Mengajar tidak lagi hardcode.
- ✅ Validasi backend Guru Mengajar menggunakan kontrak hari standar.
- ✅ Dashboard menggunakan kontrak hari standar.
- ✅ Absensi mengenali hari libur dari `Pengaturan.hari_libur`.
- ✅ Guru mendapat peringatan jika tanggal yang dipilih tidak sesuai jadwal mengajarnya.
- ✅ Hari libur + tidak ada jadwal Guru menghasilkan peringatan gabungan, tetapi Absensi tetap dapat dilanjutkan.
- ✅ Admin dan Kepala Sekolah tidak terkena peringatan jadwal Guru.
- ✅ Popup peringatan diperbaiki agar tidak muncul ganda dan tidak meninggalkan overlay.
- ✅ Regression test dan integration test di GAS UJI LOLOS.
- ✅ Source production kemudian dideploy setelah seluruh pengujian dinyatakan LOLOS.

Catatan Arsitektur

Hari libur adalah kalender sekolah, bukan larangan universal seluruh aktivitas. Arsitektur ini tetap membuka jalan untuk kegiatan Ekstrakurikuler yang nantinya dapat memiliki jadwal aktivitas sendiri, termasuk pada hari libur sekolah.

---

# FASE 2

ABSENSI

Status

SELESAI

Meliputi

- Absensi Harian
- Revisi Absensi
- Pondasi Rekap

---

# FASE 3

REKAP MODERN

Status

🔒 FROZEN

Progress

✅ Sprint Rekap 2A
Modern Responsive Layout

✅ Sprint Rekap 2B
Backend Rekap Modern

✅ Sprint Rekap 2C
Summary Card

✅ Sprint Rekap 2D
Sticky Header

✅ Sprint Rekap 2E
Badge Keterangan

✅ Sprint Rekap 2F
Interactive Table
(Sorting Header)

✅ Sprint Rekap 6
Optimasi Performa Engine Rekap

✅ Sprint Rekap 7B
Implementasi UX Halaman Rekap

---

# FASE 4

EXPORT

🔒 FROZEN

Progress

✅ Sprint Export Baru
Export Rekap berbasis JavaScript Memory

✅ Penyempurnaan Format Export

Target

- Export Excel
- Export Rekap
- Penyempurnaan Format

---

# STATUS REKAP — FREEZE

Seluruh Sprint Rekap telah selesai dan di-freeze.

Modul Rekap tidak lagi dikembangkan kecuali ditemukan bug nyata.

Roadmap aktif berikutnya:

1. Pengaturan
2. Dashboard
3. Penyempurnaan modul produksi lainnya

---

# FASE 5

OPTIMIZATION

Status

🟢 ACTIVE — P1–P3 SELESAI & TERUJI

Target

- Optimasi Backend
- Optimasi Database
- Optimasi Loading
- Optimasi Responsive

Progress

✅ P1 — Batch Write Absensi
- `saveAttendance()` dioptimalkan menjadi batch write.
- Data satu kelas ditulis sebagai array 2D menggunakan operasi batch.
- Regression test di GAS UJI LOLOS.

✅ P2 — Batch Update/Revisi Absensi
- `reviseAttendance()` dioptimalkan agar tidak lagi menghapus dan menulis record siswa satu per satu.
- Perubahan revisi diproses secara batch dengan jumlah record tetap terjaga.
- ID Relasi, Hari, Mapel, Timestamp, dan status siswa tetap benar.
- Regression test di GAS UJI LOLOS.

✅ P3 — Dashboard Memory Lookup
- Pembacaan Spreadsheet Dashboard dikurangi ke data yang diperlukan.
- Lookup Guru/Kelas/Guru Mengajar diproses di memory menggunakan `Map`.
- Pembacaan Absensi Dashboard dibatasi pada kolom yang diperlukan.
- Perhitungan tanggal tidak lagi menggunakan `Utilities.formatDate()` untuk setiap baris Absensi.
- Card `Diabsen` tetap menggunakan lazy-load dan backend-nya dioptimalkan.
- Runtime test di GAS UJI LOLOS.

Checkpoint

🟢 P1–P3 CLOSED & PRODUCTION DEPLOYED

Commit source

`12d1a39` — `perf: optimize attendance and dashboard read write`

Next

🔄 P4 — Batch Read / Page Data

Fokus berikutnya adalah audit dan optimasi batch read pada dropdown, Data Siswa, serta jalur page data lain yang memang terbukti membutuhkan optimasi. Perubahan tetap incremental, mempertahankan business logic, dan diterapkan setelah audit serta regression test.

---

# FASE 6

RELEASE CANDIDATE

Belum dimulai

Target

- Audit UI
- Audit Backend
- Audit Database
- Audit Security

---

# FASE 7

STABLE VERSION

Target

WONG MIT v1.0 Stable

Siap digunakan sebagai aplikasi operasional sekolah.

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
