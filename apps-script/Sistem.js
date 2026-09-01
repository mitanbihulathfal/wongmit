/* =========================
   PENGATURAN SISTEM
   Sprint 4 — Card Sistem
========================= */

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
      String(config.mode_maintenance).toLowerCase() === "true"
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
