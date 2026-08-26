const SS = SpreadsheetApp.getActiveSpreadsheet();

function doGet() {

  const output =

    HtmlService

      .createTemplateFromFile(
        "index"
      )

      .evaluate()

      .setTitle(
        "WONG MIT"
      )

      .addMetaTag(
        "viewport",
        "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      )

      .setXFrameOptionsMode(

        HtmlService
          .XFrameOptionsMode
          .ALLOWALL

      );

  return output;

}

/*
 * DRAFT - dipersiapkan untuk fitur "Pengaturan Sistem" (menu bukaPengaturanSistem
 * di page_pengaturan.html, saat ini masih placeholder). Belum dipanggil di client.
 */

function getAppInfo() {

  return {
    appName: "WONG MIT",
    appLongName: "Website ONline Guru MI Tanbihul Athfal",
    logo: "https://iili.io/CU1QcrJ.png"
  };

}

/* =========================
   KALENDER SEKOLAH
========================= */

function getWeekDays() {
  return [
    "Ahad",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];
}

function validateWeekDay(hari) {

  const hariNormalized =
    String(
      hari || ""
    ).trim();

  if (
    !getWeekDays().includes(
      hariNormalized
    )
  ) {

    throw new Error(
      "Hari tidak valid. Gunakan salah satu dari: " +
      getWeekDays().join(", ")
    );

  }

  return hariNormalized;

}

function getWeeklyHolidays() {

  const sheet =
    SS.getSheetByName(
      "Pengaturan"
    );

  if (!sheet) {
    throw new Error(
      "Sheet Pengaturan tidak ditemukan"
    );
  }

  const data =
    getMasterSheetData("Pengaturan");

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    const key =
      String(
        data[i][0]
      ).trim();

    if (key === "hari_libur") {

      return String(
        data[i][1] || ""
      )
        .split(",")
        .map(function (hari) {
          return String(hari).trim();
        })
        .filter(function (hari) {
          return hari !== "";
        });

    }

  }

  return [];

}

function isSchoolHoliday(date) {

  if (!date) {
    return false;
  }

  const hari =
    getWeekDays()[
      new Date(date).getDay()
    ];

  const hariLibur =
    getWeeklyHolidays();

  return hariLibur.some(function (libur) {

    return String(libur).trim() === hari;

  });

}

/* =========================
   KONTEKS KALENDER ABSENSI
========================= */

function getAttendanceCalendarContext(
  kelas,
  tanggal,
  namaGuru = ""
) {

  const hari =
    getNamaHariIndonesia(tanggal);

  const hariLibur =
    isSchoolHoliday(tanggal);

  const namaGuruNormalized =
    String(namaGuru || "").trim();

  let roleGuru = "";
  let idGuru = "";

  if (namaGuruNormalized) {

    const guruSheet =
      SS.getSheetByName("Guru");

    const guruData =
      getMasterSheetData("Guru");

    for (let i = 1; i < guruData.length; i++) {

      if (
        String(guruData[i][1]).trim()
        === namaGuruNormalized
      ) {

        idGuru = guruData[i][0];
        roleGuru = String(guruData[i][2] || "").trim();
        break;

      }

    }

  }

  const rolesGuru =
    roleGuru
      .split(",")
      .map(function (role) {
        return String(role).trim();
      })
      .filter(Boolean);

  const isExemptRole =
    rolesGuru.includes("Admin")
    ||
    rolesGuru.includes("KepalaSekolah");

  let hasTeacherSchedule = false;
  let teacherSchedule = null;

  if (idGuru && !isExemptRole) {

    const sheetGuruMengajar =
      SS.getSheetByName("GuruMengajar");

    const dataMengajar =
      getMasterSheetData("GuruMengajar");

    for (let i = 1; i < dataMengajar.length; i++) {

      if (
        String(dataMengajar[i][1]).trim()
        !== String(idGuru).trim()
      ) {
        continue;
      }

      if (
        String(dataMengajar[i][2]).trim()
        !== String(kelas).trim()
      ) {
        continue;
      }

      if (
        String(dataMengajar[i][3]).trim()
        !== String(hari).trim()
      ) {
        continue;
      }

      if (
        String(dataMengajar[i][5]).trim()
        !== "Aktif"
      ) {
        continue;
      }

      hasTeacherSchedule = true;

      teacherSchedule = {
        idRelasi: dataMengajar[i][0],
        hari: dataMengajar[i][3],
        mapel: dataMengajar[i][4]
      };

      break;

    }

  }

  const shouldWarnTeacherSchedule =
    !!idGuru
    &&
    !isExemptRole
    &&
    !hasTeacherSchedule;

  return {

    tanggal: tanggal,
    hari: hari,
    isSchoolHoliday: hariLibur,
    roleGuru: roleGuru,
    isExemptRole: isExemptRole,
    hasFormalActivity: hasTeacherSchedule,
    hasTeacherSchedule: hasTeacherSchedule,
    shouldWarn: shouldWarnTeacherSchedule,
    warningType: shouldWarnTeacherSchedule
      ? "teacher_schedule"
      : "",
    teacherSchedule: teacherSchedule

  };

}

function getPage(pageName) {

  return HtmlService
    .createHtmlOutputFromFile(pageName)
    .getContent();

}

/* =========================
   MASTER SISWA (UTILITY)
========================= */

function getMasterSiswa() {

  return getMasterSheetData("Siswa");

}

/* =========================
   GURU DROPDOWN REKAP (UTILITY)
========================= */

function getGuruDropdownRekap(sessionId) {

  const role =
    getRoleBySession(sessionId);

  if (!role) {

    throw new Error(
      "Akses ditolak"
    );

  }

  const roles =
    role.split(",");

  const sheet =
    SS.getSheetByName(
      "Guru"
    );

  const data =
    getMasterSheetData("Guru");

  const hasil = [];

  hasil.push([
    "ID Guru",
    "Nama Guru"
  ]);

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    if (

      String(
        data[i][5]
      ) !== "Aktif"

    ) {

      continue;

    }

    hasil.push([

      data[i][0],

      data[i][1]

    ]);

  }

  return JSON.stringify(
    hasil
  );

}

function getAllClassesRekap(sessionId) {

  const role = getRoleBySession(sessionId);

  if (!role) {

    throw new Error(
      "Session tidak valid"
    );

  }

  const data =
    getMasterSheetData("Kelas");

  const hasil = [];

  hasil.push([
    "ID Kelas",
    "Nama Kelas"
  ]);

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    if (
      String(data[i][3]).trim() !==
      "Aktif"
    ) {

      continue;

    }

    hasil.push([
      data[i][0],
      data[i][1]
    ]);

  }

  return JSON.stringify(
    hasil
  );

}

function getWaliKelasOptions() {

  const sheet =
    SS.getSheetByName("Guru");

  const data =
    getMasterSheetData("Guru");

  const hasil = [];

  for (let i = 1; i < data.length; i++) {

    const role =
      String(data[i][4]);

    if (role.includes("WaliKelas")) {

      hasil.push({

        id: data[i][0],
        nama: data[i][1]

      });

    }

  }

  return JSON.stringify(hasil);

}

function getGuruOptions() {

  const data =
    getMasterSheetData("Guru");

  const hasil = [];

  for (let i = 1; i < data.length; i++) {

    const role =
      String(data[i][4]);

    const status =
      String(data[i][5]);

    const bolehMengajar =

      role.includes("WaliKelas") ||
      role.includes("GuruMapel");

    if (
      bolehMengajar &&
      status === "Aktif"
    ) {

      hasil.push({

        id: data[i][0],
        nama: data[i][1]

      });

    }

  }

  return JSON.stringify(hasil);

}

function getKelasOptions() {

  const sheet =
    SS.getSheetByName("Kelas");

  const data =
    getMasterSheetData("Kelas");

  const hasil = [];

  for (let i = 1; i < data.length; i++) {

    if (data[i][3] === "Aktif") {

      hasil.push({

        id: data[i][0],
        nama: data[i][1]

      });

    }

  }

  return JSON.stringify(hasil);

}

function checkLogin(username, password) {

  const sheet =
    SS.getSheetByName("Guru");

  const data =
    getMasterSheetData("Guru");

  for (let i = 1; i < data.length; i++) {

    const status =
      String(data[i][5]);

    if (
      String(data[i][2]) === username &&
      String(data[i][3]) === password &&
      status === "Aktif"
    ) {

      const sessionId =
        createSession(
          data[i][0],
          data[i][1]
        );

      return {

        success: true,

        sessionId: sessionId,

        idGuru: data[i][0],

        namaGuru: data[i][1],

        role: data[i][4]

      };

    }

  }

  return {

    success: false

  };

}

function createSession(idGuru, namaGuru) {

  const sheet =
    SS.getSheetByName("Session");

  const sessionId =

    "SID_" +
    idGuru +
    "_" +
    new Date().getTime();

  sheet.appendRow([

    sessionId,
    idGuru,
    namaGuru,
    new Date(),
    "",
    "Aktif"

  ]);

  return sessionId;

}

function checkSession(sessionId) {

  const sheet =
    SS.getSheetByName("Session");

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (

      String(data[i][0]) ===
      String(sessionId)

      &&

      String(data[i][5]) ===
      "Aktif"

    ) {

      return true;

    }

  }

  return false;

}

function logoutSession(sessionId) {

  const sheet =
    SS.getSheetByName("Session");

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (
      String(data[i][0]) ===
      String(sessionId)
    ) {

      sheet.getRange(
        i + 1,
        5
      ).setValue(
        new Date()
      );

      sheet.getRange(
        i + 1,
        6
      ).setValue(
        "Logout"
      );

      return true;

    }

  }

  return false;

}

function getGuruProfile(idGuru) {

  const guruSheet =
    SS.getSheetByName("Guru");

  const kelasSheet =
    SS.getSheetByName("Kelas");

  const relasiSheet =
    SS.getSheetByName("GuruMengajar");

  const guruData =
    getMasterSheetData("Guru");

  const kelasData =
    getMasterSheetData("Kelas");

  const relasiData =
    getMasterSheetData("GuruMengajar");

  let profile = null;

  for (let i = 1; i < guruData.length; i++) {

    if (
      String(guruData[i][0]) ===
      String(idGuru)
    ) {

      profile = {

        idGuru: guruData[i][0],
        nama: guruData[i][1],
        role: guruData[i][4],
        waliKelas: [],
        mengajar: []

      };

      break;

    }

  }

  if (!profile) {

    return null;

  }

  for (let i = 1; i < kelasData.length; i++) {

    if (
      String(kelasData[i][2]) ===
      String(idGuru)
    ) {

      profile.waliKelas.push(
        kelasData[i][1]
      );

    }

  }

  for (let i = 1; i < relasiData.length; i++) {

    if (
      String(relasiData[i][1]).trim() !==
      String(idGuru).trim()
    ) {
      continue;
    }

    const kelas =
      String(relasiData[i][2]).trim();

    if (
      kelas &&
      !profile.mengajar.includes(kelas)
    ) {

      profile.mengajar.push(kelas);

    }

  }

  return profile;

}

function getRoleBySession(sessionId) {

  const sessionSheet =
    SS.getSheetByName("Session");

  const guruSheet =
    SS.getSheetByName("Guru");

  const sessionData =
    sessionSheet.getDataRange().getValues();

  const guruData =
    getMasterSheetData("Guru");

  let idGuru = null;

  for (let i = 1; i < sessionData.length; i++) {

    if (

      String(sessionData[i][0]) ===
      String(sessionId)

      &&

      String(sessionData[i][5]) ===
      "Aktif"

    ) {

      idGuru =
        sessionData[i][1];

      break;

    }

  }

  if (!idGuru) {

    return null;

  }

  for (let i = 1; i < guruData.length; i++) {

    if (

      String(guruData[i][0]) ===
      String(idGuru)

    ) {

      return guruData[i][4];

    }

  }

  return null;

}

function checkRole(

  sessionId,

  allowedRoles

) {

  const role =

    getRoleBySession(
      sessionId
    );

  if (!role) {

    return false;

  }

  const roles =
    role.split(',');

  return allowedRoles.some(

    r => roles.includes(r)

  );

}

function getStudentsByClass(kelas) {

  const sheet =
    SS.getSheetByName("Siswa");

  const data =
    getMasterSheetData("Siswa");

  const hasil = [];

  for (let i = 1; i < data.length; i++) {

    if (

      String(data[i][6]) ===
      String(kelas)

      &&

      String(data[i][7]) ===
      "Aktif"

    ) {

      hasil.push({

        nisn: data[i][1],

        nama: data[i][2]

      });

    }

  }

  return JSON.stringify(hasil);

}

/* =========================
   MAPEL OPTIONS (UTILITY)
========================= */

function getMapelOptions() {

  const sheet =

    SS.getSheetByName(

      "Mapel"

    );

  const data =

    getMasterSheetData("Mapel");

  const hasil = [];

  for (

    let i = 1;

    i < data.length;

    i++

  ) {

    if (

      data[i][3] ===

      "Aktif"

    ) {

      hasil.push({

        id:

          data[i][0],

        nama:

          data[i][1]

      });

    }

  }

  return JSON.stringify(

    hasil

  );

}

/* =========================
   TEMPLATE EXCEL (UTILITY)
========================= */

function createTemplateSpreadsheet(

  fileName,

  headers,

  sheetName = "Import"

) {

  const spreadsheet =

    SpreadsheetApp.create(

      fileName

    );

  const sheet =

    spreadsheet.getSheets()[0];

  sheet.setName(

    sheetName

  );

  sheet

    .getRange(

      1,
      1,
      1,
      headers.length

    )

    .setValues([

      headers

    ]);

  sheet

    .getRange(

      1,
      1,
      1,
      headers.length

    )

    .setFontWeight(

      "bold"

    )

    .setBackground(

      "#0b5ed7"

    )

    .setFontColor(

      "#ffffff"

    );

  sheet.setFrozenRows(

    1

  );

  SpreadsheetApp.flush();

  return {

    spreadsheet:

      spreadsheet,

    spreadsheetId:

      spreadsheet.getId(),

    sheet:

      sheet

  };

}

/* =========================
   DATA VALIDATION (UTILITY)
========================= */

function setDropdownValidation(

  targetSheet,

  targetRange,

  sourceSheet,

  sourceRange

) {

  const rule =

    SpreadsheetApp

      .newDataValidation()

      .requireValueInRange(

        sourceSheet.getRange(

          sourceRange

        ),

        true

      )

      .build();

  targetSheet

    .getRange(

      targetRange

    )

    .setDataValidation(

      rule

    );

}

/* =========================
   LOOKUP GURU (UTILITY)
========================= */

function getGuruIdByNama(

  namaGuru

) {

  const data =
    getMasterSheetData("Guru");

  for (

    let i = 1;

    i < data.length;

    i++

  ) {

    if (

      String(

        data[i][1]

      ).trim()

      ===

      String(

        namaGuru

      ).trim()

    ) {

      return data[i][0];

    }

  }

  return null;

}

function splitMapelRekapValue(value) {

  return String(
    value || ""
  )
    .split("|")
    .map(function (item) {
      return String(item).trim();
    })
    .filter(function (item) {
      return item !== "";
    });

}

function matchesMapelRekap(
  sourceValue,
  selectedMapel
) {

  if (!selectedMapel) {
    return true;
  }

  return splitMapelRekapValue(
    sourceValue
  ).includes(
    String(selectedMapel).trim()
  );

}

/* =========================
   EXPORT ENGINE
========================= */

function createExportSpreadsheet(
  namaFile
) {

  return SpreadsheetApp.create(
    namaFile
  );

}

function createExportFileName(
  prefix
) {

  const tanggal =

    Utilities.formatDate(

      new Date(),

      Session.getScriptTimeZone(),

      "yyyy-MM-dd"

    );

  return (

    prefix +

    "_" +

    tanggal

  );

}

function exportSpreadsheetAsXlsx(
  spreadsheetId
) {

  return (

    "https://docs.google.com/spreadsheets/d/"

    +

    spreadsheetId

    +

    "/export?format=xlsx"

  );

}

function cleanupExportSpreadsheet(
  spreadsheetId
) {

  DriveApp
    .getFileById(
      spreadsheetId
    )
    .setTrashed(
      true
    );

}

function exportSpreadsheetAsPdf(
  spreadsheetId
) {

  return (

    "https://docs.google.com/spreadsheets/d/"

    +

    spreadsheetId

    +

    "/export?format=pdf&size=A4&portrait=true&fitw=true&gridlines=false&printtitle=false&sheetnames=false&pagenum=false"

  );

}

/* =========================
   EXPORT DATA SISWA (UTILITY)
========================= */

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

/* =========================
   NAMA HARI
========================= */

function getNamaHariIndonesia(

  tanggal

) {

  return getWeekDays()[

    new Date(
      tanggal
    ).getDay()

  ];

}
