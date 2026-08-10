# CHANGELOG

Seluruh perubahan proyek WONG MIT dicatat pada dokumen ini.

Prinsip:

- Hanya perubahan yang benar-benar selesai yang dicatat.
- Setiap perubahan harus sudah melalui testing.
- Setiap perubahan harus memiliki Git Commit.
- Jangan mencatat rencana atau ide ke CHANGELOG.

---

# FORMAT

Tanggal

Sprint

Judul

Perubahan

Status

Commit

Catatan

---

# RIWAYAT

## 2026-08-10

### Sprint DS.4 — Data Siswa Access & Export Stabilization

Judul

Data Siswa — Access & Export Stabilization

Perubahan

- Menghapus tombol/fitur duplikasi Tambah Siswa Manual.
- Tambah Siswa Manual dan Import Massal kini hanya dapat diakses oleh Admin dan Kepala Sekolah.
- Edit dan Hapus Siswa kini hanya dapat diakses oleh Admin dan Kepala Sekolah.
- Halaman Data Siswa kini dapat diakses oleh seluruh role (Admin, Kepala Sekolah, Wali Kelas, Guru Mapel).
- Menambahkan Download Data Siswa Excel dan PDF yang tersedia untuk seluruh role.
- Menambahkan modal Download Data Siswa dengan filter kelas (Semua Kelas atau per kelas).
- Menambahkan permission check pada backend `addStudent()`, `updateStudent()`, dan `deleteStudent()`.
- Menambahkan utility backend `exportSpreadsheetAsPdf()`, `getNamaBySession()`, `buildSiswaExportSheet()`, `exportSiswaExcel()`, dan `exportSiswaPdf()`.
- Menambahkan library client-side `xlsx-js-style`, `jspdf`, dan `jspdf-autotable` untuk export Excel/PDF.
- Memperbarui logo aplikasi.

Status

SELESAI

Commit

Belum dilakukan (commit belum dibuat).

Catatan

- Perubahan diverifikasi melalui audit `git diff`.
- `git diff --check` menemukan trailing whitespace pada `index.html` baris 4262, 4265, dan 4581; tidak diperbaiki pada sesi dokumentasi karena source code DS.4 tidak boleh disentuh.
- Permission backend menggunakan `checkRole()` yang sudah ada.
- Caller frontend `addStudent()`, `updateStudent()`, `deleteStudent()` telah mengirim `sessionId`.
- Download Excel/PDF dilakukan client-side sehingga tersedia untuk seluruh role.

---

## 2026-08-08

### Sprint Guru Mengajar — UX Polish

Judul

UX Polish Halaman Guru Mengajar

Perubahan

- Menggabungkan struktur panel menjadi satu card utuh untuk masing-masing panel (Daftar Mata Pelajaran dan Guru Mengajar), menghilangkan kotak/ruang putih kosong saat collapse.
- Panel Daftar Mata Pelajaran dan Guru Mengajar kini default CLOSED.
- Menambahkan padding internal konsisten pada header dan body panel sehingga judul/deskripsi dan search box tidak menempel ke tepi.
- Polish visual ringan: tombol collapse, search input, spacing, border/radius, warna soft, hover/focus, dan responsivitas desktop/mobile.
- ID penting dipertahankan: `tableMapel`, `tableGuruMengajar`, `guruMapelBody`, `guruGuruMengajarBody`, `guruSearchMapel`, `guruSearchGuruMengajar`.
- Search client-side `filterMapel()` dan `filterGuruMengajar()` tetap berjalan tanpa perubahan.

Status

SELESAI

Commit

Sprint Guru Mengajar : UX Polish

Catatan

- Runtime test desktop dan mobile LOLOS.
- node --check Code.js LOLOS.
- git diff --check LOLOS.

---

## 2026-08-08

### Sprint Guru Mengajar — UX Panel & Search

Judul

UX Panel & Search Halaman Guru Mengajar

Perubahan

- Menambahkan collapse/expand pada panel Daftar Mata Pelajaran dan panel Guru Mengajar menggunakan Bootstrap 5 Collapse.
- Menambahkan search client-side untuk tabel `#tableMapel` melalui function `filterMapel()`.
- Menambahkan search client-side untuk tabel `#tableGuruMengajar` melalui function `filterGuruMengajar()`.
- Search dilakukan sepenuhnya client-side tanpa memanggil backend.
- Menambahkan rotasi icon chevron saat panel collapse/expand.
- Menambahkan `aria-expanded` dan `aria-controls` pada tombol toggle untuk aksesibilitas.

Status

SELESAI

Commit

Sprint Guru Mengajar : UX Panel & Search

Catatan

- Runtime test desktop dan mobile LOLOS.
- node --check Code.js LOLOS.
- git diff --check LOLOS.

---

## 2026-08-08

### Bugfix Template Guru Mengajar

Judul

Perbaikan Template Guru Mengajar — Kolom Mapel di Sheet Referensi

Perubahan

- Pada `downloadTemplateGuruMengajar()`, kolom `Mapel` pada sheet `Referensi` Excel template sebelumnya memiliki rentang kosong sampai baris 8 karena penggunaan `getLastRow() + 1` yang tidak konsisten.
- Diganti dengan penghitung baris eksplisit (`barisMapel`, dimulai dari 2 dan di-increment per baris) sehingga daftar mapel langsung tersusun berurutan setelah header.
- Template Excel kini tidak lagi mengandung rentang kosong pada kolom Mapel.

Status

SELESAI

Commit

Bugfix Template Guru Mengajar

Catatan

- Bug terkonfirmasi melalui `git diff Code.js` pada fungsi `downloadTemplateGuruMengajar()`.
- Perubahan hanya pada fungsi tersebut; tidak mengubah arsitektur, modul lain, atau engine Rekap.
- Testing di Apps Script LOLOS.
- git diff --check LOLOS.

---

## 2026-08-08

### Pasca Freeze Rekap

Judul

Freeze Modul Rekap

Perubahan

- Sprint Rekap 6 (Optimasi Performa) telah selesai.
- Sprint Rekap 7B (UX) telah selesai.
- Seluruh Sprint Rekap telah di-freeze dan modul Rekap tidak lagi dikembangkan kecuali ditemukan bug nyata.
- Halaman "Relasi Guru Kelas" telah dihapus dari project karena sudah tidak digunakan.
- Roadmap aktif berpindah ke: Pengaturan, Dashboard, dan penyempurnaan modul produksi lainnya.

Status

SELESAI

Commit

Pasca Freeze Rekap

---

## 2026-08-07

### Sprint Rekap 7B

Judul

Implementasi UX Halaman Rekap

Perubahan

- Menambahkan validasi periode pada `tampilkanRekap()` (tanggal awal tidak boleh lebih besar dari tanggal akhir).
- Menampilkan empty state yang lebih informatif saat tidak ada data pada periode dan filter yang dipilih.
- Mengubah teks loading tombol Export menjadi "Menyiapkan Excel...".
- Menambahkan toast sukses "Export berhasil." setelah export selesai.
- Menambahkan `aria-live="polite"` pada tabel hasil rekap.
- Menambahkan petunjuk scroll horizontal pada mobile ("Geser tabel untuk melihat kolom lainnya.").
- Menambahkan animasi fade-in ringan saat tabel rekap selesai dirender.

Status

SELESAI

Commit

Sprint Rekap 7B : Implementasi UX Halaman Rekap

Catatan

- Diagnostics LOLOS.
- git diff --check LOLOS.
- Testing Desktop LOLOS.
- Testing Mobile LOLOS.
- Review Pengguna LOLOS.

---

## 2026-08-07

### Sprint Rekap 6

Judul

Optimasi Performa Engine Rekap

Perubahan

- Menghilangkan duplikasi pemanggilan `getFilteredGuruMengajar()` pada pipeline Rekap.
- Menambahkan fungsi internal `getDataRekapRaw()` yang mengembalikan array langsung.
- Mengoptimalkan `mergeDataRekap()` menggunakan lookup berbasis `Map` (nisn → daftar absensi).
- Menggunakan `Set` untuk lookup filter kelas dan relasi.
- Mengoptimalkan `renderRekapTable()` menggunakan `join("")` tanpa `innerHTML +=` di dalam loop.
- Kompleksitas merge turun dari O(n×m) menjadi O(n+m).
- Output Rekap, filtering, sorting, summary, dan export tetap identik.

Status

SELESAI

Commit

Sprint Rekap 6 : Optimasi Performa Engine Rekap

Catatan

- Diagnostics LOLOS.
- git diff --check LOLOS.
- Testing Desktop LOLOS.
- Testing Mobile LOLOS.
- Review Pengguna LOLOS.

---

## 2026-08-07

### Sprint Cleanup Legacy Rekap

Judul

Cleanup Legacy Rekap

Perubahan

- Menghapus wrapper `getRekapUmum()`, `getRekapGuru()`, dan `getRekapWali()` yang tidak memiliki caller internal.
- Menghapus parameter `mode` pada `getRekapFinal()`.
- Menghapus blok normalisasi compatibility `mode` pada `getRekapFinal()`.
- Engine Rekap kini hanya menggunakan satu jalur: `getRekapFinal() → mergeDataRekap() → getDataRekap() → hitungRekap()`.
- Tidak ada perubahan perilaku runtime, hanya pembersihan legacy code.

Status

SELESAI

Commit

Sprint Cleanup Legacy Rekap

Catatan

- Diagnostics LOLOS.
- git diff --check LOLOS.
- Global search memastikan `getRekapUmum`, `getRekapGuru`, `getRekapWali`, dan parameter `mode` sudah hilang.

---

## 2026-08-06

### Sprint Rekap 2F

Judul

Interactive Table Client-side Sorting

Perubahan

- Menambahkan sorting pada header kolom Nama Siswa, KLS, H, S, I, A, %, dan Ket.
- Klik pertama mengurutkan data secara Ascending.
- Klik kedua mengurutkan data secara Descending.
- Menambahkan indikator Icon Sort pada header kolom aktif.
- Sorting dilakukan sepenuhnya secara client-side menggunakan data Rekap yang sudah tampil.
- Sorting tidak memanggil backend dan tidak menghitung ulang Rekap.

Status

SELESAI

Commit

Sprint Rekap 2F : Interactive Table Client-side Sorting

Catatan

- Review Pengguna LOLOS.
- Testing Desktop LOLOS.
- Testing Mobile LOLOS.
- CLASP Push dan Deploy selesai.

---

## 2026-08-06

### Sprint Rekap 2C

Judul

Summary Card Dinamis

Perubahan

- Menambahkan Summary Card dinamis di atas tabel Rekap.
- Menampilkan Total Siswa.
- Menampilkan jumlah kategori Sempurna.
- Menampilkan jumlah kategori Perlu Perhatian.
- Menampilkan rata-rata persentase kehadiran.
- Summary dirender secara client-side setelah data Rekap diterima.

Status

SELESAI

Commit

Sprint Rekap 2C : Dynamic Summary Card

---

## 2026-08-06

### Sprint Rekap 2D

Judul

Sticky Header Tabel

Perubahan

- Header tabel tetap terlihat saat scroll vertikal.
- Menambahkan area scroll vertikal pada wrapper tabel.
- Tetap kompatibel dengan responsive desktop dan mobile.

Status

SELESAI

Commit

Sprint Rekap 2D : Sticky Header

---

## 2026-08-06

### Sprint Rekap 2E

Judul

Dynamic Badge Keterangan

Perubahan

- Menambahkan badge dinamis berdasarkan nilai Keterangan.
- Badge mengikuti kategori hasil Rekap.
- Badge terintegrasi dengan render tabel tanpa mengubah backend.

Status

SELESAI

Commit

Sprint Rekap 2E : Dynamic Badge

## 2026-08-05

### Sprint Rekap 2B

Judul

Refactor Engine Rekap Berbasis Filter dan Bugfix Export

Perubahan

- Menghapus dependency radio mode pada Rekap.
- Menjaga engine Rekap tetap satu jalur: getDataRekap -> mergeDataRekap -> hitungRekap -> getRekapFinal.
- Menyiapkan filter Mapel dari data GuruMengajar.
- Menjaga export backend tetap kompatibel dengan filter Rekap.
- Memastikan nilai Semester pada export selalu berasal dari function getSemesterExport().
- Merapikan lebar kolom header Excel agar Periode dan Tanggal Export tidak terpotong.

Status

SELESAI

Commit

Sprint Rekap 2B : Refactor Filter Engine and Export Header Bugfix

---

## 2026-08-05

### Sprint Rekap 2A-1

Judul

Pondasi Modernisasi Halaman Rekap

Perubahan

- Mulai membangun ulang tampilan Rekap Absensi.
- Menambahkan struktur halaman baru.
- Memisahkan section Header, Filter, dan Hasil Rekap.
- Menyiapkan Design Token lokal.
- Menyiapkan Empty State.
- Menyiapkan Loading Skeleton.

Status

SELESAI

Commit

Sprint Rekap 2A-1

---

## 2026-08-05

### Sprint Rekap 2A-2

Judul

Modern Responsive UI

Perubahan

- Responsive Desktop.
- Responsive Mobile.
- Modern Filter Card.
- Modern Button.
- Summary Card Foundation.
- Loading Skeleton.
- Empty State.
- Table Modern.
- Horizontal Scroll Mobile.
- Accessibility.

Status

SELESAI

Commit

Sprint Rekap 2A-2 : Modernize Rekap UI and Responsive Layout

---

## 2026-08-05

### Sprint Rekap 2A-3

Judul

Final UI Polish

Perubahan

- Penyempurnaan spacing.
- Penyempurnaan responsive mobile.
- Penyempurnaan alignment header tabel.
- Penyempurnaan Empty State.
- Penyempurnaan horizontal scroll.
- Penyempurnaan Filter Card.
- Penyempurnaan Section Header.
- Penyempurnaan visual consistency.

Status

SELESAI

Commit

Sprint Rekap 2A-3 : Final UI Polish

---

Perubahan berikutnya akan ditambahkan di bawah tanpa mengubah histori sebelumnya.
