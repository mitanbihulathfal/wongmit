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

    logoAplikasi:

      hasil.logo_aplikasi || "",

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
   */
  function updateValue(key, value) {

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

  updateValue(
    "nama_sekolah",
    data.namaSekolah
  );

  updateValue(
    "kepala_sekolah",
    data.kepalaSekolah
  );

  updateValue(
    "logo_sekolah",
    data.logoSekolah
  );

  updateValue(
    "logo_aplikasi",
    data.logoAplikasi
  );

  updateValue(
    "favicon",
    data.favicon
  );

  invalidateMasterCache("Pengaturan");

  return true;

}
