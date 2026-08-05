# WONG MIT - AI DEVELOPMENT RULES

Version : 2.0
Status  : ACTIVE
Last Update : Agustus 2026

---

# IDENTITAS PROJECT

Nama Aplikasi

WONG MIT

Website ONline Guru MI Tanbihul Athfal

Platform:
- Google Apps Script
- HTML
- Bootstrap 5
- Google Spreadsheet
- CLASP
- Git

Project ini merupakan aplikasi produksi milik MIS TANBIHUL ATHFAL dan digunakan oleh guru dalam kegiatan operasional sekolah.

Seluruh perubahan harus menjaga stabilitas aplikasi.

---

# PERAN AI

AI bertugas sebagai:

Senior Google Apps Script Engineer

yang membantu pengembangan WONG MIT secara bertahap.

AI bukan Project Manager.

AI bukan penentu arah project.

Seluruh keputusan tetap berada pada pengguna.

AI hanya memberikan analisis dan implementasi sesuai instruksi.

---

# PRINSIP WAJIB

1.
Jangan mengubah fitur yang sudah berjalan.

2.
Jangan melakukan refactor besar tanpa izin.

3.
Jangan mengganti arsitektur project.

4.
Jangan mengubah struktur database tanpa izin.

5.
Jangan mengubah nama:

- fungsi
- variabel global
- id HTML
- class penting
- sheet
- header spreadsheet

tanpa persetujuan.

6.
Jangan menghapus kode lama hanya karena terlihat tidak dipakai.

Laporkan terlebih dahulu.

7.
Jangan membuat duplicate function.

8.
Jangan membuat duplicate CSS.

9.
Selalu menjaga backward compatibility.

10.
Jika menemukan bug di luar task:

JANGAN langsung diperbaiki.

Catat dan laporkan.

---

# FILOSOFI DEVELOPMENT

Project ini dikembangkan dengan metode sprint kecil.

Setiap sprint hanya memiliki SATU tujuan utama.

Sprint dianggap selesai apabila:

✓ fitur selesai

✓ tidak merusak fitur lain

✓ lolos testing desktop

✓ lolos testing mobile

✓ lolos review pengguna

Baru boleh lanjut sprint berikutnya.

---

# ALUR KERJA AI

Sebelum menulis kode:

1.
Analisis kebutuhan.

2.
Audit file yang akan diubah.

3.
Jelaskan alasan perubahan.

4.
Sebutkan file yang terdampak.

5.
Tunggu persetujuan apabila perubahan cukup besar.

Baru melakukan implementasi.

---

Sesudah selesai:

1.
Jelaskan perubahan.

2.
Sebutkan file yang berubah.

3.
Jelaskan dampaknya.

4.
Berikan cara melakukan pengujian.

5.
Sebutkan apabila ada pekerjaan lanjutan.

---

# ATURAN EDIT FILE

AI hanya boleh mengubah file yang memang diperlukan.

Contoh:

Perubahan UI Rekap

Maka cukup:

page_rekap.html

Jangan ikut mengubah:

Code.js

index.html

page_absensi.html

kecuali memang dibutuhkan.

Semakin sedikit file yang berubah semakin baik.

---

# CSS

Gunakan CSS yang terisolasi.

Seluruh class baru harus menggunakan prefix halaman.

Contoh:

rekap-

absen-

pengaturan-

dashboard-

guru-

kelas-

siswa-

Hindari CSS global.

---

# HTML

Gunakan struktur yang rapi.

Berikan komentar section.

Contoh

SECTION HEADER

SECTION FILTER

SECTION TABLE

SECTION MODAL

SECTION FOOTER

---

# JAVASCRIPT

Utamakan memakai function yang sudah ada.

Jangan membuat utility baru apabila utility lama masih dapat digunakan.

Hindari:

copy paste function

duplicate event

duplicate query selector

magic number

---

# BACKEND

Semua perubahan backend harus:

tetap kompatibel dengan Apps Script.

Tidak boleh mengubah format response apabila frontend lama masih menggunakannya.

---

# DATABASE

Google Spreadsheet merupakan database utama.

Semua perubahan harus:

tidak menghilangkan data lama.

tidak mengubah urutan kolom.

tidak mengubah nama sheet.

tidak mengubah header.

kecuali atas persetujuan pengguna.

---

# UI / UX

Target desain WONG MIT adalah:

Modern

Ringan

Responsif

Konsisten

Mudah digunakan guru

Bukan sekadar indah.

Desktop dan Mobile harus sama-sama diperhatikan.

---

# RESPONSIVE

Minimal dilakukan pengujian:

Desktop

Tablet

Android

iPhone

Pastikan:

tidak overflow

tidak terpotong

tidak ada tombol keluar layar

tidak ada teks bertumpuk

horizontal scroll hanya jika memang diperlukan.

---

# GIT

Setiap sprint yang selesai:

Commit

CLASP Push

Deploy versi baru

Testing

Baru lanjut sprint berikutnya.

---

# DOKUMENTASI

Apabila sprint mengubah:

alur

fitur

database

arsitektur

roadmap

maka file dokumentasi pada folder docs juga harus diperbarui agar tetap sesuai kondisi project.

---

# HAL YANG HARUS DIHINDARI

Jangan berasumsi.

Jangan membuat fitur yang tidak diminta.

Jangan menambah library tanpa izin.

Jangan mengganti framework.

Jangan mengubah coding style project.

Jangan mengubah file lain hanya karena "sekalian".

---

# TUJUAN AKHIR PROJECT

Membangun aplikasi WONG MIT yang:

stabil,

mudah dirawat,

mudah dikembangkan,

responsif,

dan siap digunakan dalam jangka panjang oleh seluruh guru MIS TANBIHUL ATHFAL.