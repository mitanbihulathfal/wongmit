# WONG MIT — SPRINT 4 PLAN

Status: ACTIVE
Tanggal mulai: 2026-09-01

## Tujuan

Menyelesaikan Card Sistem pada Pengaturan secara bertahap, aman, modular, dan backward compatible.

## Urutan kerja

### 4A — System Settings Backend Foundation

Status: IMPLEMENTED — MENUNGGU TESTING GAS UJI

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

- Preview → Detail → Edit.
- Load melalui `getSystemSettings()`.
- Save melalui `saveSystemSettings()`.
- Admin-only untuk edit/save.
- Tidak mengubah consumer identity existing.

### 4C — Application Asset Management

- Logo aplikasi.
- Favicon.
- Upload/replace/delete dengan pola aman.
- Reuse resolver asset existing.
- Tidak mengubah File ID menjadi format penyimpanan baru.

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
