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

## 2026-09-01

### Sprint 3A-3.5 — Application Identity Consumer: Sidebar & Title

**Judul**
Sidebar, Title, dan Login Menggunakan Satu Consumer Identity Aplikasi

**Perubahan**
- Menambahkan satu consumer identity frontend bersama: `loadAppIdentity()` dengan cache client-side `cachedAppInfo` agar Login, Sidebar, dan Title memakai satu hasil `getAppInfo()` tanpa RPC ganda.
- Menambahkan ID branding pada elemen Sidebar(`sidebarAppLogo`, `sidebarAppName`, `sidebarAppTagline`).
- Sidebar (logo, nama, tagline) kini dinamis dari identity aplikasi.
- `<title>`/`document.title` kini dinamis dari `namaAplikasi`(fallback statis tetap dipertahankan. - Login direfactor sejauh kebutuhan untuk memakai consumer identity bersama, tanpa mengubah behavior login/auth/session.
- Anti-flash branding Login dan Sidebar dipertahankan; fallback branding statis tetap tampil bila RPC gagal/kosong。
- Logo diterapkan hanya bila nilai berupa URL langsung; File ID mentah tidak dipaksa menjadi URL(pada tahap ini)。

**Status**
SELESAI

**Commit**
`58bc97e`

**Validasi**
- Syntax check LOLOS.
- clasp push ke GAS Uji LOLOS。
- Deploy Uji Sidebar/Title/Login LOLOS。

**Catatan**
Consumer identity bersama ini menjadi fondasi konsumsi branding aplikasi pada Dashboard dan asset pada sprint berikutnya。

### Sprint 3A-3.6 — Application Branding Asset & Dashboard Consumer

**Judul**
Asset Resolver, Logo Aplikasi Dinamis, dan Dashboard Consumer

**Perubahan**
- Menambahkan resolver asset `resolveDriveImageUrl()`∶mengubah File ID di Sheet menjadi URL image yang dapat dikonsumsi `<img>` frontend(tanpa DriveApp saat render;string helper saja)。
- Menambahkan derived field:`logoAplikasiUrl` pada `getAppInfo()` dan `logoSekolahUrl` pada `getSchoolIdentity()`; File ID tetap satu-satunya nilai yang disimpan di Sheet;kontrak File ID tidak berubah。
- Logo Login dan Sidebar kini menampilkan `logoAplikasiUrl` secara dinamis, dengan urutan prioritas:URL resolver → URL langsung dari kontrak lama → fallback statis via `onerror`(dinetralkan setelah terpicu agar tidak loop)。
- Logo aplikasi yang kosong/invalid/tidak di-share → fallback aman, bukan broken image。
- Dashboard: judul kini dinamis `"Dashboard " + namaAplikasi`(via `cachedAppInfo`,tanpa RPC `getAppInfo()` tambahan)。
- Detail Pengaturan Sekolah menampilkan preview visual Logo Sekolah dan Logo Aplikasi di atas daftar field(File ID tetap tampil sebagai teks);state aman bila asset kosong。

**Status**
SELESAI

**Commit**
`58bc97e`

**Validasi**
- Deploy Uji LOLOS(logo aplikasi dinamis,fallback onerror,judul Dashboard,preview asset Pengaturan)。

**Catatan**
Pemakaian logo sekolah pada konteks aplikasi tidak dilakukan;konsumen logo sekolah saat ini hanya detail Card Pengaturan Sekolah。
Preview Logo Aplikasi pada Card Sekolah merupakan kondisi sementara sebelum penyempurnaan 3A-3.6-FIX-2.

### 3A-3.6-FIX-1 — Dashboard Tagline Dinamis

**Judul**
Subtitle Dashboard Dinamis dari Tagline Aplikasi + Nama Sekolah

**Perubahan**
- Subtitle Dashboard kini memakai komposisi `appLongName + " " + nama_sekolah`(`cachedAppInfo.appLongName` + identity sekolah dari `loadDashboardIdentity`),menggantikan prefix hardcode "Website ONline Guru"。 - Tanpa RPC `getAppInfo()` baru — cukup membaca cache client-side yang sudah terisi sebelum Dashboard dibuka。
- Fallback statis subtitle tetap dipertahankan bila identity kosong/gagal。
- Mekanisme anti-flash yang sudah LOLOS tidak diubah;`getDashboardData()` tidak tersentuh。

**Status**
SELESAI

**Commit**
`58bc97e`

**Validasi**
- Deploy Uji LOLOS(subtitle dinamis,fallback,regression Dashboard)。

**Catatan**
- Tidak ada RPC `getAppInfo()` tambahan pada Dashboard。

### Sprint 3A-3.6-FIX-2 — Penyempurnaan Card Pengaturan Sekolah + Upload Logo Sekolah

**Judul**
Upload Logo Sekolah Profesional dan Penyempurnaan Card Sekolah

**Perubahan**
- Card Sekolah difokuskan hanya pada domain sekolah:`nama_sekolah`, `kepala_sekolah`, `logo_sekolah`; Logo Aplikasi dan Favicon tidak lagi diedit dari Card Sekolah;nilai Sheet-nya tetap aman dan menjadi domain Card Sistem(Sprint 4)。
- Upload Logo Sekolah dua fase:pilih file → validasi client + preview lokal → konfirmasi Upload → backend Admin-only → validasi server-side(MIME/ekstensi/ukuran)→ folder "Assets WONG MIT"(harus tepat satu;tidak dibuat otomatis)→ sharing `ANYONE_WITH_LINK/VIEW` → File ID otomatis terisi → Simpan = commit seluruh Card Sekolah。
- Format diterima:JPG/JPEG/PNG;maksimal 2 MB;SVG ditolak pada versi ini�。
- Replace:file baru diupload dan disimpan terlebih dahulu;file lama dihapus dari Drive HANYA setelah commit konfigurasi sukses}。 Sheet tidak pernah menunjuk file terhapus;jika save gagal,logo lama DAN file baru tetap aman。。
- Hapus Gambar menangani dua keadaan:pending upload baru(file baru dihapus dari Drive;konfigurasi tersimpan tak berubah&& logo tersimpan(pending deletion;file dihapus pasca-commit;Batal mengembalikan logo lama)。
- Cancel mid-edit menghapus pending upload(anti-orphan);kegagalan cleanup logo lama pasca-commit tidak membatalkan konfigurasi baru,menampilkan peringatan jelas dan retry 1x。
- Final patch:Login dan Sidebar menampilkan logo aplikasi dari `logo_aplikasi` secara dinamis(via `logoAplikasiUrl` + fallback `onerror`),dengan boundary tetap via `getAppInfo()`(tanpa session),bukan `getSchoolIdentity()`。
- `logo_aplikasi` dan `favicon` di Sheet tetap utuh setelah Simpan Card Sekolah(payload hanya 3 field sekolah;guard `undefined` pada helper penyimpanan menjaga nilai lama)。

**Status**
SELESAI

**Commit**
`58bc97e`

**Validasi**
- Syntax check LOLOS(backend + frontend)。
- Deploy Uji LOLOS(upload dua fase,hapus Kasus A/B,cancel anti-orphan,replace,fallback logo,regression)。
- Bug uji telah tuntas:`ReferenceError: updateValue is not defined` diperbaiki dengan menjadikan helper `updateSettingValue()` top-level(0 residu;pemilihan file tidak lagi memicu upload otomatis;File ID terisi setelah upload sukses;helper undefined teratasi)。

## 2026-08-31

### Sprint 3A-3.4 — Configurable Application Branding

**Judul**

Menjadikan Tagline Aplikasi Configurable

**Perubahan**

- Menambahkan key `tagline_aplikasi` pada Sheet `Pengaturan` sebagai sumber `appLongName` di `getAppInfo()`.
- Fallback `appLongName` tetap `Aplikasi Administratif Guru Online` (universal, bukan "Website ONline Guru", bukan nama sekolah).
- Mengaktifkan kembali tagline Login dari `appLongName`.
- Fallback branding statis Login tetap dipertahankan.
- Anti-flash branding Login tetap dipertahankan.
- Kontrak `getAppInfo()` tidak berubah.
- Key `tagline_aplikasi` didokumentasikan pada DATABASE.md.

**Status**

SELESAI

**Commit**

`9b18dc3`

**Validasi**

- Syntax check LOLOS.
- clasp push LOLOS.
- Deploy Uji LOLOS.
- Tagline configurable LOLOS.
- Freshness tagline LOLOS.
- Fallback LOLOS.

**Catatan**

Catatan saat sprint ini selesai: consumer branding lainnya (Sidebar dan Title) belum diimplementasikan dan dilanjutkan pada sprint berikutnya.


## 2026-08-31

### Sprint 3A-3.3 — Application Identity Consumer Integration

**Judul**

Integrasi Identity Aplikasi ke Login

**Perubahan**

- Mengintegrasikan `nama_aplikasi` dari `getAppInfo()` ke halaman Login.
- Nama aplikasi Login kini configurable per deployment melalui key `nama_aplikasi`.
- Mempertahankan tagline Login existing tanpa menggunakan `appLongName`.
- Mempertahankan fallback branding Login.
- Tidak menggunakan `getSchoolIdentity()` pada Login.
- Tidak mengubah kontrak `getAppInfo()`.

**Status**

SELESAI

**Commit**

`dc07d64`

**Validasi**

- Syntax check LOLOS.
- Login branding LOLOS.
- Deploy Uji LOLOS.

**Catatan**

Integrasi Sidebar, Title, dan consumer branding lainnya belum dilakukan.


## 2026-08-31

### Micro-Fix — Application Identity Freshness & Login Anti-Flash

**Judul**

Perbaikan Freshness Identity Aplikasi dan Login Anti-Flash

**Perubahan**

- `getAppInfo()` membaca Sheet `Pengaturan` secara langsung untuk menghindari stale value dari Master Data cache.
- Perubahan manual `nama_aplikasi` kini terbaca tanpa menunggu TTL cache.
- Kontrak return `getAppInfo()` tetap dipertahankan.
- Branding flash pada Login dihilangkan dengan menyembunyikan branding hingga identity selesai dibaca.
- Fallback branding tetap dipertahankan.
- `appLongName` tidak digunakan sebagai tagline Login.
- Micro-test `testGetAppInfo()` dihapus setelah pengujian selesai.

**Status**

SELESAI

**Commit**

`6ee9aeb`

**Validasi**

- Freshness `nama_aplikasi` LOLOS.
- Deploy Uji LOLOS.
- Login anti-flash LOLOS.
- Fallback branding LOLOS.

**Catatan**

Perubahan dibatasi pada `Code.js` dan `index.html`. Master Data cache global, `getSchoolIdentity()`, consumer lain, dan kontrak `getAppInfo()` tidak diubah.

## 2026-08-31

### Sprint Pengaturan — 3A-3.2 Application Identity Foundation

**Judul**

Implementasi Application Identity Reader

**Perubahan**

- `getAppInfo()` ditetapkan sebagai single owner identity aplikasi.
- `getAppInfo()` dapat dipanggil tanpa session untuk kebutuhan pre-login.
- Identity aplikasi dibaca dari Sheet `Pengaturan` melalui `getMasterSheetData("Pengaturan")`.
- `nama_aplikasi` menjadi sumber `namaAplikasi`.
- `logo_aplikasi`, `favicon`, dan `versi_aplikasi` menjadi bagian identity aplikasi.
- Default `namaAplikasi` ditetapkan sebagai `Administratif Guru`, bukan branding WONG MIT dan bukan nama sekolah.
- `appLongName` menggunakan nilai universal `Aplikasi Administratif Guru Online`.
- Alias legacy `appName` dan `logo` dipertahankan untuk backward compatibility.
- Identitas sekolah (`nama_sekolah`, `kepala_sekolah`, `logo_sekolah`) tidak dimasukkan ke dalam kontrak identity aplikasi.
- Tidak mengubah consumer frontend pada sprint ini.

**Status**

SELESAI

**Commit**

`486eea4`

**Validasi**

- Syntax check LOLOS.
- Micro-test `getAppInfo()` LOLOS.
- Pembacaan `nama_aplikasi` dari Sheet LOLOS.
- Alias `appName` dan `namaAplikasi` konsisten.
- `versiAplikasi` terbaca dari Sheet.
- Deploy Uji LOLOS.
- Deploy Production LOLOS.

**Catatan**

Consumer identity aplikasi seperti login, sidebar, title, dan branding aplikasi akan diintegrasikan pada sprint berikutnya.

## 2026-08-31

### Sprint Pengaturan — 3A-3.1 Identity Reader Foundation

**Judul**

Integrasi Identitas Sekolah ke Dashboard

**Perubahan**

- Dashboard membaca `nama_sekolah` melalui `getSchoolIdentity()`.
- Subtitle Dashboard menjadi dinamis berdasarkan identitas sekolah.
- Format subtitle:
  `Website ONline Guru [Nama Sekolah]`
- Fallback branding lama dipertahankan.
- Tidak mengubah kontrak `getDashboardData()`.
- Tidak mengubah `getSchoolIdentity()`.
- Tidak menyentuh modul Export/Rekap/Siswa yang masih frozen.

**Status**

SELESAI

**Commit**

`29266bd`

**Validasi**

- Syntax check LOLOS.
- Regression Dashboard LOLOS.
- Deploy Uji LOLOS.

## 2026-08-30

### Sprint Pengaturan — Sekolah / Identitas — Backend Identity Foundation

**Judul**

Implementasi Backend Identity Sekolah

**Perubahan**

* Menambahkan `getSchoolIdentity(sessionId)`.
* Menambahkan `saveSchoolIdentity(sessionId, data)`.
* Menambahkan dukungan key `logo_aplikasi` pada penyimpanan Pengaturan.
* Mempertahankan `getAcademicSettings()` dan `saveAcademicSettings()` tanpa perubahan kontrak.
* Menggunakan `getMasterSheetData("Pengaturan")` dan cache invalidation existing.
* Menetapkan pemisahan awal antara identitas sekolah dan identitas aplikasi.

**Status**

SELESAI

**Commit**

`a717d1d`

**Validasi**

* Deploy Uji LOLOS.
* Regression Pengaturan Akademik LOLOS.
* Dashboard LOLOS.
* Data Siswa LOLOS.
* Guru Mengajar LOLOS.
* Absensi LOLOS.
* Rekap LOLOS.
* Sheet Pengaturan tetap aman.

## 2026-08-30

### Sprint Pengaturan — Sekolah / Identitas — UI Detail + Edit

**Judul**

Implementasi UI Pengaturan Sekolah

**Perubahan**

* Card Sekolah menggunakan alur Preview → Detail → Edit.
* Detail Sekolah menampilkan nama sekolah, kepala sekolah, logo sekolah, logo aplikasi, dan favicon.
* Form Edit Sekolah terhubung ke `getSchoolIdentity()` dan `saveSchoolIdentity()`.
* Tombol Edit tidak ditampilkan pada card preview.
* Event menggunakan event delegation.
* Validasi Nama Sekolah wajib diisi.
* File ID Google Drive digunakan sebagai nilai asset; upload dan resolver URL belum menjadi bagian sprint ini.

**Status**

SELESAI

**Validasi**

* Deploy Uji LOLOS.
* Preview → Detail → Edit LOLOS.
* Save LOLOS.
* Cancel LOLOS.
* Validasi Nama Sekolah LOLOS.
* Regression Pengaturan Akademik LOLOS.
* Card Sistem dan Tahun Ajaran tetap aman.

**Catatan**

Integrasi identitas aplikasi, login, sidebar, export, dan resolver asset dilanjutkan pada sprint berikutnya.

## 2026-08-29

### Sprint Pengaturan — UX Preview → Detail → Edit

**Judul**

Penyempurnaan UX Halaman Pengaturan

**Perubahan**

- Mengubah alur interaksi card Pengaturan dari direct edit menjadi Preview → Detail → Edit.
- Menghilangkan tombol `Edit` dari card preview.
- Klik card kini membuka Detail dan tidak langsung masuk ke mode Edit.
- Menambahkan detail view terpusat untuk Akademik, Sekolah, Sistem, dan Tahun Ajaran.
- Pengaturan Akademik tetap menggunakan `getAcademicSettings()` dan `saveAcademicSettings()` tanpa perubahan kontrak backend.
- Mengubah aksi Edit, Simpan, Batal, dan Kembali menjadi event delegation.
- Menghapus placeholder toast pada Pengaturan Sekolah, Sistem, dan Tahun Ajaran.
- Pengaturan Sekolah, Sistem, dan Tahun Ajaran belum memiliki backend pengelolaan data dan hanya memiliki detail view sebagai fondasi sprint berikutnya.
- Tidak mengubah `Pengaturan.js`, role check, validasi backend, atau cache invalidation.
- Menjaga responsive layout dan desain existing halaman Pengaturan.

**Status**

SELESAI

**Commit**

`2ecfbcd`

**Validasi**

- Deploy Uji LOLOS.
- Pengujian keadaan default card LOLOS.
- Pengujian Preview → Detail → Edit LOLOS.
- Pengujian Save dan Cancel Akademik LOLOS.
- Pengujian event handling LOLOS.
- Pengujian Detail Sekolah LOLOS.
- Pengujian Detail Sistem LOLOS.
- Pengujian Detail Tahun Ajaran LOLOS.
- Pengujian keyboard interaction LOLOS.
- Regression lintas modul LOLOS.
- Pengujian role LOLOS.

**Catatan**

Penyempurnaan ini hanya mencakup fondasi UX halaman Pengaturan. Implementasi fungsi backend Pengaturan Sekolah, Pengaturan Sistem, dan Pengaturan Tahun Ajaran tetap mengikuti sprint masing-masing.

## 2026-08-27

### Final Cleanup / Dead Code Audit

Judul

Final Cleanup unused legacy functions

Perubahan

- Menghapus `openImportModal()` dari `index.html`.
- Menghapus `getGuruOptions()`, `getKelasOptions()`, dan `getMapelOptions()` dari `Code.js`.
- Penghapusan dilakukan setelah audit caller, dependency, dynamic reference, dan loader.
- `getMasterSiswa()`, `getStudentsByClass()`, dan `getWaliKelasOptions()` dipertahankan karena masih digunakan.
- `getAppInfo()`, `invalidateFrontendMasterData()`, dan fungsi export siswa yang masih diperlukan roadmap tetap dipertahankan.
- Loader `js_import.html` tetap dipertahankan.
- Dokumentasi stale mengenai `getMapelOptions` diperbarui.
- Tidak ada perubahan database atau behavior fitur yang disengaja.

Status

SELESAI

Commit

Final cleanup unused legacy functions

## 2026-08-26

### Refactoring Shared Infrastructure — Master Data, Export, Auth & Calendar

**Judul**

Penyelesaian Refactoring Shared Infrastructure WONG MIT

**Perubahan**

- Master Data Infrastructure dipisahkan ke `MasterData.js`.
- Shared Export Engine dipisahkan ke `Export.js`.
- Authentication, Session, dan Role dipisahkan ke `Auth.js`.
- Calendar Infrastructure dipisahkan ke `Calendar.js`.
- `getAttendanceCalendarContext()` dipusatkan pada `Calendar.js`.
- Export domain Siswa dan Rekap tetap berada pada boundary masing-masing.
- Tidak dibuat frontend partial khusus Export, Auth, atau Calendar karena ketiganya merupakan infrastructure backend.
- Endpoint `google.script.run` tetap dipertahankan.
- Dependency lintas modul tetap menggunakan fungsi top-level Apps Script.
- Struktur database tidak berubah.
- Behavior runtime production tetap kompatibel.

**Status**

SELESAI

**Commit**

Extract Master Data infrastructure layer

Extract Export Engine infrastructure

Extract Auth Session Role infrastructure

Extract Calendar infrastructure

**Validasi**

- Deploy Uji LOLOS.
- Deploy Production LOLOS.
- Regression lintas modul LOLOS.
- Auth / Session / Role LOLOS.
- Export Engine LOLOS.
- Calendar / Attendance Context LOLOS.
- Master Data dependency LOLOS.

**Catatan**

Dengan selesainya batch ini, refactoring shared infrastructure utama telah selesai. Pengembangan berikutnya kembali difokuskan pada penyempurnaan fitur aplikasi melalui sprint terpisah.

## 2026-08-26

### Refactoring Modularisasi Rekap Absensi

**Judul**

Refactoring dan Modularisasi Rekap Absensi

**Perubahan**

- Backend Rekap dipindahkan dari `Code.js` ke `Rekap.js`.
- Frontend logic Rekap dipindahkan dari `index.html` ke `js_rekap.html`.
- Loader `<?!= getPage("js_rekap") ?>` ditambahkan ke `index.html`.
- State dan filter khusus Rekap ikut dimodularisasi.
- `updateFilterGuruRekap()` dipindahkan ke `js_rekap.html`.
- Shared utilities dan dependency lintas modul tetap dipertahankan.
- Export engine bersama tidak diubah.
- Endpoint, authorization, database, dan behavior runtime tetap kompatibel.

**Status**

SELESAI

**Commit**

Extract Rekap module and add loader

Extract Rekap module Part II

**Validasi**

- Deploy Uji & Deploy Production LOLOS.
- Halaman Rekap LOLOS.
- Filter LOLOS.
- Kombinasi Filter LOLOS.
- Reset Filter LOLOS.
- Sorting LOLOS.
- Empty State LOLOS.
- Request/Filter State LOLOS.
- Navigasi/Reload LOLOS.
- Role LOLOS.
- Regression lintas modul LOLOS.
- Console LOLOS.

**Catatan**

Refactoring Rekap selesai tanpa perubahan business logic atau struktur database. Modul Rekap tetap FROZEN. Refactoring export lintas modul tetap ditunda sesuai keputusan arsitektur.

## 2026-08-24

## [Refactoring] Absensi Harian

- Mengekstrak backend Absensi Harian dari `Code.js` ke `Absensi.js`.
- Mengekstrak frontend Absensi Harian dari `index.html` ke `js_absensi.html`.
- Menambahkan loader `<?!= getPage("js_absensi") ?>` pada `index.html`.
- Mempertahankan shared utilities dan dependency lintas modul.
- Menyelesaikan extraction state/event Absensi yang sebelumnya masih tertinggal di `index.html`.
- Deploy Uji dan pengujian fungsional selesai dengan hasil **LOLOS**.

## 2026-08-22

### Refactoring Modularisasi Mata Pelajaran (Mapel)

**Judul**

Refactoring dan Modularisasi Mapel

**Perubahan**

* Backend Mapel dipindahkan dari `Code.js` ke `Mapel.js`.
* Frontend logic Mapel dipindahkan dari `index.html` ke `js_mapel.html`.
* Loader `<?!= getPage("js_mapel") ?>` ditambahkan ke `index.html`.
* `page_pengaturan.html` dan view lain tidak diubah sebagai bagian extraction.
* Endpoint `google.script.run`, authorization, dependency shared, database, dan behavior runtime dipertahankan.
* Dependency Mapel yang digunakan oleh Guru Mengajar tetap berjalan.
* Import Mapel dan download template Mapel tetap berjalan setelah modularisasi.
* Export lintas modul tidak menjadi bagian extraction ini.

**Status**

SELESAI

**Commit**

Extract Mapel (Guru Mengajar) module and add loader

**Validasi**

* Deploy Uji LOLOS.
* Daftar Mapel LOLOS.
* Tambah Mapel LOLOS.
* Edit Mapel LOLOS.
* Hapus Mapel LOLOS.
* Import Mapel LOLOS.
* Download Template Mapel LOLOS.
* Dependency Guru Mengajar LOLOS.
* Navigasi LOLOS.
* Deploy Production LOLOS.

**Catatan**

Refactoring Mapel selesai tanpa perubahan struktur database atau endpoint runtime.

## 2026-08-22

### Refactoring Modularisasi Guru Mengajar + Bugfix Import Massal

**Judul**

Refactoring Guru Mengajar dan Perbaikan Preview Import Massal

**Perubahan**

* Backend Guru Mengajar dipindahkan dari `Code.js` ke `GuruMengajar.js`.
* Frontend Guru Mengajar dipindahkan dari `index.html` ke `js_gurumengajar.html`.
* Loader `<?!= getPage("js_gurumengajar") ?>` ditambahkan ke `index.html`.
* Fungsi `loadMasterImportGuruMengajar()` dan `renderPreviewGuruMengajar()` turut dimodularisasi.
* `page_gurumengajar.html` tidak diubah.
* Endpoint, authorization, dependency shared, dan behavior runtime tetap dipertahankan.
* Ditemukan bug pada validasi preview Import Massal Guru Mengajar yang menyebabkan data Guru, Kelas, Hari, dan Mapel valid ditandai sebagai error.
* Validasi preview diperbaiki agar pencocokan Guru, Kelas, dan Mapel menggunakan kolom nama yang sesuai pada master data.
* Validasi hari dan status tetap dipertahankan.
* Import backend `importGuruMengajar()` tidak diubah secara tidak perlu.

**Status**

SELESAI

**Commit**

Extract Guru Mengajar module and add loader

Extract Guru Mengajar `loadMasterImportGuruMengajar()` and `renderPreviewGuruMengajar()`

fix bug frontend preview import massal GuruMengajar

**Validasi**

* Deploy Uji LOLOS.
* CRUD Guru Mengajar LOLOS.
* Import Massal Guru Mengajar LOLOS.
* Preview Import Massal LOLOS.
* Validasi Guru/Kelas/Hari/Mapel LOLOS.
* Upload data hasil import LOLOS.
* Dependency lintas modul LOLOS.
* Deploy Production LOLOS.

**Catatan**

Refactoring dan bugfix selesai tanpa perubahan struktur database atau endpoint runtime. Fungsi export lintas modul tetap ditunda sesuai keputusan arsitektur sebelumnya.

## 2026-08-20

## Refactoring Modularisasi Data Siswa — CRUD

- Backend CRUD Siswa dipindahkan dari `Code.js` ke `Siswa.js`.
- Frontend CRUD Siswa dipindahkan dari `index.html` ke `js_siswa.html`.
- Loader `<?!= getPage("js_siswa") ?>` ditambahkan ke `index.html`.
- Tidak ada perubahan terhadap endpoint, database, authorization, atau behavior runtime.
- Fungsi export Siswa belum dipindahkan dan ditunda untuk refactoring lintas modul.
- Deploy Uji dan Production LOLOS.

## 2026-08-19

### Sprint Kelas — Refactoring & Modularisasi

Judul

Refactoring Data Kelas

Perubahan

- Memindahkan `getClasses()`, `addClass()`, `getClassById()`, `updateClass()`, dan `deleteClass()` dari `Code.js` ke `Kelas.js`.
- Memindahkan fungsi frontend Data Kelas dari `index.html` ke `js_kelas.html`.
- Menambahkan partial loader `<?!= getPage("js_kelas") ?>`.
- Mempertahankan endpoint dan signature Google Apps Script.
- Mempertahankan authorization dan cache invalidation.
- Mempertahankan dependency Kelas terhadap modul Guru, Guru Mengajar, Siswa, Absensi, dan Rekap.
- Mempertahankan struktur Sheet `Kelas` tanpa perubahan.
- Tidak mengubah `page_kelas.html`.
- Tidak mengubah business logic.

Status

SELESAI

Commit

Extract Kelas backend module
Extract Kelas frontend module
Add Kelas frontend loader

Validasi

- Deploy Uji LOLOS.
- Daftar Kelas LOLOS.
- Pencarian/filter LOLOS.
- Tambah Kelas LOLOS.
- Edit Kelas LOLOS.
- Hapus Kelas LOLOS.
- Navigasi LOLOS.
- Pengujian lintas modul LOLOS.
- Deploy Production LOLOS.

Catatan

Refactoring Data Kelas selesai tanpa perubahan perilaku yang terdeteksi. Pengembangan atau penyempurnaan fitur Data Kelas di masa berikutnya tetap diperlakukan sebagai sprint terpisah.

## 2026-08-19

### Sprint Guru — Refactoring & Modularisasi

Judul

Refactoring Data Guru

Perubahan

- Memindahkan `getTeachers()`, `addTeacher()`, `getTeacherById()`, `updateTeacher()`, dan `deleteTeacher()` dari `Code.js` ke `Guru.js`.
- Memindahkan `loadTeachers()`, `filterGuru()`, `showTambahGuru()`, `simpanGuru()`, `editGuru()`, dan `hapusGuru()` dari `index.html` ke `js_guru.html`.
- Menambahkan partial loader `<?!= getPage("js_guru") ?>`.
- Mempertahankan endpoint dan signature Google Apps Script.
- Mempertahankan authorization dan cache invalidation.
- Mempertahankan fungsi Guru yang digunakan lintas modul di `Code.js`.
- Tidak mengubah `page_guru.html`.
- Tidak mengubah struktur database atau business logic.

Status

SELESAI

Commit

Extract Guru backend module
Extract Guru frontend module
Add Guru frontend loader

Validasi

- Deploy Uji LOLOS.
- Daftar Guru LOLOS.
- Pencarian/filter LOLOS.
- Tambah Guru LOLOS.
- Edit Guru LOLOS.
- Hapus Guru LOLOS.
- Navigasi LOLOS.
- Deploy Production LOLOS.

Catatan

Refactoring Data Guru selesai tanpa perubahan perilaku yang terdeteksi. Pengembangan atau penyempurnaan fitur Data Guru di masa berikutnya tetap diperlakukan sebagai sprint terpisah.

## 2026-08-18

### Sprint Dashboard — Refactoring & Modularisasi

Judul

Refactoring Dashboard

Perubahan

- Memindahkan `getDashboardData()` dan `getDashboardAttendanceSummary()` dari `Code.js` ke `Dashboard.js`.
- Memindahkan `loadDashboard()` dan `showDashboardAttendance()` dari `index.html` ke `js_dashboard.html`.
- Mempertahankan endpoint `google.script.run` dengan nama dan signature yang sama.
- Mempertahankan `getGuruProfile()` sebagai dependency/profile service di `Code.js`.
- Menambahkan partial loader `<?!= getPage("js_dashboard") ?>`.
- Tidak mengubah `page_dashboard.html`.
- Tidak mengubah struktur database.
- Tidak mengubah business logic Dashboard.

Status

SELESAI

Commit

Refactoring Dashboard

Catatan

- Perubahan hanya mencakup refactoring/modularisasi Dashboard.
- Penyempurnaan fitur Dashboard di luar refactoring tetap menjadi sprint terpisah.
- Deploy Uji LOLOS.
- Testing Dashboard LOLOS.
- Deploy Production LOLOS.
- Tidak ditemukan regresi pada Dashboard.

## 2026-08-17

### Sprint Pengaturan Akademik — Refactoring & Modularisasi

Judul

Refactoring Pengaturan Akademik

Perubahan

- Memindahkan `getAcademicSettings()` dan `saveAcademicSettings()` dari `Code.js` ke `Pengaturan.js`.
- Memindahkan 7 fungsi frontend Pengaturan Akademik dari `index.html` ke `js_pengaturan.html`.
- Mempertahankan endpoint `google.script.run` tanpa perubahan.
- Mempertahankan caller `loadPage()` → `loadAcademicSettings()`.
- Menambahkan partial loader `<?!= getPage("js_pengaturan") ?>`.
- Tidak mengubah `page_pengaturan.html`.
- Tidak mengubah struktur database atau Sheet `Pengaturan`.

Status

SELESAI

Commit

Refactoring 'Pengaturan'

Catatan

- Perubahan hanya mencakup Pengaturan Akademik.
- Pengaturan Sekolah, Pengaturan Sistem, dan Pengaturan Tahun Ajaran masih berada dalam Sprint Pengaturan yang berstatus ACTIVE.
- Deploy Uji LOLOS.
- Deploy Production LOLOS.
- Tidak ditemukan regresi pada Pengaturan Akademik.

## 2026-08-11

### Sprint Dashboard — Absensi Shortcut & Attendance Monitoring UX

Judul

Absensi Shortcut & Attendance Monitoring UX — Dashboard

Perubahan

- Menambahkan shortcut "Mulai Absensi" pada Dashboard yang mengarah ke halaman Absensi (`page_absensi`).
- Penempatan responsif untuk desktop dan mobile.
- Modal Dashboard Attendance kini memiliki feedback loading dengan animasi tadpole.
- Mencegah klik berulang selama proses loading berlangsung.
- Menambahkan tampilan hari/tanggal saat ini pada modal Attendance.
- Menambahkan info guru mengajar per kelas pada monitoring absensi.
- Layout lebih compact dengan truncation untuk nama guru yang panjang.
- Runtime testing di Apps Script dinyatakan LOLOS.
- File source yang berubah pada sprint ini: `Code.js`, `index.html`, `page_dashboard.html`.

Status

SELESAI

Commit

9c31e82

Catatan

- Working tree bersih setelah commit.

---

## 2026-08-10

### Sprint Code Cleanup — Phase 1

Judul

Penghapusan 10 Fungsi UNUSED dari Code.js

Perubahan

- Menghapus 10 fungsi unused dari Code.js: `include`, `getMasterAbsensi`, `getNamaGuruById`, `isMapelUsed`, `getKelasByNama`, `getMapelByNama`, `getKelasByGuru`, `getTemplateFolder`, `getGuruMengajarTemplateFile`, `createGuruMengajarTemplate`.
- Static audit + global reference scan menyatakan 10 fungsi aman dihapus (tidak ada caller di Code.js, HTML, atau docs/).
- Runtime regression test setelah clasp push + deploy dinyatakan LOLOS.
- `getDataRekap` TIDAK dihapus karena terbukti masih dibutuhkan di runtime
- `getAppInfo` dan `getRelasiMengajar` tetap dipertahankan untuk roadmap Pengaturan/Dashboard.
- 3 fungsi export siswa (`buildSiswaExportSheet`, `exportSiswaExcel`, `exportSiswaPdf`) TIDAK dihapus, ditunda ke sprint mendatang.
- `downloadTemplateGuruMengajar` tetap menggunakan `createTemplateSpreadsheet()`.
- Tidak ada perubahan arsitektur, database, atau fitur aplikasi; perubahan source hanya berupa cleanup 10 fungsi unused. Dokumentasi sprint diperbarui.
- Tidak ada perubahan fitur selain cleanup kode mati (dead code).

Status

SELESAI

Commit

Belum dilakukan (belum di-commit).

Catatan

---

## 2026-09-01

### Sprint 4A — System Settings Backend Foundation

**Judul**

Backend Foundation untuk Card Sistem

**Perubahan**

- Menambahkan fungsi `getSystemSettings(sessionId)` pada `apps-script/Sistem.js`.
- Fungsi membaca Sheet `Pengaturan` dan mengembalikan object dengan field: `namaAplikasi`, `taglineAplikasi`, `logoAplikasi`, `favicon`, `versiAplikasi`, `modeMaintenance`.
- Authorization: Admin-only access via `checkRole(["Admin"])`.
- Menambahkan fungsi `saveSystemSettings(sessionId, data)` untuk persiapan fase edit sprint berikutnya.
- Menambahkan helper `updateSettingValue()` untuk update atomicity Sheet `Pengaturan`.
- Cache invalidation: `invalidateMasterCache("Pengaturan")`.
- Tidak ada perubahan frontend pada 4A.
- Tidak ada perubahan database struktur Sheet.

**Status**

SELESAI

**Validasi**

- Syntax check LOLOS
- Authorization check LOLOS
- Backend contract LOLOS
- Cache invalidation LOLOS

**Catatan**

Sprint 4A murni backend foundation tanpa UI. Integrasi UI Card Sistem dilakukan pada Sprint 4B. Field konfigurasi sudah tersedia dari backend namun edit/upload/toggle functionality dilakukan pada fase berikutnya.

---

### Sprint 4B — Card Sistem UI / Read-Only

**Judul**

Card Sistem dengan Display Read-Only dari Backend

**Perubahan**

- Mengubah `apps-script/page_pengaturan.html`: Card Sistem preview container ditambahkan dengan menampilkan Nama Aplikasi dan Versi Aplikasi.
- Mengubah `apps-script/js_pengaturan.html`: Menambahkan fungsi load, detail, dan update untuk Card Sistem.
  - Fungsi `loadSystemSettings()`: Call backend `getSystemSettings()`, isi `pengaturanSistemData`, update preview elements.
  - Fungsi `tampilkanDetailSistem()`: Render detail view Card Sistem sebagai read-only display.
  - Fungsi `perbaruiDetailSistem()`: Update detail view content dari `pengaturanSistemData`.
  - Router update: `bukaPengaturanDetail()` handle tipe "sistem".
- Menambahkan state variable `pengaturanSistemData` untuk menyimpan hasil backend.
- Detail view menampilkan: Nama Aplikasi, Tagline Aplikasi, Versi Aplikasi, Logo Aplikasi (File ID), Favicon (File ID), Mode Maintenance (status).
- Edit button tersedia namun disabled pada 4B (rencana aktivasi 4C).
- Konsistensi UI dengan pola Card Akademik dan Card Sekolah (Preview → Detail → Edit flow).
- Tidak ada upload asset pada 4B.
- Tidak ada edit/save functionality pada 4B.

**Status**

SELESAI

**Validasi**

- Syntax check LOLOS
- git diff --check LOLOS
- Deploy Uji LOLOS
- No regressions pada Card Akademik/Sekolah
- Frozen modules tetap untouched

**Commit**

`docs: close Sprint 4B Card Sistem`

**Catatan**

Sprint 4B fokus HANYA pada display/read-only. Implementasi edit/save, upload asset, maintenance toggle, backup/restore, dan log aktivitas adalah scope sprint-sprint berikutnya (4C untuk Asset Management, POST-4C untuk Maintenance/Backup/Restore/Log).

- Verifikasi: `git diff` menampilkan 451 deletions dan 11 insertions.
- 11 insertions tersebut adalah 2 blok komentar DRAFT yang sudah dibuat sebelumnya oleh user untuk `getAppInfo` dan `getRelasiMengajar`, bukan bagian dari cleanup 10 fungsi.
- `node --check Code.js` LOLOS.
- `git diff --check` LOLOS (tidak ada trailing whitespace atau line-ending issue).
- CRLF line endings di Code.js dipertahankan.
- 4 section comment terpinggirkan (MASTER ABSENSI, LOOKUP KELAS, LOOKUP MAPEL, TEMPLATE MANAGER) dibiarkan sesuai aturan "hapus hanya definisi fungsi target".

---

## 2026-09-02

### Sprint 4C — Asset Management

**Judul**

Edit Card Sistem, Pengelolaan Asset Aplikasi (logo_aplikasi & favicon), dan Favicon Runtime Dinamis

**Perubahan**

- Menambahkan endpoint `uploadAssetAplikasi(sessionId, upload, target)` pada `apps-script/Sistem.js` (Admin-only, target `logo_aplikasi|favicon`).
- Validasi server-side: MIME + ekstensi whitelist per target (logo: JPG/JPEG/PNG; favicon: JPG/JPEG/PNG/ICO/SVG), ukuran maksimal 2 MB, validasi konten SVG (ditolak bila mengandung `<script` atau event handler `on*=`).
- Folder Drive "Assets WONG MIT" wajib tepat satu (ditolak bila tidak ada atau ambigu); sharing `ANYONE_WITH_LINK / VIEW`.
- Upload tidak menulis Sheet (upload ≠ commit); File ID baru masuk Sheet hanya saat [Simpan] via `saveSystemSettings()`.
- Field derived URL additive: `logoAplikasiUrl` dan `faviconUrl` pada `getSystemSettings()`; `faviconUrl` pada `getAppInfo()` — kontrak lama dan alias legacy `appName`/`logo` tetap utuh.
- Mengaktifkan Edit Card Sistem pada `apps-script/js_pengaturan.html` dengan state machine per-slot (`assetAwal`, `assetPendingUpload`, `assetPendingDelete`, `fileDipilih`) mengikuti pola FIX-2; `hapusAssetSekolah()` dan `hapusAssetSekolahSisiClient()` di-reuse tanpa mengubah implementasinya.
- Replace: Simpan commit terlebih dahulu → Sheet menunjuk File ID baru → file lama dihapus best-effort (retry 1x + warning); Simpan gagal → asset lama tidak dihapus; Cancel membersihkan pending upload (anti-orphan).
- Simpan hanya mengirim field yang berubah; `modeMaintenance` tidak pernah dikirim (nilai `mode_maintenance` tidak berubah); `logo_sekolah` tidak disentuh.
- Mengubah `apps-script/index.html`: fallback favicon statis di `<head>` (`#appFavicon`) dan consumer favicon dinamis pada `terapkanAppIdentity()` dari `getAppInfo().faviconUrl` via consumer identity yang sudah ada, tanpa RPC baru.
- Mengubah `apps-script/page_pengaturan.html`: markup preview/detail Card Sistem (Tagline, preview asset, Mode Maintenance read-only).
- Root `index.html` GitHub Pages TIDAK diubah.

**Status**

SELESAI — CLOSED & LOLOS untuk scope implementasi Card Sistem + Asset Management

**Validasi**

- Syntax check LOLOS (backend + frontend)
- git diff --check LOLOS
- FINAL REVIEW = PASS
- Manual test LOLOS semua item, kecuali favicon production pada tab browser

**Commit**

`feat(pengaturan): close Sprint 4C system asset management`

**Catatan**

Favicon consumer pada webapp Apps Script sudah dinamis, tetapi favicon pada tab browser production masih berasal dari root GitHub Pages `index.html` karena aplikasi berjalan di dalam iframe wrapper. Integrasi favicon production wrapper berstatus PENDING / MICRO-AUDIT TERPISAH setelah Sprint 4C dan BELUM dinyatakan selesai. Modul Maintenance Mode, Backup, Restore, dan Log Aktivitas tetap POST-4C.

## 2026-09-02

### Micro-Fix — Integrasi Favicon GitHub Pages Wrapper

**Judul**

Favicon Tab Browser Production Mengikuti Konfigurasi Card Sistem (postMessage Bridge)

**Perubahan**

- Micro-Audit terpisah SETELAH Sprint 4C menemukan bahwa favicon tab browser production berasal dari root GitHub Pages `index.html` (dokumen top-level), bukan dari dokumen iframe Apps Script; fetch lintas-origin dari wrapper ke `/exec` diblokir CORS.
- Solusi: postMessage bridge. `apps-script/index.html` mengirim `{ type: "wongmit-favicon", url: faviconUrl }` ke `window.top` setelah consumer favicon Sprint 4C menerapkan `faviconUrl` valid (guard `window.top !== window.self`; tanpa RPC/backend baru; webapp tanpa wrapper tidak menghasilkan error).
- Root `index.html` GitHub Pages: `<link rel="icon">` diberi `id="wrapperFavicon"` + listener `message` dengan validasi ketat (type persis `"wongmit-favicon"` + URL HTTPS hostname `drive.google.com` saja); payload tidak valid diabaikan.
- Fallback favicon lama `https://iili.io/CU1QcrJ.png` tetap dipertahankan.
- Hanya 2 file diubah: root `index.html` dan `apps-script/index.html`.

**Status**

SELESAI — production LOLOS

**Validasi**

- Syntax check LOLOS (script root + Apps Script)
- git diff --check LOLOS
- Production GitHub Pages ter-deploy dan terverifikasi (listener aktif pada HTML production)
- Deploy Uji production LOLOS: favicon tab browser berubah mengikuti konfigurasi Card Sistem

**Commit**

`b5178a8` — `fix(wrapper): sync dynamic favicon from app iframe`

**Catatan**

Saat `/exec` Apps Script dibuka langsung, favicon tab tetap favicon bawaan Google Apps Script — batasan arsitektur/platform Apps Script (tab top-level bukan dokumen HTML aplikasi), BUKAN failure dan bukan item perbaikan. PNG direkomendasikan sebagai format favicon production; ICO/SVG dibatasi keterbatasan Drive thumbnail.

---

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
