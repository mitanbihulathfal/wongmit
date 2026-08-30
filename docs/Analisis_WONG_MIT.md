# ANALISIS PROJECT WONG MIT

Versi : 2.0
Status : ACTIVE
Terakhir diperbarui : Agustus 2026

---

# GAMBARAN UMUM

WONG adalah singkatan dari:

Website ONline Guru.

WONG MIT adalah branding khusus deployment MIS Tanbihul Athfal:

Website ONline MI Tanbihul Athfal.

MIT merupakan identitas sekolah, bukan bagian dari kepanjangan WONG.

WONG MIT tidak ditetapkan sebagai nama universal untuk sekolah lain. Deployment sekolah lain dapat menggunakan nama aplikasi dan branding yang mereka pilih sendiri.

Secara arsitektur, WONG MIT dikembangkan agar fondasi aplikasinya dapat dikonfigurasi untuk berbagai sekolah.

Aplikasi dibangun menggunakan:

* Google Apps Script
* HTML
* Bootstrap 5
* Google Spreadsheet
* JavaScript Vanilla

Workflow pengembangan:

Google Apps Script
↓
CLASP
↓
Git
↓
AI Agent / Editor
↓
Apps Script

---

# TUJUAN PROJECT

Project ini dibuat untuk menjadi pusat aktivitas guru dalam satu aplikasi.

Target akhirnya adalah seluruh kebutuhan administrasi guru dapat dilakukan melalui WONG MIT tanpa harus membuka banyak Spreadsheet.

---

# VISI GLOBAL

WONG MIT dikembangkan bukan hanya sebagai aplikasi absensi.

Visi jangka panjangnya adalah menjadi platform pendukung aktivitas guru dan operasional sekolah yang ringan, stabil, dan dapat dikonfigurasi untuk deployment sekolah lain.

Ruang pengembangan global meliputi:

* Administrasi akademik
* Absensi
* Guru Mengajar
* Rekap dan Export
* Identitas dan Branding
* E-book mata pelajaran berbasis file PDF
* Pengelolaan dan pengingat PR
* Notifikasi guru
* Fitur pendukung operasional sekolah lainnya

Modul penilaian tidak direncanakan masuk ke WONG MIT karena kebutuhan penilaian telah ditangani oleh RDM.

---

# PRINSIP PENGEMBANGAN

Project dikembangkan secara bertahap menggunakan Sprint kecil.

Setiap Sprint hanya memiliki satu fokus utama.

Contoh:

Sprint Pengaturan

↓

Sprint Rekap

↓

Sprint Dashboard

↓

Sprint Absensi

↓

Sprint Guru Mengajar

↓

Sprint lainnya.

Tidak diperbolehkan mengerjakan banyak fitur besar sekaligus.

---

# FILOSOFI ARSITEKTUR

Aplikasi harus:

- ringan
- cepat
- sederhana
- mudah dirawat
- minim duplikasi
- reusable

Lebih mengutamakan kestabilan dibanding banyak fitur.

---

# FILOSOFI UI

Seluruh halaman harus memiliki karakter yang sama.

Prinsip UI:

✓ Modern

✓ Bersih

✓ Nyaman dibaca

✓ Mobile Friendly

✓ Desktop Friendly

✓ Konsisten

Setiap halaman harus memiliki:

Header

↓

Filter

↓

Action

↓

Summary

↓

Data

↓

Empty State

↓

Loading

↓

Export

↓

Notifikasi

---

# FILOSOFI UX

Guru bukan pengguna teknis.

Karena itu seluruh halaman harus:

sesedikit mungkin membingungkan.

Setiap aksi penting harus jelas.

Contoh:

Klik Tampilkan

↓

Loading

↓

Hasil muncul

↓

Export

Alur harus sederhana.

---

# GLOBAL LOADER

Project akan menggunakan satu konsep Global Loader.

Loading kecil:

- Simpan
- Edit
- Tambah
- Hapus

tetap menggunakan loading tombol.

Loading besar:

- Rekap
- Export
- Import
- Backup
- Restore
- Sinkronisasi
- Tahun Ajaran

menggunakan Global Loader WONG MIT.

Konsep:

Glass

Blur

Logo WONG MIT

Animasi modern

Tulisan:

WONG MIT

Sedang memproses data...

Mohon tunggu sebentar...

Halaman Rekap menjadi pondasi pertama sebelum Global Loader diterapkan ke halaman lain.

---

# REKAP ABSENSI

Halaman Rekap merupakan salah satu halaman paling penting.

Target akhirnya adalah satu engine rekap yang dapat digunakan oleh seluruh role.

Filter utama:

- Periode
- Guru
- Kelas
- Mapel

Tidak ada lagi pemisahan:

Rekap Guru

Rekap Wali

Rekap Umum

Seluruhnya menggunakan satu engine.

---

Progress UI Rekap Modern (Agustus 2026)

✅ Sprint 2A
- Modern Responsive Layout
- Empty State
- Loading Skeleton

✅ Sprint 2B
- Penyempurnaan Engine Rekap
- Integrasi Backend
- Penyempurnaan Export

✅ Sprint 2C
- Summary Card Dinamis

✅ Sprint 2D
- Sticky Header pada tabel

✅ Sprint 2E
- Badge Keterangan Dinamis

---

# SMART FILTER

Urutan filter:

Periode

↓

Guru

↓

Kelas

↓

Mapel

Relasi:

Guru

↓

Kelas yang diajar

↓

Mapel yang diajar

Dropdown berikutnya selalu mengikuti pilihan sebelumnya.

---

# EXPORT

Export tidak boleh menghitung ulang.

Flow yang digunakan:

Klik Tampilkan

↓

Engine menghitung

↓

Data disimpan di JavaScript Memory

↓

Export menggunakan data yang sudah tersedia

Tujuannya agar Export jauh lebih cepat.

---

# RESPONSIVE

Desktop menjadi prioritas utama.

Mobile harus memiliki pengalaman yang setara.

Target:

Tidak ada tombol keluar layar.

Tidak ada overflow.

Horizontal scroll hanya untuk tabel.

---

# CSS

Seluruh CSS baru menggunakan prefix halaman.

Contoh:

rekap-

pengaturan-

dashboard-

absen-

guru-

kelas-

siswa-

Tidak menggunakan CSS global kecuali benar-benar diperlukan.

---

# MAINTAINABILITY

Project dipersiapkan untuk jangka panjang.

Karena itu:

fungsi reusable lebih diutamakan.

duplikasi harus dihindari.

refactor besar hanya dilakukan apabila benar-benar diperlukan.

---

# PENGUJIAN

Setiap Sprint minimal melalui tahapan:

Audit

↓

Implementasi

↓

Visual Preview

↓

Testing Desktop

↓

Testing Mobile

↓

Review

↓

LOLOS

Baru boleh masuk Sprint berikutnya.

---

# CATATAN

Seluruh isi dokumen ini merupakan arah pengembangan resmi WONG MIT.

Dokumen ini menjadi acuan utama seluruh AI (ChatGPT, TRAE, maupun Agent AI lainnya).

AI wajib membaca dokumen ini sebelum melakukan audit ataupun implementasi fitur baru.

Apabila terdapat keputusan baru pada Sprint berikutnya, dokumen ini harus diperbarui agar tetap menjadi acuan utama bagi seluruh AI yang membantu pengembangan project.