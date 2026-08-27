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

/* === EXPORT DATA SISWA (UTILITY) === */

function getNamaBySession(
  sessionId
) {

  const sessionSheet =
    SS.getSheetByName("Session");

  const sessionData =
    sessionSheet.getDataRange().getValues();

  for (let i = 1; i < sessionData.length; i++) {

    if (

      String(sessionData[i][0]) ===
      String(sessionId)

      &&

      String(sessionData[i][5]) ===
      "Aktif"

    ) {

      return sessionData[i][2];

    }

  }

  return "-";

}

function buildSiswaExportSheet(
  sessionId,
  kelas
) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah", "WaliKelas"]
    );

  if (!allowed) {
    throw new Error(
      "Akses ditolak"
    );
  }

  const siswaSheet =
    SS.getSheetByName("Siswa");

  const siswaData =
    siswaSheet.getDataRange().getValues();

  const pengaturanSheet =
    SS.getSheetByName("Pengaturan");

  const config = {};

  pengaturanSheet
    .getDataRange()
    .getValues()
    .slice(1)
    .forEach(function (row) {

      config[row[0]] = row[1];

    });

  const baris = [];

  for (let i = 1; i < siswaData.length; i++) {

    const row = siswaData[i];

    const kelasSiswa = row[6];

    if (
      kelas &&
      kelas !== "" &&
      String(kelasSiswa) !== String(kelas)
    ) {

      continue;

    }

    baris.push([

      baris.length + 1,
      row[1],
      row[2],
      row[4],
      row[5],
      row[3],
      row[6],
      row[7]

    ]);

  }

  const spreadsheet =
    SpreadsheetApp.create(
      "EXPORT_DATA_SISWA_" + new Date().getTime()
    );

  const sheet =
    spreadsheet.getSheets()[0];

  sheet.setName("Data Siswa");

  sheet.setColumnWidth(1, 50);
  sheet.setColumnWidth(2, 110);
  sheet.setColumnWidth(3, 250);
  sheet.setColumnWidth(4, 140);
  sheet.setColumnWidth(5, 110);
  sheet.setColumnWidth(6, 50);
  sheet.setColumnWidth(7, 70);
  sheet.setColumnWidth(8, 90);

  sheet
    .getRange("A1:H1")
    .merge();

  sheet
    .getRange("A2:H2")
    .merge();

  sheet
    .getRange("A3:H3")
    .merge();

  sheet
    .getRange("A1")
    .setValue(
      "DATA SISWA"
    );

  sheet
    .getRange("A2")
    .setValue(
      "MIS TANBIHUL ATHFAL"
    );

  sheet
    .getRange("A3")
    .setValue(
      "TAHUN AJARAN " + (config.tahun_ajaran || "-")
    );

  sheet
    .getRange("A1")
    .setFontWeight("bold")
    .setFontSize(16)
    .setHorizontalAlignment("center");

  sheet
    .getRange("A2:A3")
    .setFontWeight("bold")
    .setFontSize(12)
    .setHorizontalAlignment("center");

  sheet
    .getRange("A5")
    .setValue("Kelas");

  sheet
    .getRange("A6")
    .setValue("Jumlah");

  sheet
    .getRange("E5")
    .setValue("Tanggal Export");

  sheet
    .getRange("E6")
    .setValue("Didownload oleh");

  sheet
    .getRange("A5:A6")
    .setFontWeight("bold");

  sheet
    .getRange("E5:E6")
    .setFontWeight("bold");

  sheet
    .getRange("B5:D5")
    .merge();

  sheet
    .getRange("B6:D6")
    .merge();

  sheet
    .getRange("F5:H5")
    .merge();

  sheet
    .getRange("F6:H6")
    .merge();

  const kelasText =
    kelas || "Semua Kelas";

  const tanggalExport =

    Utilities.formatDate(

      new Date(),

      Session.getScriptTimeZone(),

      "dd MMMM yyyy HH:mm"

    ) + " WIB";

  const namaPengunduh =
    getNamaBySession(sessionId);

  sheet
    .getRange("B5")
    .setValue(
      kelasText
    );

  sheet
    .getRange("B6")
    .setValue(
      baris.length + " siswa"
    );

  sheet
    .getRange("F5")
    .setValue(
      tanggalExport
    );

  sheet
    .getRange("F6")
    .setValue(
      namaPengunduh
    );

  const header = [
    "No",
    "NISN",
    "Nama",
    "Tempat Lahir",
    "Tanggal Lahir",
    "JK",
    "Kelas",
    "Status"
  ];

  sheet.getRange(8, 1, 1, header.length)
    .setValues([header])
    .setFontWeight("bold")
    .setBackground("#4a90d9")
    .setFontColor("#ffffff");

  if (baris.length > 0) {

    sheet
      .getRange(9, 1, baris.length, 8)
      .setValues(baris);

    for (let i = 0; i < baris.length; i++) {

      const warnaBaris =
        (i % 2 === 0) ? "#ffffff" : "#f2f6fc";

      sheet
        .getRange(9 + i, 1, 1, 8)
        .setBackground(warnaBaris);

    }

    sheet
      .getRange(8, 1, baris.length + 1, 8)
      .setBorder(
        true,
        true,
        true,
        true,
        true,
        true
      );

  }

  SpreadsheetApp.flush();

  return spreadsheet.getId();

}

function exportSiswaExcel(
  sessionId,
  kelas
) {

  const spreadsheetId =
    buildSiswaExportSheet(
      sessionId,
      kelas
    );

  return {

    spreadsheetId: spreadsheetId,
    exportUrl: exportSpreadsheetAsXlsx(spreadsheetId)

  };

}

function exportSiswaPdf(
  sessionId,
  kelas
) {

  const spreadsheetId =
    buildSiswaExportSheet(
      sessionId,
      kelas
    );

  return {

    spreadsheetId: spreadsheetId,
    exportUrl: exportSpreadsheetAsPdf(spreadsheetId)

  };

}
