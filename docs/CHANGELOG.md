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
