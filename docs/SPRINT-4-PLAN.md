# WONG MIT — SPRINT 4 PLAN

Status: ACTIVE
Tanggal mulai: 2026-09-01

## Tujuan

Menyelesaikan Card Sistem pada Pengaturan secara bertahap, aman, modular, dan backward compatible.

## Urutan kerja

### 4A — System Settings Backend Foundation

Status: DONE — CLOSED

Endpoint:
- `getSystemSettings(sessionId)`
- `saveSystemSettings(sessionId, data)`

Role: Admin-only.

Field:
- `nama_aplikasi`
- `tagline_aplikasi`
- `logo_aplikasi`
- `favicon`
- `versi_aplikasi`
- `mode_maintenance`

File: `apps-script/Sistem.js`

### 4B — Card Sistem UI

Status: DONE — CLOSED

- Preview → Detail → Edit.
- Load melalui `getSystemSettings()`.
- Save melalui `saveSystemSettings()`.
- Admin-only untuk edit/save.
- Tidak mengubah consumer identity existing.

### 4C — Application Asset Management

Status: DONE — CLOSED & LOLOS (scope implementasi). Asset Management selesai pada 4C; favicon consumer webapp Apps Script dinamis. Integrasi favicon production wrapper TIDAK termasuk 4C — diselesaikan melalui Micro-Fix terpisah SETELAH 4C (production LOLOS; lihat bagian Micro-Fix di bawah).

- Logo aplikasi.
- Favicon.
- Upload/replace/delete dengan pola aman.
- Reuse resolver asset existing.
- Tidak mengubah File ID menjadi format penyimpanan baru.

### Micro-Fix — Integrasi Favicon GitHub Pages Wrapper (pasca-4C, bukan sprint baru)

Status: DONE — production LOLOS.

- Favicon tab browser production kini mengikuti favicon Card Sistem melalui postMessage bridge: root GitHub Pages wrapper → iframe Apps Script → `getAppInfo().faviconUrl` → postMessage → root wrapper → `<link rel="icon">` → tab browser.
- File yang diubah: root `index.html` + `apps-script/index.html` (fallback `https://iili.io/CU1QcrJ.png` dipertahankan; validasi URL ketat hostname `drive.google.com` saja).
- Commit: `b5178a8` — `fix(wrapper): sync dynamic favicon from app iframe`.
- Saat `/exec` dibuka langsung, favicon tab tetap favicon bawaan Google Apps Script (batasan platform, bukan failure).
- Urutan tetap: 4A DONE → 4B DONE → 4C DONE → Micro-Fix favicon wrapper DONE → 4D Maintenance Mode.

### 4D — Maintenance Mode

- Definisikan gate runtime terlebih dahulu.
- Tentukan siapa yang tetap boleh masuk saat maintenance.
- Pastikan fallback/error-safe.
- Tidak mengaktifkan hard gate sebelum QA.

### 4E — Backup

- Audit struktur data terlebih dahulu.
- Backup harus read-only terhadap sumber.
- Tidak mengubah Sheet production.
- File hasil backup memiliki identitas dan timestamp yang jelas.

### 4F — Restore

- Admin-only.
- Konfirmasi eksplisit.
- Validasi sumber backup.
- Tidak boleh overwrite production tanpa guard dan validasi.
- Audit penuh sebelum implementasi.

### 4G — Log Aktivitas

- Tentukan event yang benar-benar perlu dicatat.
- Tidak mencatat data sensitif secara berlebihan.
- Gunakan Sheet `Log` existing.
- Tidak mengubah struktur header tanpa persetujuan.

### 4H — Final QA & Production

- Syntax.
- `git diff --check`.
- GAS Uji.
- Desktop.
- Mobile.
- Role/authorization.
- Regression lintas modul.
- Production deployment.
- Update dokumentasi hanya berdasarkan hasil yang benar-benar selesai.

## Aturan

- Move, Don't Rewrite.
- Satu sprint = satu boundary yang jelas.
- Tidak menyentuh modul frozen tanpa bug nyata.
- Tidak mengubah database/header tanpa persetujuan.
- Tidak mencatat pekerjaan sebagai DONE sebelum testing.
- Tidak menggabungkan Backup/Restore/Maintenance dengan perubahan identity secara diam-diam.
