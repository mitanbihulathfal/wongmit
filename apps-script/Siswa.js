/* =========================
        DATA SISWA
========================= */

function getStudents() {

  const data =
    getMasterSheetData("Siswa");

  return JSON.stringify(data);
}

function addStudent(sessionId, data) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah"]
    );

  if (!allowed) {
    throw new Error("Akses ditolak");
  }

  const sheet = SS.getSheetByName("Siswa");

  sheet.appendRow([
    data.id,
    data.nisn,
    data.nama,
    data.jk,
    data.tempatLahir,
    data.tanggalLahir,
    data.kelas,
    data.status
  ]);

  invalidateMasterCache("Siswa");
  
  return true;

}

function getStudentById(id) {

  const data =
    getMasterSheetData("Siswa");

  for (let i = 1; i < data.length; i++) {

    if (String(data[i][0]).trim() == String(id).trim()) {

      return JSON.stringify({
        rowIndex: i + 1,
        id: data[i][0],
        nisn: data[i][1],
        nama: data[i][2],
        jk: data[i][3],
        tempatLahir: data[i][4],
        tanggalLahir: data[i][5],
        kelas: data[i][6],
        status: data[i][7]
      });

    }

  }

  return "";

}

function updateStudent(sessionId, data) {

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

  if (!data) {

    throw new Error(
      "Data siswa tidak tersedia."
    );

  }

  const idTarget =
    String(
      data.id ?? ""
    ).trim();

  if (!idTarget) {

    throw new Error(
      "ID siswa wajib diisi."
    );

  }

  const sheet =
    SS.getSheetByName(
      "Siswa"
    );

  if (!sheet) {

    throw new Error(
      "Sheet Siswa tidak ditemukan."
    );

  }

  const allData =
    getMasterSheetData(
      "Siswa"
    );

  for (
    let i = 1;
    i < allData.length;
    i++
  ) {

    const idData =
      String(
        allData[i][0] ?? ""
      ).trim();

    if (
      idData !==
      idTarget
    ) {

      continue;

    }

    sheet
      .getRange(
        i + 1,
        1,
        1,
        8
      )
      .setValues([
        [
          data.id,
          data.nisn,
          data.nama,
          data.jk,
          data.tempatLahir,
          data.tanggalLahir,
          data.kelas,
          data.status
        ]
      ]);

    invalidateMasterCache(
      "Siswa"
    );

    return true;

  }

  throw new Error(
    "Data siswa dengan ID " +
    idTarget +
    " tidak ditemukan."
  );

}

function deleteStudent(sessionId, id) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah"]
    );

  if (!allowed) {
    throw new Error("Akses ditolak");
  }

  const sheet = SS.getSheetByName("Siswa");

  const data = getMasterSheetData("Siswa");

  for (let i = 1; i < data.length; i++) {

    if (String(data[i][0]) === String(id)) {

      sheet.deleteRow(i + 1);

      invalidateMasterCache("Siswa");
      
      return true;

    }

  }

  return false;

}

/* === TEMPLATE SISWA (UTILITY) === */

function downloadTemplateSiswa() {

  const template =

    createTemplateSpreadsheet(

      "TEMPLATE_SISWA",

      [

        "ID",
        "NISN",
        "Nama Siswa",
        "JK",
        "Tempat Lahir",
        "Tanggal Lahir",
        "Kelas",
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

  const kelasData =

    SS.getSheetByName(

      "Kelas"

    ).getDataRange().getValues();

  sheetReferensi

    .getRange("A1")

    .setValue(

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

        1

      )

      .setValue(

        kelasData[i][1]

      );

  }

  sheetReferensi

    .getRange("B1")

    .setValue(

      "JK"

    );

  sheetReferensi

    .getRange(

      2,

      2,

      2,

      1

    )

    .setValues([

      ["L"],

      ["P"]

    ]);

  sheetReferensi

    .getRange("C1")

    .setValue(

      "Status"

    );

  sheetReferensi

    .getRange(

      2,

      3,

      3,

      1

    )

    .setValues([

      ["Aktif"],

      ["Lulus"],

      ["Mutasi"]

    ]);

  setDropdownValidation(

    sheetImport,

    "D2:D1000",

    sheetReferensi,

    "B2:B"

  );

  setDropdownValidation(

    sheetImport,

    "G2:G1000",

    sheetReferensi,

    "A2:A"

  );

  setDropdownValidation(

    sheetImport,

    "H2:H1000",

    sheetReferensi,

    "C2:C"

  );

  const file =

    exportSpreadsheetAsXlsx(

      template.spreadsheetId,

      "TEMPLATE_SISWA"

    );

  return {

    spreadsheetId: template.spreadsheetId,
    exportUrl: file

  };

}

/* === IMPORT SISWA (UTILITY) === */

function importSiswa(

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

      "Siswa"

    );

  const dataSiswa =

    sheet.getDataRange().getValues();

  const idExist =

    new Set();

  const nisnExist =

    new Set();

  for (

    let i = 1;

    i < dataSiswa.length;

    i++

  ) {

    idExist.add(

      String(

        dataSiswa[i][0]

      ).trim()

    );

    nisnExist.add(

      String(

        dataSiswa[i][1]

      ).trim()

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

    const row =

      rows[i];

    const id =

      String(

        row[0] || ""

      ).trim();

    const nisn =

      String(

        row[1] || ""

      ).trim();

    if (

      id === "" &&

      nisn === ""

    ) {

      continue;

    }

    if (

      idExist.has(id) ||

      nisnExist.has(nisn)

    ) {

      hasil.gagal++;

      continue;

    }

    sheet.appendRow([

      id,

      nisn,

      row[2],

      row[3],

      row[4],

      row[5],

      row[6],

      row[7]

    ]);

    idExist.add(id);

    nisnExist.add(nisn);

    hasil.berhasil++;

  }

  if (hasil.berhasil > 0) {
    invalidateMasterCache("Siswa");
  }

  return hasil;

}
