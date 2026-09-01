/* =========================
   PENGATURAN AKADEMIK
========================= */

function getAcademicSettings(sessionId) {

  const allowed =
    checkRole(
      sessionId,
      [
         "Admin",
         "KepalaSekolah",
         "WaliKelas",
         "GuruMapel"
       ]
    );

  if (!allowed) {
    throw new Error(
      "Akses ditolak"
    );
  }

  const sheet =
    SS.getSheetByName(
      "Pengaturan"
    );

  const data =
    getMasterSheetData("Pengaturan");

  const hasil = {};

  for (

    let i = 1;

    i < data.length;

    i++

  ) {

    const key =

      String(
        data[i][0]
      ).trim();

    hasil[key] =

      data[i][1];

  }

  return {

    tahunAjaran:

      hasil.tahun_ajaran || "-",

    semester:

      hasil.semester || "-",

    hariLibur:

      hasil.hari_libur || "-"

  };

}

function saveAcademicSettings(
  sessionId,
  data
) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin"]
    );

  if (!allowed) {
    throw new Error(
      "Akses ditolak"
    );
  }

  const sheet =

    SS.getSheetByName(
      "Pengaturan"
    );

  const values =

    sheet
      .getDataRange()
      .getValues();

  const map = {};

  values.forEach(function (row, index) {

    map[row[0]] = index + 1;

  });

  function updateValue(key, value) {

    if (map[key]) {

      sheet
        .getRange(map[key], 2)
        .setValue(value);

    }

  }

  updateValue(
    "tahun_ajaran",
    data.tahunAjaran
  );

  updateValue(
    "semester",
    data.semester
  );

  updateValue(
    "hari_libur",
    data.hariLibur
  );

  invalidateMasterCache("Pengaturan");

  return true;

}
/* =========================
   PENGATURAN IDENTITAS SEKOLAH
========================= */

function getSchoolIdentity(sessionId) {

  const allowed =
    checkRole(
      sessionId,
      [
        "Admin",
        "KepalaSekolah",
        "WaliKelas",
        "GuruMapel"
      ]
    );

  if (!allowed) {
    throw new Error(
      "Akses ditolak"
    );
  }

  const data =
    getMasterSheetData("Pengaturan");

  const hasil = {};

  for (

    let i = 1;

    i < data.length;

    i++

  ) {

    const key =

      String(
        data[i][0]
      ).trim();

    hasil[key] =

      data[i][1];

  }

  return {

    namaSekolah:

      hasil.nama_sekolah || "",

    kepalaSekolah:

      hasil.kepala_sekolah || "",

    logoSekolah:

      hasil.logo_sekolah || "",

    /* Field derived URL - tambahan
       saja (resolver di Code.js,
       scope project GAS yang sama).
       Nilai File ID existing tidak
       berubah. Freshness mengikuti
       perilaku existing (cache). */

    logoSekolahUrl:

      resolveDriveImageUrl(
        hasil.logo_sekolah
      ),

    logoAplikasi:

      hasil.logo_aplikasi || "",

    logoAplikasiUrl:

      resolveDriveImageUrl(
        hasil.logo_aplikasi
      ),

    favicon:

      hasil.favicon || ""

  };

}

function saveSchoolIdentity(
  sessionId,
  data
) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin"]
    );

  if (!allowed) {
    throw new Error(
      "Akses ditolak"
    );
  }

  const sheet =
    SS.getSheetByName(
      "Pengaturan"
    );

  const values =
    sheet
      .getDataRange()
      .getValues();

  const map = {};

  values.forEach(function (row, index) {

    map[row[0]] = index + 1;

  });

  /*
   * Key yang sudah ada di Sheet diupdate pada
   * kolom B. Key yang belum ada (misal
   * logo_aplikasi) ditambahkan sebagai baris
   * baru tanpa mengubah struktur kolom.
   *
   * Helper penyimpanan sengaja top-level
   * (updateSettingValue) - versi inner function
   * lama tidak terlihat dari fungsi lain dan
   * menyebabkan "updateValue is not defined".
   */

  updateSettingValue(
    sheet,
    map,
    "nama_sekolah",
    data.namaSekolah
  );

  updateSettingValue(
    sheet,
    map,
    "kepala_sekolah",
    data.kepalaSekolah
  );

  updateSettingValue(
    sheet,
    map,
    "logo_sekolah",
    data.logoSekolah
  );

  updateSettingValue(
    sheet,
    map,
    "logo_aplikasi",
    data.logoAplikasi
  );

  updateSettingValue(
    sheet,
    map,
    "favicon",
    data.favicon
  );

  invalidateMasterCache("Pengaturan");

  return true;

}


/* =========================
   HELPER PENYIMPANAN KEY
   Top-level agar dapat dipakai
   bersama oleh saveSchoolIdentity
   dan fungsi lain. value undefined
   dilewati (Sheet tidak tertimpa).
========================= */

function updateSettingValue(
  sheet,
  map,
  key,
  value
) {

  if (value === undefined) {
    return;
  }

  if (map[key]) {

    sheet
      .getRange(map[key], 2)
      .setValue(value);

  } else {

    sheet
      .appendRow([key, value]);

    map[key] =
      sheet.getLastRow();

  }

}

/* =========================
   HAPUS ASSET SEKOLAH
   Admin-only. Guard parent folder:
   hanya file yang benar-benar
   berada di folder "Assets WONG MIT"
   yang boleh dihapus dari endpoint
   ini (endpoint webapp anonim).
   File sudah tidak ada dianggap
   sukses (idempotent).
========================= */

function hapusAssetSekolah(
  sessionId,
  fileId
) {

  if (!checkRole(sessionId, ["Admin"])) {

    throw new Error("Akses ditolak");

  }

  if (!fileId) {
    return false;
  }

  let file;

  try {

    file =
      DriveApp.getFileById(fileId);

  } catch (error) {

    return false;

  }

  const orangTua =
    file.getParents();

  while (orangTua.hasNext()) {

    if (
      orangTua.next().getName() ===
      "Assets WONG MIT"
    ) {

      file.setTrashed(true);

      return true;

    }

  }

  throw new Error(
    'File bukan asset folder "Assets WONG MIT" - tidak dihapus'
  );

}


/* =========================
   UPLOAD LOGO SEKOLAH
   Admin-only. Asset diupload ke
   folder Drive "Assets WONG MIT"
   (tidak dibuat otomatis; tolak
   bila ambigu). Sharing otomatis.
   File lama tidak dihapus di sini.
   Upload BUKAN commit konfigurasi -
   File ID baru masuk Sheet hanya
   saat [Simpan] (saveSchoolIdentity).
   Validasi server-side wajib:
   jangan percaya validasi client.
========================= */

function uploadLogoSekolah(
  sessionId,
  upload
) {

  if (!checkRole(sessionId, ["Admin"])) {

    throw new Error("Akses ditolak");

  }

  if (!upload || !upload.base64 || !upload.mimeType || !upload.fileName) {

    throw new Error("Data file tidak lengkap");

  }

  /* Whitelist v1: JPG/JPEG/PNG.
     SVG ditunda. */

  const mimeTypeDiizinkan = [

    "image/jpeg",

    "image/png"

  ];

  const ekstensiDiizinkan = [

    "jpg",

    "jpeg",

    "png"

  ];

  const mimeType =
    String(upload.mimeType).toLowerCase();

  if (mimeTypeDiizinkan.indexOf(mimeType) === -1) {

    throw new Error("Format file harus JPG atau PNG");

  }

  const namaFile =
    String(upload.fileName);

  const ekstensi =
    namaFile.split(".").pop().toLowerCase();

  if (ekstensiDiizinkan.indexOf(ekstensi) === -1) {

    throw new Error("Format file harus JPG atau PNG");

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

  let file;

  try {

    const blob =
      Utilities.newBlob(
        Utilities.base64Decode(
          upload.base64
        ),
        mimeType,
        namaFile
      );

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
     (saveSchoolIdentity). Bila admin
     membatalkan/menghapus, file baru
     dihapus via hapusAssetSekolah -
     tidak ada orphan file. */

  return {

    fileId: fileId,

    url: url

  };

}