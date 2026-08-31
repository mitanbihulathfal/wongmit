# WONG MIT - DATABASE

Versi : 2.0
Status : ACTIVE
Last Update : Agustus 2026

---

# TUJUAN

Dokumen ini menjelaskan aturan penggunaan database pada aplikasi WONG MIT.

Database utama aplikasi adalah Google Spreadsheet.

Seluruh data permanen aplikasi disimpan pada Spreadsheet.

---

# PRINSIP DATABASE

Google Spreadsheet merupakan:

Single Source of Truth

Artinya:

Semua data resmi berasal dari Spreadsheet.

Frontend hanya menampilkan data.

Backend bertugas membaca dan menulis data.

Frontend tidak boleh menjadi penyimpanan data permanen.

---

# STRUKTUR DATABASE

Database menggunakan beberapa Sheet utama.

Contoh:

- Pengaturan
- Session
- Guru
- GuruMengajar
- Mapel
- Kelas
- Siswa
- Absensi
- Log

Apabila di masa depan terdapat penambahan Sheet baru, dokumen ini harus diperbarui.

---

# SHEET PENGATURAN

Sheet `Pengaturan` menggunakan struktur:

`Key | Value`

Sheet ini merupakan konfigurasi utama aplikasi dan sekolah pada deployment masing-masing.

## IDENTITAS SEKOLAH

Key:

* `nama_sekolah`
* `kepala_sekolah`
* `logo_sekolah`

## STATUS IDENTITY APLIKASI

Identity aplikasi saat ini dibaca oleh `getAppInfo()`.

Key:

* `nama_aplikasi` → `namaAplikasi`
* `tagline_aplikasi` → `appLongName`
* `logo_aplikasi` → `logoAplikasi`
* `favicon` → `favicon`
* `versi_aplikasi` → `versiAplikasi`

`getAppInfo()` dapat dipanggil tanpa session karena identity aplikasi diperlukan untuk kebutuhan pre-login.

Alias legacy `appName` dan `logo` masih dipertahankan pada response `getAppInfo()` untuk backward compatibility.

`nama_aplikasi` merupakan key aktif untuk menyimpan nama aplikasi yang dapat dikonfigurasi pada deployment masing-masing.

## SISTEM

Key:

* `mode_maintenance`

Key ini tersedia pada database tetapi belum menjadi consumer aktif sampai Sprint Pengaturan Sistem selesai.

## AKADEMIK

Key:

* `tahun_ajaran`
* `semester`
* `hari_libur`

## ATURAN IDENTITY

`logo_aplikasi` dan `favicon` adalah identitas aplikasi.

`logo_sekolah` adalah identitas sekolah.

Jangan mencampurkan ownership key antar-kontrak backend.

Penambahan key baru harus tetap menggunakan struktur `Key | Value` dan tidak mengubah header atau struktur kolom.

---

# ATURAN SHEET

AI tidak boleh:

Mengubah nama Sheet.

Menghapus Sheet.

Menukar fungsi antar Sheet.

Membuat Sheet baru.

Kecuali atas persetujuan pengguna.

---

# ATURAN HEADER

Header Spreadsheet dianggap sebagai kontrak data.

AI tidak boleh:

Mengubah nama kolom.

Menghapus kolom.

Memindahkan urutan kolom.

Mengganti format header.

Kecuali telah disetujui.

---

# BACKWARD COMPATIBILITY

Setiap perubahan harus menjaga kompatibilitas dengan data lama.

Perubahan baru tidak boleh menyebabkan:

data lama gagal dibaca,

rekap rusak,

export gagal,

atau fitur lain berhenti bekerja.

---

# PEMBACAAN DATA

Prinsip utama:

Sekali baca,

gunakan kembali hasilnya,

hindari pembacaan Spreadsheet berulang apabila data yang sama masih dapat digunakan.

Optimasi dilakukan tanpa mengubah hasil perhitungan.

---

# PENULISAN DATA

Setiap penulisan data harus:

valid,

lengkap,

konsisten,

tidak menyebabkan data ganda.

Apabila diperlukan validasi, lakukan sebelum proses penulisan.

---

# ID DATA

ID yang sudah digunakan sebagai identitas data tidak boleh diubah.

Contoh:

ID Guru

ID Siswa

ID Kelas

dan identitas permanen lainnya.

---

# FORMAT DATA

AI tidak boleh mengubah format penyimpanan data tanpa izin.

Contoh:

Tanggal

Boolean

Nomor

Status

Kode

harus tetap mengikuti format yang sudah digunakan aplikasi.

---

# REKAP

Halaman Rekap hanya membaca data.

Rekap bukan sumber data.

Rekap merupakan hasil olahan dari data yang ada di Spreadsheet.

---

# EXPORT

Export menggunakan hasil perhitungan yang telah tersedia.

Spreadsheet tidak boleh dijadikan tempat penyimpanan sementara hanya untuk kebutuhan Export.

---

# AUDIT DATABASE

Sebelum melakukan perubahan yang berkaitan dengan Spreadsheet, AI wajib:

1.
Mengidentifikasi Sheet yang terdampak.

2.
Mengidentifikasi kolom yang digunakan.

3.
Memastikan perubahan tidak merusak fitur lain.

Baru kemudian melakukan implementasi.

---

# LARANGAN

AI tidak boleh:

- Menghapus data pengguna.
- Mengubah struktur database.
- Mengganti nama Sheet.
- Mengubah header.
- Membuat migrasi data.
- Mengubah format penyimpanan.

kecuali atas persetujuan pengguna.

---

# TUJUAN AKHIR

Database WONG MIT harus:

✓ Stabil

✓ Konsisten

✓ Mudah dipelihara

✓ Aman

✓ Mendukung pengembangan jangka panjang

tanpa mengorbankan kompatibilitas dengan data yang sudah ada.