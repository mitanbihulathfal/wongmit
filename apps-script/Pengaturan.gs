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
