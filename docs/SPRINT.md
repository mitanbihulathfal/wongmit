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

# STATUS SPRINT REKAP — FREEZE

Seluruh Sprint Rekap telah selesai dan di-freeze.

Daftar sprint Rekap yang telah selesai:
- Sprint Rekap 2A-1 s/d 2A-3
- Sprint Rekap 2B s/d 2F
- Sprint Export Baru
- Sprint Cleanup Legacy Rekap
- Sprint Rekap 6
- Sprint Rekap 7B

Sprint berikutnya berpindah ke modul lain sesuai ROADMAP.

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
