toolName: todo_write

status: success

Todos updated: 4 items

Mari saya baca semua file project untuk analisis lengkap. Saya akan
membaca file-file konfigurasi dan backend terlebih dahulu, kemudian
semua halaman HTML.

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\appsscript`{=tex}.json

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT.clasp.json

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\Code`{=tex}.js

File Code.js cukup besar (terpotong). Mari saya baca sisanya dan semua
file HTML.

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\Code`{=tex}.js

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\index`{=tex}.html

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_login.html

Mari saya baca sisa file HTML lainnya untuk analisis lengkap.

toolName: view_files

status: success

filePath:
d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_dashboard.html

toolName: view_files

status: success

filePath:
d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_absensi.html

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_siswa.html

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_guru.html

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_kelas.html

toolName: view_files

status: success

filePath:
d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_gurukelas.html

toolName: view_files

status: success

filePath:
d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_gurumengajar.html

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_rekap.html

toolName: view_files

status: success

filePath:
d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\page`{=tex}\_pengaturan.html

toolName: todo_write

status: success

Todos updated: 4 items

toolName: CompactFake

status: success

Saya akan melanjutkan analisis dengan membaca sisa file index.html yang
terpotong untuk melengkapi gambaran fungsi frontend, lalu menyusun
laporan analisis lengkap 6 poin sesuai permintaan.

toolName: todo_write

status: success

Todos updated: 4 items

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\index`{=tex}.html

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\index`{=tex}.html

toolName: view_files

status: success

filePath: d:`\PROJECT`{=tex}`\WONG`{=tex}\_MIT`\index`{=tex}.html

toolName: todo_write

status: success

Todos updated: 3 items

Berikut adalah hasil analisis lengkap project **WONG MIT (Website ONline
Guru MI Tanbihul Athfal)** --- Google Apps Script untuk sistem informasi
dan absensi madrasah.

------------------------------------------------------------------------

## 1. STRUKTUR PROJECT

Project ini menggunakan arsitektur **Flat File Structure** (semua file
di root folder) dengan pola **Single Page Application (SPA) simulated
via Server-side Include**.

    d:\PROJECT\WONG_MIT\
    ├── appsscript.json              ← Manifest Apps Script (konfigurasi runtime)
    ├── .clasp.json                  ← Konfigurasi CLASP (sync local ↔ Apps Script)
    ├── Code.js                      ← BACKEND TUNGGAL (6.678 baris) — semua logika server
    ├── index.html                   ← MAIN SHELL / ROOT SPA (12.735 baris)
    ├── page_login.html              ← Template halaman Login
    ├── page_dashboard.html          ← Template Dashboard
    ├── page_siswa.html              ← Template Master Siswa + Import
    ├── page_guru.html               ← Template Master Guru
    ├── page_kelas.html              ← Template Master Kelas
    ├── page_gurukelas.html          ← Template Relasi Guru-Kelas
    ├── page_gurumengajar.html       ← Template Mapel + Guru Mengajar + 2 Import
    ├── page_absensi.html            ← Template Absensi Harian (revisi aware)
    ├── page_rekap.html              ← Template Rekap Absensi + Export
    └── page_pengaturan.html         ← Template Pengaturan Akademik

**Total file: 14** --- 2 file konfigurasi, 1 file backend JS, 1 file
shell HTML, dan 9 template page HTML.

------------------------------------------------------------------------

## 2. SEMUA FILE YANG ADA

  ------------------------------------------------------------------------------------------------------------------------------------
  No                File                                                                           Ukuran (baris)    Lokasi
  ----------------- ------------------------------------------------------------------------------ ----------------- -----------------
  1                 [appsscript.json](file:///d:/PROJECT/WONG_MIT/appsscript.json)                 \~10              Konfigurasi

  2                 [.clasp.json](file:///d:/PROJECT/WONG_MIT/.clasp.json)                         \~3               Konfigurasi

  3                 [Code.js](file:///d:/PROJECT/WONG_MIT/Code.js)                                 6.678             Backend Server

  4                 [index.html](file:///d:/PROJECT/WONG_MIT/index.html)                           12.735            Frontend Shell

  5                 [page_login.html](file:///d:/PROJECT/WONG_MIT/page_login.html)                 \~100             Page Template

  6                 [page_dashboard.html](file:///d:/PROJECT/WONG_MIT/page_dashboard.html)         \~200             Page Template

  7                 [page_siswa.html](file:///d:/PROJECT/WONG_MIT/page_siswa.html)                 \~400             Page Template

  8                 [page_guru.html](file:///d:/PROJECT/WONG_MIT/page_guru.html)                   \~250             Page Template

  9                 [page_kelas.html](file:///d:/PROJECT/WONG_MIT/page_kelas.html)                 \~200             Page Template

  10                [page_gurukelas.html](file:///d:/PROJECT/WONG_MIT/page_gurukelas.html)         \~150             Page Template

  11                [page_gurumengajar.html](file:///d:/PROJECT/WONG_MIT/page_gurumengajar.html)   \~700             Page Template

  12                [page_absensi.html](file:///d:/PROJECT/WONG_MIT/page_absensi.html)             \~450             Page Template

  13                [page_rekap.html](file:///d:/PROJECT/WONG_MIT/page_rekap.html)                 \~300             Page Template

  14                [page_pengaturan.html](file:///d:/PROJECT/WONG_MIT/page_pengaturan.html)       \~250             Page Template
  ------------------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 3. FUNGSI UTAMA SETIAP FILE

### A. Konfigurasi

**[appsscript.json](file:///d:/PROJECT/WONG_MIT/appsscript.json)** -
Runtime V8 Engine, timezone `Asia/Jakarta` - Web App dijalankan atas
nama `USER_DEPLOYING` (account deploy), akses `ANYONE_ANONYMOUS` (bisa
diakses publik tanpa login Google) - `XFrameOptionsMode.ALLOWALL` → bisa
di-embed ke website lain

**[.clasp.json](file:///d:/PROJECT/WONG_MIT/.clasp.json)** - Terhubung
ke Apps Script Project ID:
`1Yth-V706tevJRdsr2Y4rjMkBVHxyx899g1BNwXlsIGu04U7sOaK9O5eo` - Tool untuk
sync kode lokal ↔ cloud (push/pull/deploy via `clasp CLI`)

------------------------------------------------------------------------

### B. Backend Server - **[Code.js](file:///d:/PROJECT/WONG_MIT/Code.js)** (6.678 baris)

File PENTING, semua logic backend ada di sini. Organisasi fungsi:

#### 🔑 Entry Point & Utility

-   `doGet()` → Render index.html shell, entry Web App
-   `include(filename)` → Helper template include (Server-side HTML
    include)
-   `getPage(pageName)` → Baca file HTML page template sebagai string,
    dikirim ke frontend untuk SPA routing
-   `getAppInfo()` → "WONG MIT = Website ONline Guru MI Tanbihul Athfal"

#### 👤 Auth & Session Management

-   `checkLogin(username, password)` → Cek credentials di Sheet Guru,
    buat Session ID
-   `createSession(idGuru, namaGuru)` → Format ID:
    `SID_{idGuru}_{timestamp}`
-   `checkSession(sessionId)` → Cek apakah status = "Aktif" di Sheet
    Session
-   `logoutSession(sessionId)` → Set status "Logout" + timestamp logout
-   `getRoleBySession(sessionId)` → Lookup Session → Guru → Role
-   `checkRole(sessionId, allowedRoles[])` **→ Core RBAC**: split role
    by comma, cek apakah salah satu role user ada dalam daftar yang
    diizinkan
-   `getGuruProfile(idGuru)` → Ambil data guru + list kelas wali + list
    mapel mengajar

#### 📊 Dashboard

-   `getDashboardData()` → Count total siswa/guru/kelas + yang sudah
    diabsen hari ini
-   `getDashboardAttendanceSummary()` → Detail per kelas:
    Hadir/Sakit/Izin/Alpa

#### 🎓 Master Data CRUD (RBAC protected)

  ----------------------------------------------------------------------------------------------------------------------------
  Modul                   Fungsi Utama                                                                 Role Akses
  ----------------------- ---------------------------------------------------------------------------- -----------------------
  **Siswa**               `getStudents, addStudent, getStudentById, updateStudent, deleteStudent`      Semua role bisa baca

  **Guru**                `getTeachers, addTeacher, updateTeacher, deleteTeacher`                      Admin, KepalaSekolah

  **Kelas**               `getClasses (join WaliKelas), addClass, updateClass, deleteClass`            Admin, KepalaSekolah

  **Mapel**               `getMapel, addMapel, updateMapel, deleteMapel, isMapelUsed, getMapelUsage`   Admin, KepalaSekolah

  **GuruKelas**           `getGuruKelas, addGuruKelas, deleteGuruKelas`                                Admin, KepalaSekolah

  **GuruMengajar**        `getGuruMengajar, addGuruMengajar, updateGuruMengajar, deleteGuruMengajar`   Admin, KepalaSekolah
  ----------------------------------------------------------------------------------------------------------------------------

#### 📝 Absensi Engine

-   `getStudentsByClass(kelas)` → Daftar siswa Aktif per kelas untuk
    diabsen
-   `getKelasAbsensi(sessionId)` → **Filter by role**: Admin/Kepsek =
    semua; Guru = hanya kelas di GuruMengajar
-   `saveAttendance(dataArray)` → Append ke Sheet Absensi 11 kolom
-   `reviseAttendance(kelas, tanggal, data)` **→ Mekanisme revisi**:
    HAPUS DARI BAWAH KE ATAS (reverse loop) semua record lama baru
    append ulang
-   `getAttendanceByClassAndDate(kelas, tanggal)` → Status terakhir per
    NISN + info inputter
-   `getRelasiMengajar(sessionId, idGuru, kelas, tanggal)` → Nyisipkan
    idRelasi/hari/mapel ke record absensi

#### 📋 Rekap Engine (Paling Kompleks)

    Pipeline:
    getRekapFinal(session, tglAwal, tglAkhir, guru, kelas, mode)
    ├─ mode "umum"  → getRekapUmum()   (tanpa filter)
    ├─ mode "guru"  → getRekapGuru()   (filter by idRelasi GuruMengajar)
    └─ mode "wali"  → getRekapWali()   (filter by kelas)
       ↓
    getDataRekap → mergeDataRekap (join masterSiswa ↔ absensi by NISN)
       ↓
    hitungRekap (aggregate H/S/I/A → hitung % → Keterangan 7 level)

**7 Level Keterangan Kelulusan:** 1. 100% → Sempurna 2. ≥95% → Sangat
Baik 3. ≥90% → Baik 4. ≥85% → Cukup Baik 5. ≥75% → Perlu Peningkatan 6.
≥50% → Perlu Perhatian 7. \<50% → Perlu Tindak Lanjut

#### 📥 Template & Import Massal

-   `createTemplateSpreadsheet(fileName, headers, sheetName)` → Factory:
    buat sheet import + styling bold header biru + freeze row
-   `downloadTemplateSiswa()` / `downloadTemplateMapel()` /
    `downloadTemplateGuruMengajar()`
-   `setDropdownValidation()` → Apply DataValidation dropdown ke
    template (Guru/Kelas/Hari/Mapel/Status)
-   `importSiswa(session, rows)` → cek unique id dan nisn (skip
    duplikat)
-   `importMapel(session, rows)` → skip duplikat nama mapel
-   `importGuruMengajar(session, rows)` → lookup nama→id untuk
    Guru/Kelas

#### 📤 Export Excel (Rekap)

-   `exportRekapExcel(session, tglAwal, tglAkhir, guru, kelas, guruText)`
    → Buat spreadsheet baru dengan:
    -   Kop surat "MIS TANBIHUL ATHFAL"
    -   Info periode, guru/kelas, tahun ajaran, semester
        (Ganjil=Juli-Des, Genap=Jan-Jun)
    -   Styling border, alignment, header hijau `#D9EAD3`
    -   Lebar kolom presisi (No:55, NISN:120, Nama:230, dst)
    -   Freeze 8 row atas + CreateFilter + HiddenGridlines
    -   Return `{spreadsheetId, exportUrl}`
-   `cleanupExportSpreadsheet(id)` → Pindahkan ke trash setelah
    didownload

#### ⚙️ Pengaturan

-   `getAcademicSettings()` / `saveAcademicSettings()` → Sheet
    Pengaturan format key-value

------------------------------------------------------------------------

### C. Frontend Shell - **[index.html](file:///d:/PROJECT/WONG_MIT/index.html)** (12.735 baris)

File ini adalah **kerangka SPA tunggal**. Isinya:

**Bagian 1 - HEAD (CDN & Design System):** - Bootstrap 5.3.3 CDN, Font
Awesome 6.5.2, Google Font Poppins - \~1900 baris CSS custom design
tokens: - `--primary: #0b2d6b` (biru tua), `--gold: #d4af37` (emas) -
`--radius-card: 22px` + `shadow-card` - Mobile-first responsive
(breakpoint 768px) - Sidebar offcanvas untuk mobile, tombol toolbar
ganda atas-bawah

**Bagian 2 - BODY (Layout Statis):** - `#appRoot` wrapper → `.sidebar`
(fixed 260px biru tua + logo + 9 menu) + `.content` area -
`#mainContent` → Tempat page HTML di-render DINAMIS (SPA container) -
**Global Modals**: `#modalDashboard`, `#modalKonfirmasiGlobal`,
`#toastContainer`

**Bagian 3 - Core Frontend Functions:** - **SPA Router**:
`loadPage(pageName)` → Panggil `google.script.run.getPage(pageName)` →
inject HTML ke `#mainContent` → jalankan init function tiap page -
**Role-based Menu Visibility**: `applyRoleMenu()` → hide/show menu
sidebar berdasarkan role di localStorage - **Session Check
(window.onload)**: Baca `wongmit_session` dari localStorage → cek ke
server → valid → `showMainApp()` / tidak valid → `showLoginPage()` -
**Auth**: `loginUser()` → `logoutUser()` → simpan 4 key localStorage:
`wongmit_session`, `wongmit_nama`, `wongmit_role`, `wongmit_idguru` -
**Responsive**: `isMobileLayout()`, `updateResponsiveLayout()`, sidebar
toggle - **Header Clock**: `updateHeaderDateTime()` dengan nama hari
Indonesia, update setiap detik - **Realtime Clock Date**: Riwayat
username login (10 item terakhir) via localStorage
`wongmit_login_history`

**Bagian 4 - UI Helper Pattern:** - Toast (`showToast(pesan, tipe)`:
success/error/warning) - Confirm Dialog
(`showConfirmModal(judul, pesan, callback)`) - Button Loading Management
(multi-pattern): `startButtonLoading` / `successButtonLoading` /
`stopButtonLoading` + `lockButton(id)` / `unlockButton(id)` → mencegah
double submit - Draft Absensi: `simpanDraftAbsensi()` /
`pulihkanDraftAbsensi()` → client-side cache saat resize mobile↔desktop

**Bagian 5 - CRUD Frontend:** - Siswa: `showTambahSiswa`,
`editSiswa(id)`, `simpanSiswa()`, `hapusSiswa(id)`, `filterSiswa()`,
`sortTable(col)` - Guru: `showTambahGuru`, `editGuru(id)`,
`simpanGuru()` (role multiple checkbox → comma separated) - Kelas:
`showTambahKelas`, `editKelas(id)`, `simpanKelas()` - Mapel:
`bukaModalMapel`, `editMapel(id)`, `simpanMapel()`, `hapusMapel(id)` →
**safety check**: jika masih terpakai di GuruMengajar → tampilkan
`#modalMapelUsage` dengan tabel detail guru/kelas/hari - GuruMengajar:
`bukaModalGuruMengajar`, `editGuruMengajar(idRelasi)`,
`simpanGuruMengajar()` (checkbox mapel → join dengan `|`) - GuruKelas:
`showTambahGuruKelas`, `simpanGuruKelas()`

**Bagian 6 - Absensi Flow (Frontend):** - `loadStudentsByClass()` →
Render dual layout: `#tableAbsensi` (desktop) +
`#mobileAbsensiContainer` (card based) - `setStatusAbsen(nisn, status)`
→ 4 tombol H/S/I/A warna berbeda (H=hijau, S=biru, I=kuning, A=merah) -
`hadirSemua()` → Set status "Hadir" ke semua siswa -
`loadExistingAttendance()` → Cek apakah sudah ada absen: - **Belum ada**
→ modeAbsensi="baru", enable "Hadir Semua" - **Sudah ada** →
modeAbsensi="revisi", tombol ganti jadi "Revisi Absen". Klik →
`mulaiRevisiAbsensi()` → `konfirmasiRevisiAbsensi()` → unlock edit -
`simpanAbsensi()` → Validasi semua sudah punya status → ada yang kosong
→ highlight merah + `#modalWarningAbsensi` - mode "baru" → langsung
`saveAttendance()` - mode "revisi" → `konfirmasiSimpanRevisi()` →
`simpanRevisiFinal()` → `reviseAttendance()`

**Bagian 7 - Rekap Flow (Frontend):** - `loadRekap()` → Default rentang
tanggal 1 bulan ini, setup event handler filter - `updateFilterRekap()`
/ `updateFilterGuruRekap()` → 3 mode radio: Umum, Guru, Wali → cascading
dropdown - `tampilkanRekap()` → `getRekapFinal()` → render tabel 9
kolom - `exportRekapExcel()` → `exportRekapExcel()` backend →
`window.open(result.exportUrl)` → cleanup

**Bagian 8 - Import Massal Engine (SheetJS/XLSX):** *(Library dimuat di
baris terakhir: `<script src="...xlsx.full.min.js">`)* -
`readExcelFile(file, callback)` → `XLSX.read()` binary →
`XLSX.utils.sheet_to_json(header:1)` - `uploadImportEngine(config)` →
Generic upload wrapper - `initImportDragDrop(config)` → Click +
dragover + dragleave + drop handler (visual feedback biru) - **Validasi
Template**: `renderPreviewSiswa`, `renderPreviewMapel`,
`renderPreviewGuruMengajar` - Cek header EXACT match (misal: Siswa
harus: ID,NISN,Nama Siswa,JK,Tempat Lahir,Tanggal Lahir,Kelas,Status) -
Cek enum value: JK harus L/P; Status Siswa harus Aktif/Lulus/Mutasi;
Hari harus Ahad/Senin/Selasa/Rabu/Kamis/Sabtu (TIDAK ADA JUMAT!); Mapel
harus terdaftar di Master - Highlight cell error merah, ringkasan
Total/Valid/Error, tombol upload disabled jika error \> 0 - **Upload**:
`uploadImportSiswa()` → `uploadImportMapel()` →
`uploadImportGuruMengajar()`

------------------------------------------------------------------------

### D. Template Pages (di-render oleh `getPage()`)

Semua page **HANYA BERISI HTML STRUKTUR** (tanpa script/logic). Fungsi
inisialisasi dijalankan di `loadPage()` callback di index.html.

  ----------------------------------------------------------------------------------------------------------------------
  Page                                                                               Fungsi Utama
  ---------------------------------------------------------------------------------- -----------------------------------
  **[page_login.html](file:///d:/PROJECT/WONG_MIT/page_login.html)**                 Form login username+password,
                                                                                     toggle show password, riwayat
                                                                                     username dropdown

  **[page_dashboard.html](file:///d:/PROJECT/WONG_MIT/page_dashboard.html)**         4 Stat Card: Total
                                                                                     Siswa/Guru/Kelas/Hadir (clickable →
                                                                                     modal detail absen per kelas) +
                                                                                     User Profile card

  **[page_siswa.html](file:///d:/PROJECT/WONG_MIT/page_siswa.html)**                 Split button Tambah Manual/Import
                                                                                     Massal, 9 kolom sortable, modal
                                                                                     form 8 field, modal import
                                                                                     (dragdrop + preview)

  **[page_guru.html](file:///d:/PROJECT/WONG_MIT/page_guru.html)**                   Search, 6 kolom, modal form: ROLE
                                                                                     MULTIPLE CHECKBOX
                                                                                     (Admin/Kepsek/WaliKelas/GuruMapel →
                                                                                     comma separated)

  **[page_kelas.html](file:///d:/PROJECT/WONG_MIT/page_kelas.html)**                 Search, 5 kolom (join nama
                                                                                     WaliKelas), modal form dropdown
                                                                                     WaliKelas dinamis

  **[page_gurukelas.html](file:///d:/PROJECT/WONG_MIT/page_gurukelas.html)**         3 kolom (Guru/Kelas/Aksi), modal
                                                                                     dropdown sederhana

  **[page_gurumengajar.html](file:///d:/PROJECT/WONG_MIT/page_gurumengajar.html)**   DUA SECTION (Mapel + GuruMengajar),
                                                                                     6 modal total (2 import, 2 form,
                                                                                     delete confirm, mapel usage
                                                                                     warning)

  **[page_absensi.html](file:///d:/PROJECT/WONG_MIT/page_absensi.html)**             4 field filter, info card inputter,
                                                                                     toolbar ATAS+BAWAH, 2 layout tabel
                                                                                     (desktop+mobile), 3 modal spesial
                                                                                     revisi

  **[page_rekap.html](file:///d:/PROJECT/WONG_MIT/page_rekap.html)**                 Filter grid 8 kolom, 3 radio mode
                                                                                     rekap, loading spinner, tombol
                                                                                     Export Excel

  **[page_pengaturan.html](file:///d:/PROJECT/WONG_MIT/page_pengaturan.html)**       4 Card menu: Akademik (READY: form
                                                                                     edit tahun ajaran/semester/hari
                                                                                     libur checkbox) + 3 placeholder
                                                                                     lainnya
  ----------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 4. HUBUNGAN ANTAR FILE

    ┌─────────────────────────────────────────────────────────────┐
    │                    USER BROWSER CLIENT                      │
    └─────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
    ┌─────────────────────────────────────────────────────────────┐
    │ [index.html] ──────── SHELL SPA TUNGGAL ────────────────── │
    │                                                              │
    │  window.onload ──────────────────────────────────────┐      │
    │  ├─ localStorage session check                         │      │
    │  └─ checkSession() ───── google.script.run ────────── │      │
    │                                                       │      │
    │  loadPage(pageName) ← menu click                      │      │
    │  └─ getPage(pageName) ──── google.script.run ──────┐  │      │
    │     └─ inject HTML ke #mainContent + run init()    │  │      │
    │                                                    │  │      │
    │  All CRUD / Absen / Rekap / Import functions       │  │      │
    │  └─ semua panggil google.script.run                │  │      │
    └────────────────────────────────────────────────────┼──┼──────┘
                                                         │  │
                                  ┌──────────────────────┘  │
                                  │                         │
                                  ▼                         ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │ [Code.js] ─ BACKEND SERVER TERINTEGRASI (Apps Script Runtime)  │
    │                                                                 │
    │  doGet() → render index.html shell + include                    │
    │                                                                 │
    │  getPage(pageName) → read file HTML → return string ───────────┘
    │     ├─ page_login.html
    │     ├─ page_dashboard.html
    │     ├─ page_siswa.html
    │     ├─ page_guru.html
    │     ├─ page_kelas.html
    │     ├─ page_gurukelas.html
    │     ├─ page_gurumengajar.html
    │     ├─ page_absensi.html
    │     ├─ page_rekap.html
    │     └─ page_pengaturan.html
    │                                                                 │
    │  All CRUD Functions                                             │
    │  └─ SpreadsheetApp.openById() → getSheetByName() → operasi     │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
    ┌─────────────────────────────────────────────────────────────┐
    │             GOOGLE SHEETS SEBAGAI DATABASE                   │
    │                                                              │
    │  📑 Sheet: Siswa   (8 kolom)  ← Master Siswa                │
    │  👤 Sheet: Guru    (6 kolom)  ← Master Guru + Credentials   │
    │  🏫 Sheet: Kelas   (4 kolom)  ← Master Kelas + WaliKelas    │
    │  📘 Sheet: Mapel   (4 kolom)  ← Master Mata Pelajaran      │
    │  👨‍🏫 Sheet: GuruMengajar (6) ← Relasi Guru↔Kelas↔Hari↔Mapel │
    │  🔗 Sheet: GuruKelas (2)     ← Relasi Sederhana Guru-Kelas │
    │  📅 Sheet: Absensi (11)      ← Record Absensi Harian       │
    │  ⚙️ Sheet: Pengaturan (2)    ← Key-Value Setting           │
    │  🔐 Sheet: Session   (6)     ← Session ID Tracking         │
    └─────────────────────────────────────────────────────────────┘

**Pola Hubungan Kunci:**

1.  **index.html ↔ Code.js** → Komunikasi async via
    `google.script.run.withSuccessHandler().withFailureHandler().namaFungsi(params)`
2.  \*\*Code.js ↔ page\_\*.html** → Relasi **Template Include\*\*:
    `getPage()` baca file HTML sebagai plain string, dikirim ke client,
    di-inject ke `#mainContent`
3.  \*\*page\_\*.html ↔ index.html\*\* → Semua function handler onclick
    di page template merujuk ke function yang didefinisikan DI
    INDEX.HTML (bukan di page file sendiri)
4.  **Sheet Session ↔ Semua Operasi** → Setiap protected operation
    parameter pertama selalu `sessionId` dari localStorage, dicek via
    `checkRole()` di Code.js
5.  **Sheet GuruMengajar ↔ Sheet Absensi** → Kolom `idRelasi` (index 7)
    di Sheet Absensi merujuk ke Sheet GuruMengajar untuk Rekap mode
    "guru"
6.  **Import Flow**: Client parse Excel dengan SheetJS → Kirim `rows[]`
    2D array ke backend → Backend append ke Sheet yang sesuai

------------------------------------------------------------------------

## 5. WORKFLOW APLIKASI

### Alur Lengkap dari Awal sampai Akhir

     [USER BUKA URL WEB APP]
              │
              ▼
     window.onload di index.html
              │
              ├─ Cek localStorage.wongmit_session ADA?
              │
              ├─ TIDAK ADA ──────────────────────────┐
              │                                       │
              │  ADA                                   │
              ▼                                       ▼
     checkSession(sessionId) ke server          showLoginPage()
              │                              loadPage("page_login")
              ├─ VALID?                              │
              │                                      │
              ├─ TIDAK ──► localStorage.clear()      ├─ User isi username+password
              │         └─► showLoginPage()          │    (Enter / klik Masuk)
              │                                      │
              ▼                                      ▼
     showMainApp()                            loginUser()
     applyRoleMenu() ─ hide/show menu        checkLogin(u,p) ke server
     updateHeaderDateTime() ── interval 1s        │
     loadPage("page_dashboard")                    ├─ SUKSES:
              │                                    │   localStorage set 4 keys
              │                                    │   showMainApp()
              │                                    │   loadPage("page_dashboard")
              │                                    │
              │                                    └─ GAGAL: toast error
              ▼
     ┌──── MENU DASHBOARD ────┐
     │  4 Card Statistik      │
     │  + Click Hadir Card    │
     │    → show detail per   │
     │    kelas di modal      │
     └────────────────────────┘
              │
              ▼ (User pilih menu via sidebar)
     ┌──────────────────────────────────────────────────────────────┐
     │                                                              │
     │  📋 MASTER DATA MENU (Admin/Kepsek)                          │
     │  ├─ Data Siswa       → CRUD + Sort + Filter + Import XLSX   │
     │  ├─ Data Guru        → CRUD + Role Multi-Checkbox           │
     │  ├─ Data Kelas       → CRUD + WaliKelas Dropdown            │
     │  ├─ Guru ↔ Kelas     → Relasi Sederhana                     │
     │  ├─ Guru Mengajar    → Mapel CRUD + Relasi CRUD             │
     │  │                     + 2 jenis Import Massal               │
     │  └─ Pengaturan       → Akademik (READY) + 3 placeholder     │
     │                                                              │
     │  ✏️ ABSENSI HARIAN (Semua Role)                              │
     │  ├─ Pilih Kelas (terfilter role)                             │
     │  ├─ Pilih Tanggal → auto nama hari                           │
     │  ├─ [mode="baru"]: Hadir Semua → klik H/S/I/A per siswa      │
     │  ├─ [mode="revisi"]: tombol Revisi → unlock → ubah → simpan │
     │  │               (hapus record lama → append baru)          │
     │  └─ Draft auto tersimpan saat resize mobile↔desktop         │
     │                                                              │
     │  📊 REKAP ABSENSI (Semua Role)                               │
     │  ├─ Pilih rentang tanggal                                    │
     │  ├─ 3 Mode Radio: Umum / Guru / Kelas (cascading filter)   │
     │  ├─ Tampilkan → Tabel 9 kolom: No,Nama,Kelas,H,S,I,A,%,Ket  │
     │  └─ Export Excel → Download .xlsx format kop surat          │
     │                     (Spreadsheet sementara → Trashed)       │
     │                                                              │
     │  🚪 LOGOUT                                                   │
     │  └─ logoutSession() → set LogoutAt → localStorage.clear()  │
     │     → redirect login                                        │
     └──────────────────────────────────────────────────────────────┘

------------------------------------------------------------------------

## 6. HAL-HAL PENTING SEBELUM MEMULAI DEVELOPMENT

### 🔐 Keamanan & Akses

1.  **Web App PUBLIK**: `access: ANYONE_ANONYMOUS` --- SIAPAPUN DENGAN
    URL BISA MENGAKSES tanpa login Google. Keamanan HANYA bergantung
    pada username+password custom di Sheet Guru.
2.  **Password PLAINTEXT**: Sheet Guru kolom 3 `password` disimpan
    sebagai PLAIN TEKST, TIDAK di-hash. Risiko tinggi jika file Sheet
    di-share.
3.  **Session ID simple**: Format `SID_{idGuru}_{timestamp}` --- mudah
    ditebak jika timestamp diketahui. Tidak ada token random secure.
4.  **Session ID DISIMPAN DI LOCALSTORAGE**: Risiko XSS (jika ada celah
    inject script).
5.  **Tidak ada Session Expired otomatis**: Hanya di-set Logout saat
    user klik logout. Bisa jadi "Aktif" selamanya.
6.  **Semua role dicek di Backend + Frontend**: Di `loadPage()` frontend
    ada guard, di backend setiap fungsi juga `checkRole()`. TAPI
    pengembang harus SELALU menambahkan `checkRole()` di backend untuk
    fungsi baru --- tidak boleh andalkan frontend saja.

### 📊 Struktur Database (Sheet) --- WAJIB TAHU

7.  **9 Sheet utama** dengan struktur kolom ORDER SENSITIVE (semua akses
    pakai index array, JANGAN SAMPEK SUSUNAN KOLOM DIUBAH): \| Sheet \|
    Kolom (index 0 dst) \| \|---\|---\| \| Siswa \| ID, NISN, Nama, JK,
    TempatLahir, TanggalLahir, Kelas, Status \| \| Guru \| ID, NamaGuru,
    Username, Password(plain!), Role(comma), Status \| \| Kelas \| ID,
    NamaKelas, ID_WaliKelas, Status \| \| Mapel \| ID(MPxxxxx), Nama,
    Kelompok(PAI/Umum/Mulok), Status \| \| GuruMengajar \| ID_Relasi,
    ID_Guru, Kelas, Hari, Mapel(\| separated), Status \| \| GuruKelas \|
    ID_Guru, NamaKelas \| \| Absensi \| Tanggal, NISN, Nama, Kelas,
    Status(H/S/I/A), (kosong!), InputOleh(nama), ID_Relasi, Hari, Mapel,
    Timestamp \| \| Pengaturan \| Key, Value \| \| Session \| SessionId,
    ID_Guru, NamaGuru, CreatedAt, LogoutAt, Status(Aktif/Logout) \|
8.  **Row 1 Semua Sheet = HEADER**: Semua `getRange()` di Code.js selalu
    `getRange(2, 1, lastRow-1, ...)` untuk skip header. Jangan
    hapus/ubah baris 1.
9.  **Enum values yang HARDCODED** (jangan salah nilai):
    -   Status Siswa: `Aktif` / `Lulus` / `Mutasi`
    -   Status Guru: `Aktif` / `Nonaktif` / `Pensiun` / `Mutasi`
    -   JK: `L` / `P`
    -   Kelompok Mapel: `PAI` / `Umum` / `Mulok`
    -   Hari di GuruMengajar:
        `Ahad`/`Senin`/`Selasa`/`Rabu`/`Kamis`/`Sabtu` --- **PERHATIAN:
        TIDAK ADA "JUMAT"!** (Fitur hard-exclude Jumat).
    -   Role: `Admin` / `KepalaSekolah` / `WaliKelas` / `GuruMapel`
        (case sensitive, multiple dengan comma)

### 🧩 Arsitektur & Pola Desain

10. **Single Monolith Code.js (6.678 baris)**: Tidak ada modularisasi
    file. Untuk menambah fitur, edit Code.js di bagian yang sesuai.
    Pertimbangkan dipecah nanti jika makin besar.
11. **Pola `google.script.run` SELALU**:
    `withSuccessHandler(function(result){...}).withFailureHandler(function(error){...}).namaFungsiBackend(params)`.
12. **Pola Edit Form**: `modeForm = "tambah"/"edit"` +
    `editXxxRow = rowIndex` (untuk update by row index, bukan by ID ---
    JANGAN SAMPAI ada sorting sheet, nanti row index salah!).
13. **Pola Import Massal**: Download template (dengan DataValidation
    dropdown) → User isi → Drag drop → Preview (validasi header + enum)
    → Upload (kirim rows 2D ke backend) → Backend cek unique constraint
    → return `{berhasil: N, gagal: M}`.
14. **Pola Revisi Absensi (PENTING!)**: BUKAN update record existing,
    tapi HAPUS SEMUA record kelas+tanggal TERSEBUT (loop dari BAWAH ke
    ATAS untuk mencegah index meleset) → APPEND ULANG yang baru. Alasan:
    Sheet tidak punya unique key per pertemuan.
15. **Pola Export Excel**: Buat Spreadsheet baru di Drive → Isi dengan
    styling → Return URL export → User download via window.open →
    `cleanupExportSpreadsheet()` memindahkan ke Trash (tidak permanen
    hapus).
16. **Dual Layout Absensi**: Saat resize window melewati 768px, draft
    absensi disimpan dulu → layout di-render ulang dari server → draft
    dipulihkan. Pengalaman user tidak hilang.

### 🎨 Frontend

17. **Semua fungsi JS di index.html GLOBAL**: Jangan buat nama function
    bentrok.
18. **CDN Dependencies (tanpa fallback offline)**:
    -   Bootstrap 5.3.3:
        `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js`
    -   Font Awesome 6.5.2:
        `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css`
    -   SheetJS XLSX:
        `https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js`
    -   Google Font Poppins → Jika CDN mati / jaringan buruk, aplikasi
        TIDAK BISA berjalan.
19. **Design Tokens di CSS index.html**: `--primary:#0b2d6b`,
    `--gold:#d4af37`, `--radius-card:22px`. Untuk ubah tema, edit CSS di
    HEAD index.html.
20. **Tombol Toolbar Ganda di Absensi (ATAS + BAWAH)**: Semua state
    (loading/disabled/text) disync via helper khusus
    (`setSimpanAbsensiDisabled`, `startSimpanAbsensiLoading`, dll). Saat
    menambah tombol, pastikan update kedua-duanya.
21. **localStorage keys yang dipakai** (jangan bentrok dengan app lain
    di domain yang sama):

-   `wongmit_session`, `wongmit_nama`, `wongmit_role`, `wongmit_idguru`
-   `wongmit_login_history` (array username max 10)

### ⚙️ Deployment & Tooling

22. **CLASP Deployment**: Setelah edit lokal, jangan lupa `clasp push`
    untuk sync ke Apps Script cloud, lalu
    `Deploy → Manage Deployments → New version` di Apps Script Editor.
    Deploy versi lama URL-nya SAMA --- tidak perlu ganti URL embed.
23. **scriptId tetap**:
    `1Yth-V706tevJRdsr2Y4rjMkBVHxyx899g1BNwXlsIGu04U7sOaK9O5eo` --- jika
    project dipindah, update .clasp.json
24. **Quota Apps Script**: Eksekusi batas 6 menit per call, URL Fetch
    50MB, dll. Untuk import/export data BESAR (ribuan row), bisa kena
    quota timeout.
25. **Execution mode = USER_DEPLOYING**: Semua Sheet/Drive diakses
    sebagai account deploy (account yang punya Apps Script project).
    Pastikan account tersebut punya akses EDIT ke Sheet database.

### 🐛 Potensi Bug Yang Perlu Diwaspadai

26. **Row Index Pattern untuk Update**:
    `updateTeacher(session, editGuruRow, data)` dan
    `updateGuruMengajar()` update berdasarkan nomor BARIS (rowIndex),
    bukan berdasarkan ID. JANGAN PERNAH sorting / memindahkan baris di
    Sheet Guru / GuruMengajar secara manual, karena akan menyebabkan
    edit data salah sasaran.
27. **Reverse Loop Delete di reviseAttendance**: Hanya aman jika
    delete + append dalam satu call yang sama tanpa operasi sheet lain
    di tengah.
28. **Tanggal Absensi Format**: Semua tanggal dalam format `yyyy-mm-dd`
    dari HTML input, tapi saat disimpan ke Sheet berubah menjadi Date
    object. Perbandingan tanggal harus konsisten.
29. **Multi-Role Split**: Semua cek role harus pakai `role.split(",")`
    --- jangan `role === "WaliKelas"` (gagal jika user punya
    multi-role).
30. **Mapel dihapus tapi masih terpakai**: Sudah ada safety check
    `getMapelUsage()` sebelum delete, tapi **GURU KELAS & GURU MENGAJAR
    tidak ada cascade check** jika Guru/Kelas yang dihapus masih dipakai
    di absensi/rekap lama.

### ✅ Checklist "Hello World" sebelum mengembangkan:

1.  Clone / buka folder `d:\PROJECT\WONG_MIT\`
2.  Install clasp: `npm install -g @google/clasp`
3.  Login clasp: `clasp login`
4.  Coba `clasp pull` dulu sebelum push (hindari overwrite versi terbaru
    di cloud)
5.  Buka Apps Script Editor → cek Execution Log saat test
6.  Buka Sheet Database → pastikan 9 sheet di atas ada + row 1 header
    sesuai
7.  Buat 1 user test: Tambah row di Sheet Guru dengan role `Admin`, coba
    login
8.  Cek Console DevTools → Pastikan tidak ada error CDN blocked

------------------------------------------------------------------------

Itulah analisis 6 poin lengkap. Jika Anda butuh penjelasan lebih detail
untuk bagian tertentu (misal flow revisi absensi, pola import, atau
mapping RBAC per fungsi), silakan tanya.

toolName: todo_write

status: success

Todos updated: 3 items

Analisis selesai. Tidak ada kode yang diubah, hanya pembacaan dan
dokumentasi sesuai permintaan Anda. Semua file 14 buah telah dibaca
lengkap (Code.js 6.678 baris, index.html 12.735 baris, dan 9 page
template HTML).
