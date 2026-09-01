# WONG MIT — AUDIT SPRINT 3 → SPRINT 4

Tanggal: 2026-09-01
Status: AUDIT SELESAI — BASELINE SPRINT 4 DITETAPKAN

## 1. Baseline yang diverifikasi

### SPRINT.md

- Sprint 3 telah ditutup sebagai CLOSED.
- Rangkaian identity aplikasi, consumer branding, Dashboard identity, dan Pengaturan Sekolah telah dicatat sebagai selesai.
- Pengelolaan UI `nama_aplikasi`, `tagline_aplikasi`, `logo_aplikasi`, `favicon`, `versi_aplikasi`, `mode_maintenance`, Backup, Restore, dan Log Aktivitas belum dinyatakan selesai pada Sprint 3.

### PROJECT_STATUS.md

- Identity aplikasi dan identity sekolah sudah dipisahkan.
- `getAppInfo()` tetap menjadi owner identity aplikasi.
- Pengaturan Sekolah dinyatakan selesai.
- Pengaturan Sistem dan Pengaturan Tahun Ajaran masih merupakan pekerjaan lanjutan.

### ARCHITECTURE.md

- Boundary identity aplikasi dan identity sekolah konsisten dengan implementasi Sprint 3.
- `getAppInfo()` adalah contract owner identity aplikasi dan dapat digunakan pre-login.
- Backend dan frontend tetap dipisahkan.
- `index.html` berfungsi sebagai shell/orchestrator.
- Modul domain memiliki boundary backend/frontend masing-masing.

### DATABASE.md

- Sheet `Pengaturan` tetap menggunakan kontrak `Key | Value`.
- Key identity aplikasi yang sudah terdokumentasi: `nama_aplikasi`, `tagline_aplikasi`, `logo_aplikasi`, `favicon`, `versi_aplikasi`.
- `mode_maintenance` tersedia tetapi belum menjadi consumer aktif.
- Tidak ada perubahan header, nama Sheet, atau struktur database pada transisi Sprint 3 → 4.

## 2. Temuan penting

1. Dokumentasi Sprint 3 dan architecture sudah memiliki boundary identity yang cukup untuk membuka Sprint 4.
2. Card Sistem pada UI masih berupa placeholder/fondasi dan belum memiliki consumer backend operasional.
3. `getAppInfo()` tetap harus dipertahankan sebagai reader identity aplikasi pre-login; Card Sistem tidak boleh menggantikannya.
4. `logo_aplikasi` dan `favicon` harus dikelola sebagai identity aplikasi, bukan identity sekolah.
5. `mode_maintenance` perlu memiliki kontrak yang jelas sebelum digunakan sebagai gate runtime. Sprint awal tidak boleh langsung memblokir seluruh aplikasi tanpa desain flow maintenance dan fallback yang disepakati.
6. Backup/Restore/Log Aktivitas merupakan domain berisiko lebih tinggi daripada sekadar konfigurasi identity dan harus dipisahkan dari implementasi awal Card Sistem.

## 3. Keputusan teknis Sprint 4 awal

Sprint 4 dimulai secara incremental dari **System Settings Reader/Writer Foundation**.

Boundary awal:

- Backend: `apps-script/Sistem.js`
- UI existing: `page_pengaturan.html`
- Frontend logic existing: `js_pengaturan.html`

Kontrak awal backend:

- `getSystemSettings(sessionId)` — Admin-only.
- `saveSystemSettings(sessionId, data)` — Admin-only.

Field yang menjadi domain Card Sistem:

- `nama_aplikasi`
- `tagline_aplikasi`
- `logo_aplikasi`
- `favicon`
- `versi_aplikasi`
- `mode_maintenance`

Aturan penting:

- `getAppInfo()` tidak diganti.
- Kontrak `getAppInfo()` tidak diubah.
- `getSchoolIdentity()` tidak diubah.
- `saveSchoolIdentity()` tidak lagi menjadi owner UI Card Sistem.
- Sheet `Pengaturan` tetap `Key | Value`.
- Undefined tidak boleh menimpa nilai lama.
- Tidak ada perubahan struktur database.

## 4. Yang belum boleh dinyatakan DONE

- UI Card Sistem operasional.
- Edit/Save System Settings dari frontend.
- Favicon runtime consumer.
- Maintenance gate runtime.
- Backup.
- Restore.
- Log Aktivitas.
- Production deployment Sprint 4.

Semua item di atas harus memiliki testing sendiri sebelum dicatat sebagai SELESAI.

## 5. Status

Audit Sprint 3 → 4: SELESAI.

Sprint 4: DIBUKA.

Implementasi pertama: System Settings Backend Foundation.

Catatan: commit source backend pertama Sprint 4 harus diuji di GAS Uji sebelum dianggap sebagai sprint selesai.
