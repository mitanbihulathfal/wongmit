/* =========================
   GURU MENGAJAR
   Controlled Extraction
========================= */

/* === TEMPLATE GURU MENGAJAR (UTILITY) === */

function downloadTemplateGuruMengajar() {

  const template =

    createTemplateSpreadsheet(

      "TEMPLATE_GURU_MENGAJAR",

      [

        "Guru",

        "Kelas",

        "Hari",

        "Mapel 1",

        "Mapel 2",

        "Mapel 3",

        "Mapel 4",

        "Mapel 5",

        "Status"

      ]

    );

  const spreadsheet =

    template.spreadsheet;

  const sheetImport =

    template.sheet;

  const sheetReferensi =

    spreadsheet.insertSheet(

      "Referensi"

    );

  const guruData =
    SS.getSheetByName(
      "Guru"
    ).getDataRange().getValues();

  const kelasData =
    SS.getSheetByName(
      "Kelas"
    ).getDataRange().getValues();

  const mapelData =
    SS.getSheetByName(
      "Mapel"
    ).getDataRange().getValues();

  sheetReferensi.getRange(
    "A1"
  ).setValue(
    "Guru"
  );

  for (
    let i = 1;
    i < guruData.length;
    i++
  ) {

    sheetReferensi
      .getRange(
        i + 1,
        1
      )
      .setValue(
        guruData[i][1]
      );

  }

  sheetReferensi.getRange(
    "B1"
  ).setValue(
    "Kelas"
  );

  for (
    let i = 1;
    i < kelasData.length;
    i++
  ) {

    sheetReferensi
      .getRange(
        i + 1,
        2
      )
      .setValue(
        kelasData[i][1]
      );

  }

  sheetReferensi.getRange(
    "C1"
  ).setValue(
    "Hari"
  );

  const hari =
    getWeekDays();

  for (
    let i = 0;
    i < hari.length;
    i++
  ) {

    sheetReferensi
      .getRange(
        i + 2,
        3
      )
      .setValue(
        hari[i]
      );

  }

  sheetReferensi.getRange(
      "D1"
    ).setValue(
      "Mapel"
    );

    let barisMapel = 2;

    for (
      let i = 1;
      i < mapelData.length;
      i++
    ) {

      if (
        mapelData[i][3] !==
        "Aktif"
      ) {

        continue;

      }

      sheetReferensi
        .getRange(
          barisMapel,
          4
        )
        .setValue(
          mapelData[i][1]
        );

      barisMapel++;

    }

  sheetReferensi.getRange(
    "E1"
  ).setValue(
    "Status"
  );

  sheetReferensi
    .getRange(
      2,
      5,
      2,
      1
    )
    .setValues([

      ["Aktif"],
      ["Nonaktif"]

    ]);

  /* =========================
    DATA VALIDATION
  ========================= */

  setDropdownValidation(

    sheetImport,

    "A2:A1000",

    sheetReferensi,

    "A2:A"

  );

  setDropdownValidation(

    sheetImport,

    "B2:B1000",

    sheetReferensi,

    "B2:B"

  );

  setDropdownValidation(

    sheetImport,

    "C2:C1000",

    sheetReferensi,

    "C2:C"

  );

  setDropdownValidation(

    sheetImport,

    "D2:D1000",

    sheetReferensi,

    "D2:D"

  );

  setDropdownValidation(

    sheetImport,

    "E2:E1000",

    sheetReferensi,

    "D2:D"

  );

  setDropdownValidation(

    sheetImport,

    "F2:F1000",

    sheetReferensi,

    "D2:D"

  );

  setDropdownValidation(

    sheetImport,

    "G2:G1000",

    sheetReferensi,

    "D2:D"

  );

  setDropdownValidation(

    sheetImport,

    "H2:H1000",

    sheetReferensi,

    "D2:D"

  );

  setDropdownValidation(

    sheetImport,

    "I2:I1000",

    sheetReferensi,

    "E2:E"

  );

  const file =

    exportSpreadsheetAsXlsx(

      spreadsheet.getId(),

      "TEMPLATE_GURU_MENGAJAR"

    );

  return {

    spreadsheetId: spreadsheet.getId(),
    exportUrl: file

  };

}

/* === IMPORT GURU MENGAJAR (UTILITY) === */

function importGuruMengajar(

  sessionId,

  rows

) {

  const allowed =

    checkRole(

      sessionId,

      [

        "Admin",

        "KepalaSekolah"

      ]

    );

  if (

    !allowed

  ) {

    throw new Error(

      "Akses ditolak"

    );

  }

  const sheet =

    SS.getSheetByName(

      "GuruMengajar"

    );

  const hasil = {

    berhasil: 0,

    gagal: 0

  };

  for (

    let i = 0;

    i < rows.length;

    i++

  ) {

    const row =

      rows[i];

    let hari;

    try {

      hari =
        validateWeekDay(
          row[2]
        );

    } catch (error) {

      hasil.gagal++;

      continue;

    }

    const idGuru =

      getGuruIdByNama(

        row[0]

      );

    if (

      !idGuru

    ) {

      hasil.gagal++;

      continue;

    }

    const daftarMapel = [];

    for (

      let j = 3;

      j <= 7;

      j++

    ) {

      if (

        String(

          row[j] || ""

        ).trim() !== ""

      ) {

        daftarMapel.push(

          String(

            row[j]

          ).trim()

        );

      }

    }

    sheet.appendRow([

      Utilities.getUuid(),

      idGuru,

      row[1],

      hari,

      daftarMapel.join("|"),

      row[8]

    ]);

    hasil.berhasil++;

  }

  if (hasil.berhasil > 0) {
    invalidateMasterCache("GuruMengajar");
  }

  return hasil;

}

/* === GURU MENGAJAR ==== */

function getGuruMengajar(sessionId) {

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

  const sheetGuruMengajar =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const sheetGuru =
    SS.getSheetByName(
      "Guru"
    );

  const dataMengajar =
    getMasterSheetData("GuruMengajar");

  const dataGuru =
    getMasterSheetData("Guru");

    const hasil = [];

  hasil.push([

    "ID Relasi",
    "Guru",
    "Kelas",
    "Hari",
    "Mapel",
    "Status"

  ]);

  for (
    let i = 1;
    i < dataMengajar.length;
    i++
  ) {

    let namaGuru = "-";

    for (
      let j = 1;
      j < dataGuru.length;
      j++
    ) {

      if (

        String(
          dataGuru[j][0]
        ).trim()

        ===

        String(
          dataMengajar[i][1]
        ).trim()

      ) {

        namaGuru =
          dataGuru[j][1];

        break;

      }

    }

    hasil.push([

      dataMengajar[i][0], // ID Relasi

      dataMengajar[i][1], // ID Guru

      namaGuru,

      dataMengajar[i][2],

      dataMengajar[i][3],

      dataMengajar[i][4],

      dataMengajar[i][5]

    ]);

  }

  return JSON.stringify(
    hasil
  );

}

function getFilteredGuruMengajar(
  sessionId,
  guru = "",
  kelas = "",
  mapel = ""
) {

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
      "GuruMengajar"
    );

  const data =
    getMasterSheetData("GuruMengajar");

  const hasil = [];

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    const idGuruData =
      String(
        data[i][1]
      ).trim();

    const kelasData =
      String(
        data[i][2]
      ).trim();

    const hariData =
      String(
        data[i][3]
      ).trim();

    const mapelData =
      String(
        data[i][4]
      ).trim();

    const statusData =
      String(
        data[i][5]
      ).trim();

    if (statusData !== "Aktif") {
      continue;
    }

    if (
      guru
      &&
      idGuruData !==
      String(guru).trim()
    ) {
      continue;
    }

    if (
      kelas
      &&
      kelasData !==
      String(kelas).trim()
    ) {
      continue;
    }

    if (
      mapel
      &&
      !matchesMapelRekap(
        mapelData,
        mapel
      )
    ) {
      continue;
    }

    hasil.push({
      idRelasi: String(
        data[i][0]
      ).trim(),
      idGuru: idGuruData,
      kelas: kelasData,
      hari: hariData,
      mapel: mapelData,
      status: statusData
    });

  }

  return hasil;

}

/* === RELASI MENGAJAR === */

/*
 * DRAFT - dipersiapkan untuk fitur "Jadwal Guru Hari Ini" di Dashboard
 * (rencana shortcut menuju halaman Absensi). Belum dipanggil di client.
 * Beda dari getRelasiMengajarByHari yang mem-filter per kelas; fungsi ini
 * mem-filter per guru (idGuru) + tanggal, cocok untuk widget personal guru yang login.
 */

function getRelasiMengajar(

  sessionId,

  idGuru,

  kelas,

  tanggal

) {

  const data =
    getMasterSheetData("GuruMengajar");

  const hariIni =
    getWeekDays()[
      new Date(tanggal).getDay()
    ];

  for (

    let i = 1;

    i < data.length;

    i++

  ) {

    if (

      String(data[i][1]).trim()

      !==

      String(idGuru).trim()

    ) {

      continue;

    }

    if (

      String(data[i][2]).trim()

      !==

      String(kelas).trim()

    ) {

      continue;

    }

    if (

      String(data[i][3]).trim()

      !==

      hariIni

    ) {

      continue;

    }

    if (

      String(data[i][5]).trim()

      !==

      "Aktif"

    ) {

      continue;

    }

    return {

      idRelasi:

        data[i][0],

      hari:

        data[i][3],

      mapel:

        data[i][4]

    };

  }

  return null;

}

/* === CARI RELASI BERDASARKAN KELAS + HARI === */

function getRelasiMengajarByHari(

  kelas,

  hari

) {

  const data =
    getMasterSheetData("GuruMengajar");

  for (

    let i = 1;

    i < data.length;

    i++

  ) {

    if (

      String(
        data[i][2]
      ).trim()

      !==

      String(
        kelas
      ).trim()

    ) {

      continue;

    }

    if (

      String(
        data[i][3]
      ).trim()

      !==

      String(
        hari
      ).trim()

    ) {

      continue;

    }

    if (

      String(
        data[i][5]
      ).trim()

      !==

      "Aktif"

    ) {

      continue;

    }

    return {

      idRelasi:

        data[i][0],

      idGuru:

        data[i][1],

      kelas:

        data[i][2],

      hari:

        data[i][3],

      mapel:

        data[i][4]

    };

  }

  return null;

}

function addGuruMengajar(
  sessionId,
  data
) {

  const allowed =
    checkRole(
      sessionId,
      [
        "Admin",
        "KepalaSekolah"
      ]
    );

  if (!allowed) {

    throw new Error(
      "Akses ditolak"
    );

  }

  const sheet =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const hari =
    validateWeekDay(
      data.hari
    );
  
  sheet.appendRow([

    data.idRelasi,
    data.idGuru,
    data.kelas,
    hari,
    data.mapel,
    data.status

  ]);

  invalidateMasterCache("GuruMengajar");

  return true;

}

function updateGuruMengajar(
  sessionId,
  rowIndex,
  data
) {

  const allowed =
    checkRole(
      sessionId,
      [
        "Admin",
        "KepalaSekolah"
      ]
    );

  if (!allowed) {

    throw new Error(
      "Akses ditolak"
    );

  }

  const sheet =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const hari =
    validateWeekDay(
      data.hari
    );

  sheet.getRange(
    rowIndex,
    1
  ).setValue(
    data.idRelasi
  );

  sheet.getRange(
    rowIndex,
    2
  ).setValue(
    data.idGuru
  );

  sheet.getRange(
    rowIndex,
    3
  ).setValue(
    data.kelas
  );

  sheet.getRange(
    rowIndex,
    4
  ).setValue(
    hari
  );

  sheet.getRange(
    rowIndex,
    5
  ).setValue(
    data.mapel
  );

  sheet.getRange(
    rowIndex,
    6
  ).setValue(
    data.status
  );

  invalidateMasterCache("GuruMengajar");

  return true;

}

function deleteGuruMengajar(
  sessionId,
  idRelasi
) {

  const allowed =
    checkRole(
      sessionId,
      [
        "Admin",
        "KepalaSekolah"
      ]
    );

  if (!allowed) {

    throw new Error(
      "Akses ditolak"
    );

  }

  const sheet =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const data =
    sheet
      .getDataRange()
      .getValues();

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    if (

      String(
        data[i][0]
      ).trim()

      ===

      String(
        idRelasi
      ).trim()

    ) {

      sheet.deleteRow(
        i + 1
      );

      invalidateMasterCache("GuruMengajar");

      return true;

    }

  }

  return false;

}

function getGuruMengajarById(
  idRelasi
) {

  const data =
    getMasterSheetData("GuruMengajar");

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    if (

      String(
        data[i][0]
      ).trim()

      ===

      String(
        idRelasi
      ).trim()

    ) {

      return {

        rowIndex:
          i + 1,

        idRelasi:
          data[i][0],

        idGuru:
          data[i][1],

        kelas:
          data[i][2],

        hari:
          data[i][3],

        mapel:
          data[i][4],

        status:
          data[i][5]

      };

    }

  }

  return null;

}
