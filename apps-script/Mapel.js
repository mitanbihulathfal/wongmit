/* =========================
       MATA PELAJARAN
========================= */

function getMapel(sessionId) {

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
      "Mapel"
    );

  const data =
    getMasterSheetData("Mapel");

  return JSON.stringify(
    data
  );

}

function addMapel(
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
      "Mapel"
    );

  sheet.appendRow([

    data.idMapel,
    data.namaMapel,
    data.kelompok,
    data.status

  ]);

  invalidateMasterCache("Mapel");

  return true;

}

function updateMapel(
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
      "Mapel"
    );

  sheet
    .getRange(
      rowIndex,
      1,
      1,
      4
    )
    .setValues([[

      data.idMapel,
      data.namaMapel,
      data.kelompok,
      data.status

    ]]);

  invalidateMasterCache("Mapel");

  return true;

}

function deleteMapel(
  sessionId,
  idMapel
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
      "Mapel"
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
        idMapel
      ).trim()

    ) {

      sheet.deleteRow(
        i + 1
      );

      invalidateMasterCache("Mapel");

      return true;

    }

  }

  return false;

}

function getMapelUsage(
  namaMapel
) {

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

  for (
    let i = 1;
    i < dataMengajar.length;
    i++
  ) {

    const daftarMapel =

      String(
        dataMengajar[i][4]
      )
        .split("|");

    if (

      !daftarMapel.some(function (item) {

        return item.trim() ===
          String(namaMapel).trim();

      })

    ) {

      continue;

    }

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

    hasil.push({

      guru:
        namaGuru,

      kelas:
        dataMengajar[i][2],

      hari:
        dataMengajar[i][3]

    });

  }

  return hasil;

}

function getMapelById(
  idMapel
) {

  const data =
    getMasterSheetData("Mapel");

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
        idMapel
      ).trim()
    ) {

      return {

        rowIndex:
          i + 1,

        idMapel:
          data[i][0],

        namaMapel:
          data[i][1],

        kelompok:
          data[i][2],

        status:
          data[i][3]

      };

    }

  }

  return null;

}

function downloadTemplateMapel() {

  const template =

    createTemplateSpreadsheet(

      "TEMPLATE_MAPEL",

      [

        "Nama Mapel",
        "Kelompok",
        "Status"

      ]

    );

  const file =

    exportSpreadsheetAsXlsx(

      template.spreadsheetId,

      "TEMPLATE_MAPEL"

    );

  return {

    spreadsheetId: template.spreadsheetId,
    exportUrl: file

  };

}

/* === ID MAPEL (UTILITY) === */

function generateMapelId() {

  return "MP" + Utilities.getUuid().substring(0, 8);

}

/* === IMPORT MAPEL (UTILITY) === */

function importMapel(

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
      "Mapel"
    );

  const dataMapel =

    sheet
      .getDataRange()
      .getValues();

  const namaMapelExist =

    new Set();

  for (

    let i = 1;

    i < dataMapel.length;

    i++

  ) {

    namaMapelExist.add(

      String(

        dataMapel[i][1]

      )

        .trim()

        .toLowerCase()

    );

  }

  const hasil = {

    berhasil: 0,

    gagal: 0

  };

  for (

    let i = 0;

    i < rows.length;

    i++

  ) {

    const namaMapel =

      String(

        rows[i][0] || ""

      )

        .trim();

    const kelompok =

      String(

        rows[i][1] || ""

      )

        .trim();

    const status =

      String(

        rows[i][2] || ""

      )

        .trim();

    /* Abaikan baris kosong */

    if (

      namaMapel === "" &&

      kelompok === "" &&

      status === ""

    ) {

      continue;

    }

    const key =

      namaMapel.toLowerCase();

    if (

      namaMapelExist.has(

        key

      )

    ) {

      hasil.gagal++;

      continue;

    }

    sheet.appendRow([

      generateMapelId(),

      namaMapel,

      kelompok,

      status

    ]);

    namaMapelExist.add(

      key

    );

    hasil.berhasil++;

  }

  if (hasil.berhasil > 0) {
    invalidateMasterCache("Mapel");
  }

  return hasil;

}
