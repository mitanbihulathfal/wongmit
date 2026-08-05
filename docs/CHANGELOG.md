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
