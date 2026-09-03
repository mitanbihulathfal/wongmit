/* =========================
   PENGATURAN SISTEM
   Sprint 4 — Card Sistem
========================= */

/* =========================
   MAINTENANCE MODE (Sprint 4D)
   Helper pembacaan mode_maintenance
   LANGSUNG dari Sheet Pengaturan
   (fresh read, tanpa cache) agar
   toggle terasa segera oleh semua
   gate (checkLogin / checkSession /
   checkRole di Auth.js).
   - Fail-open KHUSUS kegagalan
     pembacaan Maintenance: Sheet
     tidak ada / error baca ->
     dianggap OFF, agar kerusakan
     infrastruktur tidak mengunci
     seluruh pengguna.
   - Normalisasi eksplisit: hanya
     true / "true" / "on"
     (case-insensitive) yang aktif;
     kosong/tidak valid -> OFF.
   - Tidak men-swallow error
     authentication/authorization;
     fungsi ini TIDAK memanggil
     checkRole (bebas rekursi).
========================= */

function isMaintenanceMode() {

  try {

    const sheet =
      SS.getSheetByName("Pengaturan");

    if (!sheet) {
      return false;
    }

    const data =
      sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {

      const key =
        String(data[i][0] || "").trim();

      if (key === "mode_maintenance") {

        const nilai =
          data[i][1];

        return (
          nilai === true ||
          String(nilai).trim().toLowerCase() === "true" ||
          String(nilai).trim().toLowerCase() === "on"
        );

      }

    }

    return false;

  } catch (err) {

    console.warn(
      "isMaintenanceMode: gagal membaca mode_maintenance, dianggap OFF",
      err
    );

    return false;

  }

}

/* Sprint 4D micro-fix UX - endpoint
   publik ADDITIVE: bridge state
   maintenance ke frontend untuk
   menampilkan halaman Maintenance
   penuh saat session resume gagal.
   checkSession() tetap boolean
   (kontrak utuh), getAppInfo()
   tidak berubah. Reuse
   isMaintenanceMode() (fail-open).
   Tanpa data sensitif. */

function getMaintenanceStatus() {

  return {

    maintenance: isMaintenanceMode()

  };

}

function getSystemSettings(sessionId) {

  if (!checkRole(sessionId, ["Admin"])) {
    throw new Error("Akses ditolak");
  }

  const sheet = SS.getSheetByName("Pengaturan");
  const data = sheet ? sheet.getDataRange().getValues() : [];
  const config = {};

  for (let i = 1; i < data.length; i++) {
    const key = String(data[i][0] || "").trim();
    if (key) {
      config[key] = data[i][1];
    }
  }

  return {
    namaAplikasi: config.nama_aplikasi || "",
    taglineAplikasi: config.tagline_aplikasi || "",
    logoAplikasi: config.logo_aplikasi || "",
    favicon: config.favicon || "",
    versiAplikasi: config.versi_aplikasi || "",
    modeMaintenance: config.mode_maintenance === true ||
      String(config.mode_maintenance).toLowerCase() === "true",

    /* Field derived URL - tambahan
       additive (Sprint 4C), pola sama
       dengan getAppInfo() dan
       getSchoolIdentity(). Nilai
       File ID existing tidak berubah.
       Invalid/kosong -> "" (frontend
       pakai fallback). Kontrak lama
       tetap utuh. */

    logoAplikasiUrl:
      resolveDriveImageUrl(
        config.logo_aplikasi
      ),

    faviconUrl:
      resolveDriveImageUrl(
        config.favicon
      )

  };
}

function saveSystemSettings(sessionId, data) {

  if (!checkRole(sessionId, ["Admin"])) {
    throw new Error("Akses ditolak");
  }

  if (!data || typeof data !== "object") {
    throw new Error("Data Pengaturan Sistem tidak valid");
  }

  const sheet = SS.getSheetByName("Pengaturan");

  if (!sheet) {
    throw new Error('Sheet "Pengaturan" tidak ditemukan');
  }

  const values = sheet.getDataRange().getValues();
  const map = {};

  values.forEach(function (row, index) {
    const key = String(row[0] || "").trim();
    if (key) {
      map[key] = index + 1;
    }
  });

  updateSettingValue(sheet, map, "nama_aplikasi", data.namaAplikasi);
  updateSettingValue(sheet, map, "tagline_aplikasi", data.taglineAplikasi);
  updateSettingValue(sheet, map, "logo_aplikasi", data.logoAplikasi);
  updateSettingValue(sheet, map, "favicon", data.favicon);
  updateSettingValue(sheet, map, "versi_aplikasi", data.versiAplikasi);
  updateSettingValue(sheet, map, "mode_maintenance", data.modeMaintenance);

  invalidateMasterCache("Pengaturan");

  return true;
}

/* =========================
   UPLOAD ASSET APLIKASI
   Sprint 4C - Asset Management.
   Admin-only. Target:
   "logo_aplikasi" | "favicon"
   (identity aplikasi, domain
   Card Sistem - BUKAN
   logo_sekolah). Asset diupload
   ke folder Drive "Assets WONG MIT"
   (wajib tepat satu; tidak dibuat
   otomatis; tolak bila ambigu).
   Sharing otomatis. File lama
   tidak dihapus di sini. Upload
   BUKAN commit konfigurasi - File
   ID baru masuk Sheet hanya saat
   [Simpan] (saveSystemSettings).
   Validasi server-side wajib:
   jangan percaya validasi client.
   SVG (favicon) divalidasi
   kontennya: ditolak bila
   mengandung <script atau event
   handler on*=.
========================= */

function uploadAssetAplikasi(
  sessionId,
  upload,
  target
) {

  if (!checkRole(sessionId, ["Admin"])) {

    throw new Error("Akses ditolak");

  }

  if (target !== "logo_aplikasi" && target !== "favicon") {

    throw new Error("Target asset tidak valid");

  }

  if (!upload || !upload.base64 || !upload.mimeType || !upload.fileName) {

    throw new Error("Data file tidak lengkap");

  }

  /* Whitelist per target (Sprint 4C):
     logo_aplikasi - JPG/JPEG/PNG.
     favicon - JPG/JPEG/PNG/ICO/SVG. */

  const mimeTypeDiizinkan = target === "favicon"
    ? [
        "image/jpeg",
        "image/png",
        "image/x-icon",
        "image/vnd.microsoft.icon",
        "image/svg+xml"
      ]
    : [
        "image/jpeg",
        "image/png"
      ];

  const ekstensiDiizinkan = target === "favicon"
    ? ["jpg", "jpeg", "png", "ico", "svg"]
    : ["jpg", "jpeg", "png"];

  const mimeType =
    String(upload.mimeType).toLowerCase();

  if (mimeTypeDiizinkan.indexOf(mimeType) === -1) {

    throw new Error(
      target === "favicon"
        ? "Format file harus JPG, PNG, ICO, atau SVG"
        : "Format file harus JPG atau PNG"
    );

  }

  const namaFile =
    String(upload.fileName);

  const ekstensi =
    namaFile.split(".").pop().toLowerCase();

  if (ekstensiDiizinkan.indexOf(ekstensi) === -1) {

    throw new Error(
      target === "favicon"
        ? "Format file harus JPG, PNG, ICO, atau SVG"
        : "Format file harus JPG atau PNG"
    );

  }

  /* Batas ukuran 2 MB (sebelum
     overhead base64). */

  const ukuranBytes =
    Math.floor(
      upload.base64.length * 3 / 4
    );

  const batasBytes =
    2 * 1024 * 1024;

  if (ukuranBytes <= 0 || ukuranBytes > batasBytes) {

    throw new Error("Ukuran file maksimal 2 MB");

  }

  /* Cari folder target.
     Tidak dibuat otomatis.
     Tolak bila tidak ada atau
     ambigu (lebih dari satu). */

  const iterasiFolder =
    DriveApp.getFoldersByName(
      "Assets WONG MIT"
    );

  if (!iterasiFolder.hasNext()) {

    throw new Error(
      'Folder "Assets WONG MIT" tidak ditemukan di Google Drive'
    );

  }

  const folder =
    iterasiFolder.next();

  if (iterasiFolder.hasNext()) {

    throw new Error(
      'Ada lebih dari satu folder "Assets WONG MIT". Seragamkan dulu di Google Drive'
    );

  }

  let bytes;

  try {

    bytes =
      Utilities.base64Decode(
        upload.base64
      );

  } catch (error) {

    throw new Error("Gagal membaca data file");

  }

  const blob =
    Utilities.newBlob(
      bytes,
      mimeType,
      namaFile
    );

  /* Validasi konten SVG (favicon
     saja): tolak bila mengandung
     <script atau event handler
     on*= (keputusan Sprint 4C). */

  if (ekstensi === "svg") {

    const kontenSvg =
      blob.getDataAsString();

    if (
      /<script/i.test(kontenSvg)
      || /\son[a-z]+\s*=/i.test(kontenSvg)
    ) {

      throw new Error(
        "SVG ditolak: mengandung <script atau event handler on*="
      );

    }

  }

  let file;

  try {

    file =
      folder.createFile(blob);

  } catch (error) {

    throw new Error("Gagal mengupload file ke Google Drive");

  }

  if (!file) {

    throw new Error("Gagal mengupload file ke Google Drive");

  }

  /* Asset harus dapat diakses
     browser sebagai gambar. */

  file.setSharing(
    DriveApp.Access.ANYONE_WITH_LINK,
    DriveApp.Permission.VIEW
  );

  const fileId =
    file.getId();

  const url =
    resolveDriveImageUrl(fileId);

  /* Upload BUKAN commit konfigurasi.
     File ID baru disimpan ke Sheet
     hanya saat [Simpan] ditekan
     (saveSystemSettings). Bila admin
     membatalkan/menghapus, file baru
     dihapus via hapusAssetSekolah -
     tidak ada orphan file. */

  return {

    fileId: fileId,

    url: url

  };

}
