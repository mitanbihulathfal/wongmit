const SS = SpreadsheetApp.getActiveSpreadsheet();

/* =========================================================
   P4–P6 MASTER DATA LAYER
   Master Data Bundle + Cache + Invalidation
   ========================================================= */

const MASTER_SHEETS = [
  "Siswa",
  "Guru",
  "Kelas",
  "Mapel",
  "GuruMengajar",
  "Pengaturan"
];

const MASTER_CACHE_PREFIX = "WONGMIT_MASTER_V1_";
const MASTER_CACHE_TTL = 21600; // maksimum 6 jam

/**
 * Membaca satu Master Sheet.
 *
 * Untuk sementara fungsi ini adalah single source
 * bagi seluruh pembacaan Master Data.
 *
 * P5 akan menambahkan Cache hit/fallback.
 * P6 akan memastikan cache dihapus setelah perubahan data.
 */
function getMasterSheetData(sheetName) {

  if (!MASTER_SHEETS.includes(sheetName)) {
    throw new Error(
      "Sheet bukan bagian dari Master Data: " + sheetName
    );
  }

  const cache =
    CacheService.getScriptCache();

  const cacheKey =
    MASTER_CACHE_PREFIX +
    sheetName;

  const cached =
    cache.get(cacheKey);

  if (cached) {

    try {
      return JSON.parse(cached);
    } catch (error) {
      // Cache rusak → abaikan dan baca ulang Sheet.
      cache.remove(cacheKey);
    }

  }

  const sheet =
    SS.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(
      "Sheet Master Data tidak ditemukan: " + sheetName
    );
  }

  const data =
    sheet
      .getDataRange()
      .getValues();

  /*
   * CacheService memiliki batas ukuran value.
   * Jika data terlalu besar, jangan paksa masuk cache.
   * Sistem tetap bekerja dengan fallback ke Sheet.
   */
  try {

    const serialized =
      JSON.stringify(data);

    if (
      serialized.length <= 95000
    ) {

      cache.put(
        cacheKey,
        serialized,
        MASTER_CACHE_TTL
      );

    }

  } catch (error) {

    console.warn(
      "Master cache gagal disimpan: " +
      sheetName
    );

  }

  return data;
}


/**
 * Master Data Bundle.
 *
 * Satu pemanggilan backend dapat mengambil
 * seluruh master yang dibutuhkan frontend.
 */
function getMasterDataBundle() {

  const bundle = {};

  MASTER_SHEETS.forEach(function (sheetName) {

    bundle[sheetName] =
      getMasterSheetData(sheetName);

  });

  return bundle;
}

/* =========================================================
   P6 — MASTER CACHE INVALIDATION
   ========================================================= */

function invalidateMasterCache(sheetNames) {

  const cache =
    CacheService.getScriptCache();

  if (!Array.isArray(sheetNames)) {
    sheetNames = [sheetNames];
  }

  sheetNames.forEach(function (sheetName) {

    if (!MASTER_SHEETS.includes(sheetName)) {
      return;
    }

    cache.remove(
      MASTER_CACHE_PREFIX +
      sheetName
    );

  });

}


/**
 * Invalidate seluruh Master Data Cache.
 */
function invalidateAllMasterCache() {

  invalidateMasterCache(
    MASTER_SHEETS
  );

}

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

function getKelasAbsensi(sessionId) {

  const role =
    getRoleBySession(sessionId);

  const hasil = [];

  // ADMIN / KEPSEK
  if (
    role &&
    (
      role.includes("Admin") ||
      role.includes("KepalaSekolah")
    )
  ) {

    const sheet =
      SS.getSheetByName("Kelas");

    const data =
      getMasterSheetData("Kelas");

    for (let i = 1; i < data.length; i++) {

      if (
        String(data[i][3]) ===
        "Aktif"
      ) {

        hasil.push({

          nama: data[i][1]

        });

      }

    }

    return JSON.stringify(hasil);

  }

  // GURU

  const sessionSheet =
    SS.getSheetByName(
      "Session"
    );

  const sessionData =
    sessionSheet
      .getDataRange()
      .getValues();

  let idGuru = "";

  for (
    let i = 1;
    i < sessionData.length;
    i++
  ) {

    if (

      String(
        sessionData[i][0]
      ) ===
      String(sessionId)

      &&

      String(
        sessionData[i][5]
      ) ===
      "Aktif"

    ) {

      idGuru =
        sessionData[i][1];

      break;

    }

  }

  const sheetGuruMengajar =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const dataMengajar =
    getMasterSheetData("GuruMengajar");

  const daftarKelas = [];

  for (
    let i = 1;
    i < dataMengajar.length;
    i++
  ) {

    if (

      String(
        dataMengajar[i][1]
      ).trim()

      !==

      String(
        idGuru
      ).trim()

    ) {

      continue;

    }

    if (

      String(
        dataMengajar[i][5]
      ).trim()

      !==

      "Aktif"

    ) {

      continue;

    }

    const kelas =

      String(
        dataMengajar[i][2]
      ).trim();

    if (

      !daftarKelas.includes(
        kelas
      )

    ) {

      daftarKelas.push(
        kelas
      );

      hasil.push({

        nama: kelas

      });

    }

  }

  return JSON.stringify(
    hasil
  );

}

/* =========================
   MAPEL
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
   ID MAPEL (UTILITY)
========================= */

function generateMapelId() {

  return "MP" + Utilities.getUuid().substring(0, 8);

}

/* =========================
   IMPORT MAPEL (UTILITY)
========================= */

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

/* =========================
   TEMPLATE GURU MENGAJAR (UTILITY)
========================= */

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

/* =========================
   TEMPLATE SISWA (UTILITY)
========================= */

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

/* =========================
   IMPORT SISWA (UTILITY)
========================= */

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

/* =========================
   IMPORT GURU MENGAJAR (UTILITY)
========================= */

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

/* =========================
   GURU MENGAJAR
========================= */

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

function getMapelRekap(
  sessionId,
  guru = "",
  kelas = ""
) {

  const dataMengajar =
    getFilteredGuruMengajar(
      sessionId,
      guru,
      kelas
    );

  const daftarMapel = [];

  for (
    let i = 0;
    i < dataMengajar.length;
    i++
  ) {

    const mapelItems =
      splitMapelRekapValue(
        dataMengajar[i].mapel
      );

    for (
      let j = 0;
      j < mapelItems.length;
      j++
    ) {

      if (
        !daftarMapel.includes(
          mapelItems[j]
        )
      ) {
        daftarMapel.push(
          mapelItems[j]
        );
      }

    }

  }

  return JSON.stringify(
    daftarMapel
  );

}

/* =========================
   RELASI MENGAJAR
========================= */

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

/* =========================
   CARI RELASI BERDASARKAN
   KELAS + HARI
========================= */

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

/* =========================
   TEMPLATE MANAGER
========================= */

/* =========================
   ABSENSI
========================= */

/* =========================
   DATA REKAP INTERNAL (ARRAY)
========================= */

function getDataRekapRaw(
  sessionId,
  tanggalAwal,
  tanggalAkhir,
  guru,
  kelas,
  mapel,
  relasiMengajar
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
      "Absensi"
    );

  const data =

    sheet
      .getDataRange()
      .getValues();

  const hasil = [];

  hasil.push(
    data[0]
  );

  const daftarRelasi =
    new Set();

  relasiMengajar.forEach(function (item) {
    daftarRelasi.add(item.idRelasi);
  });

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    const tanggal =

      Utilities.formatDate(

        new Date(
          data[i][0]
        ),

        Session.getScriptTimeZone(),

        "yyyy-MM-dd"

      );

    const kelasData =

      String(
        data[i][3]
      ).trim();

    const relasiData =

      String(
        data[i][7] || ""
      ).trim();

    const mapelData =

      String(
        data[i][9] || ""
      ).trim();

    if (

      tanggal >= tanggalAwal

      &&

      tanggal <= tanggalAkhir

    ) {

      if (
        kelas
        &&
        kelasData !==
        String(kelas).trim()
      ) {

        continue;

      }

      if (
        (
          guru
          ||
          mapel
        )
        &&
        !daftarRelasi.has(
          relasiData
        )
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

      hasil.push(
        data[i]
      );

    }

  }

  return hasil;

}

function getDataRekap(
  sessionId,
  tanggalAwal,
  tanggalAkhir,
  guru,
  kelas,
  mapel = ""
) {

  const relasiMengajar =

    getFilteredGuruMengajar(
      sessionId,
      guru,
      kelas,
      mapel
    );

  const hasil =

    getDataRekapRaw(
      sessionId,
      tanggalAwal,
      tanggalAkhir,
      guru,
      kelas,
      mapel,
      relasiMengajar
    );

  return JSON.stringify(
    hasil
  );

}

function mergeDataRekap(
  sessionId,
  tanggalAwal,
  tanggalAkhir,
  guru,
  kelas,
  mapel = ""
) {

  const masterSiswa =
    getMasterSiswa();

  /* Satu kali pemanggilan relasi mengajar, dipakai bersama getDataRekapRaw */
  const relasiMengajar =
    getFilteredGuruMengajar(
      sessionId,
      guru,
      kelas,
      mapel
    );

  const dataAbsensi =
    getDataRekapRaw(
      sessionId,
      tanggalAwal,
      tanggalAkhir,
      guru,
      kelas,
      mapel,
      relasiMengajar
    );

  const setKelasFilter =
    new Set();

  relasiMengajar.forEach(function (item) {
    setKelasFilter.add(item.kelas);
  });

  /* Lookup absensi per NISN utk hindari nested loop O(n*m) */
  const absensiByNisn =
    new Map();

  for (
    let j = 1;
    j < dataAbsensi.length;
    j++
  ) {

    const nisnAbs =

      String(
        dataAbsensi[j][1]
      ).trim();

    if (
      !absensiByNisn.has(
        nisnAbs
      )
    ) {

      absensiByNisn.set(
        nisnAbs,
        []
      );

    }

    absensiByNisn.get(
      nisnAbs
    ).push(
      dataAbsensi[j]
    );

  }

  const hasil = [];

  for (
    let i = 1;
    i < masterSiswa.length;
    i++
  ) {

    const kelasSiswa =

      String(
        masterSiswa[i][6]
      ).trim();

    // Filter kelas jika dipilih
    if (

      kelas

      &&

      kelasSiswa !==

      String(kelas).trim()

    ) {

      continue;

    }

    if (
      (
        guru
        ||
        mapel
      )
      &&
      !setKelasFilter.has(
        kelasSiswa
      )
    ) {

      continue;

    }

    const nisn =

      String(
        masterSiswa[i][1]
      ).trim();

    const dataSiswa = {

      nisn: nisn,

      nama: masterSiswa[i][2],

      kelas: kelasSiswa,

      absensi:
        absensiByNisn.get(
          nisn
        ) || []

    };

    hasil.push(

      dataSiswa

    );

  }

  return hasil;

}

function hitungRekap(
  dataMerge
) {

  const hasil = [];

  for (
    let i = 0;
    i < dataMerge.length;
    i++
  ) {

    const siswa =
      dataMerge[i];

    let hadir = 0;
    let sakit = 0;
    let izin = 0;
    let alpa = 0;

    for (
      let j = 0;
      j < siswa.absensi.length;
      j++
    ) {

      const status =

        String(
          siswa.absensi[j][4]
        ).trim();

      switch (status) {

        case "Hadir":
          hadir++;
          break;

        case "Sakit":
          sakit++;
          break;

        case "Izin":
          izin++;
          break;

        case "Alpa":
          alpa++;
          break;

      }

    }

    const total =

      hadir +

      sakit +

      izin +

      alpa;

    const persentase =

      total === 0

        ? 0

        : Math.round(

          (hadir / total) * 100

        );

    let keterangan = "";

    if (persentase === 100) {

      keterangan =
        "Sempurna";

    }

    else if (
      persentase >= 95
    ) {

      keterangan =
        "Sangat Baik";

    }

    else if (
      persentase >= 90
    ) {

      keterangan =
        "Baik";

    }

    else if (
      persentase >= 85
    ) {

      keterangan =
        "Cukup Baik";

    }

    else if (
      persentase >= 75
    ) {

      keterangan =
        "Perlu Peningkatan";

    }

    else if (
      persentase >= 50
    ) {

      keterangan =
        "Perlu Perhatian";

    }

    else {

      keterangan =
        "Perlu Tindak Lanjut";

    }

    hasil.push({

      nisn: siswa.nisn,

      nama: siswa.nama,

      kelas: siswa.kelas,

      hadir: hadir,

      sakit: sakit,

      izin: izin,

      alpa: alpa,

      persentase: persentase,

      keterangan: keterangan

    });

  }

  return hasil;

}

function getRekapFinal(

  sessionId,

  tanggalAwal,

  tanggalAkhir,

  guru,

  kelas,

  mapel = ""

) {

  const dataMerge =

    mergeDataRekap(

      sessionId,

      tanggalAwal,

      tanggalAkhir,

      guru,

      kelas,

      mapel

    );

  return hitungRekap(
    dataMerge
  );

}

function getSemesterExport(
  tanggalAwal,
  tanggalAkhir
) {

  const awal =
    new Date(
      tanggalAwal
    );

  const akhir =
    new Date(
      tanggalAkhir
    );

  const bulanAwal =
    awal.getMonth() + 1;

  const bulanAkhir =
    akhir.getMonth() + 1;

  if (
    bulanAwal >= 7 &&
    bulanAkhir >= 7
  ) {

    return "Ganjil";

  }

  if (
    bulanAwal <= 6 &&
    bulanAkhir <= 6
  ) {

    return "Genap";

  }

  return "Lintas Semester";

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

function exportRekapExcel(
  sessionId,
  tanggalAwal,
  tanggalAkhir,
  guru,
  kelas,
  mapel = "",
  guruText,
  dataSnapshot
) {

  if (
    arguments.length < 7
  ) {
    guruText = mapel;
    mapel = "";
  }

  const snapshotValid =
    Array.isArray(dataSnapshot) &&
    dataSnapshot.every(function (row) {
      return row &&
        Object.prototype.hasOwnProperty.call(row, "nisn") &&
        Object.prototype.hasOwnProperty.call(row, "nama") &&
        Object.prototype.hasOwnProperty.call(row, "kelas") &&
        Object.prototype.hasOwnProperty.call(row, "hadir") &&
        Object.prototype.hasOwnProperty.call(row, "sakit") &&
        Object.prototype.hasOwnProperty.call(row, "izin") &&
        Object.prototype.hasOwnProperty.call(row, "alpa") &&
        Object.prototype.hasOwnProperty.call(row, "persentase") &&
        Object.prototype.hasOwnProperty.call(row, "keterangan");
    });

  const data = snapshotValid
    ? dataSnapshot
    : getRekapFinal(
        sessionId,
        tanggalAwal,
        tanggalAkhir,
        guru,
        kelas,
        mapel
      );

  const spreadsheet =

    createExportSpreadsheet(

      createExportFileName(

        "REKAP_ABSENSI"

      )

    );

  const sheet =

    spreadsheet
      .getSheets()[0];

  const pengaturanSheet =

    SS.getSheetByName(
      "Pengaturan"
    );

  const config = {};

  pengaturanSheet

    .getDataRange()

    .getValues()

    .slice(1)

    .forEach(function (row) {

      config[row[0]] = row[1];

    });

  sheet.setName(
    "Rekap Absensi"
  );

  sheet
    .getRange("A1:J1")
    .merge();

  sheet
    .getRange("A2:J2")
    .merge();

  sheet
    .getRange("A1")
    .setValue(
      "REKAP ABSENSI SISWA"
    );

  sheet
    .getRange("A2")
    .setValue(
      "MIS TANBIHUL ATHFAL"
    );

  sheet
    .getRange("A1")
    .setFontWeight("bold")
    .setFontSize(16)
    .setHorizontalAlignment("center");

  sheet
    .getRange("A2")
    .setFontWeight("bold")
    .setFontSize(12)
    .setHorizontalAlignment("center");

  sheet
    .getRange("A4")
    .setValue("Guru");

  sheet
    .getRange("A5")
    .setValue("Kelas");

  sheet
    .getRange("A6")
    .setValue("Periode");

  sheet
    .getRange("H4")
    .setValue("Tahun Ajaran");

  sheet
    .getRange("H5")
    .setValue("Semester");

  sheet
    .getRange("H6")
    .setValue("Tanggal Export");

  sheet
    .getRange("H4:I4")
    .merge();

  sheet
    .getRange("H5:I5")
    .merge();

  sheet
    .getRange("H6:I6")
    .merge();

  sheet
    .getRange("A4:A6")
    .setFontWeight("bold");

  sheet
    .getRange("H4:H6")
    .setFontWeight("bold");

  const guruHeader =

    guruText || "Semua Guru";

  const kelasText =

    kelas || "Semua Kelas";

  const periode =

    tanggalAwal +

    " s.d. " +

    tanggalAkhir;

  const tahunAjaran =

    config.tahun_ajaran;

  const semester =

    getSemesterExport(
      tanggalAwal,
      tanggalAkhir
    );

  const tanggalExport =

    Utilities.formatDate(

      new Date(),

      Session.getScriptTimeZone(),

      "dd MMMM yyyy HH:mm"

    ) + " WIB";

  sheet
    .getRange("B4")
    .setValue(
      guruHeader
    );

  sheet
    .getRange("B5")
    .setValue(
      kelasText
    );

  sheet
    .getRange("B6")
    .setValue(
      periode
    );

  sheet
    .getRange("J4")
    .setValue(
      tahunAjaran
    );

  sheet
    .getRange("J5")
    .setValue(
      semester
    );

  sheet
    .getRange("J6")
    .setValue(
      tanggalExport
    );

  // Header export menggunakan single source of truth
  // dan lebar kolom disiapkan setelah nilai header selesai ditulis.
  sheet.setColumnWidth(1, 90);   // A : label kiri
  sheet.setColumnWidth(2, 220);  // B : nilai Guru/Kelas/Periode
  sheet.setColumnWidth(8, 120);  // H : label kanan
  sheet.setColumnWidth(10, 220); // J : nilai Tahun Ajaran/Semester/Tanggal Export

  sheet
    .getRange("A8:J8")
    .setValues([
      [

        "No",

        "NISN",

        "Nama Siswa",

        "KLS",

        "H",

        "S",

        "I",

        "A",

        "%",

        "Ket"

      ]

    ]);

  sheet
    .getRange("A8:J8")
    .setFontWeight("bold");

  sheet
    .getRange("A8:J8")
    .setHorizontalAlignment(
      "center"
    );

  sheet
    .getRange("A8:J8")
    .setVerticalAlignment(
      "middle"
    );

  sheet
    .getRange("A8:J8")
    .setBorder(

      true,

      true,

      true,

      true,

      true,

      true

    );

  sheet
    .getRange("A8:J8")
    .setBackground("#D9EAD3");

  sheet
    .getRange("A8:J8")
    .setFontColor("#000000");

  const rows = [];

  for (
    let i = 0;
    i < data.length;
    i++
  ) {

    rows.push([

      i + 1,

      data[i].nisn,

      data[i].nama,

      data[i].kelas,

      data[i].hadir,

      data[i].sakit,

      data[i].izin,

      data[i].alpa,

      data[i].persentase,

      data[i].keterangan

    ]);

  }

  if (
    rows.length > 0
  ) {

    const range =

      sheet.getRange(

        9,

        1,

        rows.length,

        10

      )

    range
      .setValues(rows);

    range
      .setBorder(

        true,

        true,

        true,

        true,

        true,

        true

      );

    range.setVerticalAlignment(
      "middle"
    );

    // Kolom No
    sheet
      .getRange(
        9,
        1,
        rows.length,
        1
      )
      .setHorizontalAlignment(
        "center"
      );

    // Kolom NISN
    sheet
      .getRange(
        9,
        2,
        rows.length,
        1
      )
      .setHorizontalAlignment(
        "center"
      );

    // Kolom KLS sampai %
    sheet
      .getRange(
        9,
        4,
        rows.length,
        6
      )
      .setHorizontalAlignment(
        "center"
      );

    // Kolom %
    for (
      let i = 0;
      i < rows.length;
      i++
    ) {

      sheet
        .getRange(
          9 + i,
          9
        )
        .setValue(

          rows[i][8] + "%"

        );

    }

  }

  // Lebar kolom laporan

  sheet.setColumnWidth(1, 55);    // No

  sheet.setColumnWidth(2, 120);   // NISN

  sheet.setColumnWidth(3, 230);   // Nama Siswa

  sheet.setColumnWidth(4, 55);    // KLS

  sheet.setColumnWidth(5, 45);    // H

  sheet.setColumnWidth(6, 45);    // S

  sheet.setColumnWidth(7, 45);    // I

  sheet.setColumnWidth(8, 45);    // A

  sheet.setColumnWidth(9, 60);    // %

  sheet.setColumnWidth(10, 180);  // Ket

  // Freeze informasi laporan
  sheet.setFrozenRows(8);

  sheet
    .getRange(
      8,
      1,
      rows.length + 1,
      10
    )
    .createFilter();

  // ==============================
  // Layout siap cetak A4 Landscape
  // ==============================

  sheet.setHiddenGridlines(true);

  const spreadsheetId =
    spreadsheet.getId();

  SpreadsheetApp.flush();

  sheet.setRowHeights(
    1,
    8,
    28
  );

  sheet.setRowHeight(
    2,
    24
  );

  sheet.setRowHeight(
    8,
    26
  );

  return {

    spreadsheetId:
      spreadsheetId,

    exportUrl:

      exportSpreadsheetAsXlsx(

        spreadsheetId

      ),

    data:
      data

  };

}

function saveAttendance(data) {

  const sheet =
    SS.getSheetByName(
      "Absensi"
    );

  if (
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return true;
  }

  /* =========================
     BATCH LOOKUP GURU MENGAJAR
  ========================= */

  const sheetGuruMengajar =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const dataMengajar =
    sheetGuruMengajar
      .getDataRange()
      .getValues();

  const relasiByKelasHari =
    new Map();

  for (
    let i = 1;
    i < dataMengajar.length;
    i++
  ) {

    if (
      String(
        dataMengajar[i][5]
      ).trim() !==
      "Aktif"
    ) {
      continue;
    }

    const kelas =
      String(
        dataMengajar[i][2]
      ).trim();

    const hari =
      String(
        dataMengajar[i][3]
      ).trim();

    const key =
      kelas +
      "\u0000" +
      hari;

    /*
     * Pertahankan perilaku lama:
     * getRelasiMengajarByHari()
     * menggunakan relasi aktif pertama
     * yang ditemukan.
     */
    if (
      !relasiByKelasHari.has(key)
    ) {

      relasiByKelasHari.set(
        key,
        {
          idRelasi:
            dataMengajar[i][0],

          hari:
            dataMengajar[i][3],

          mapel:
            dataMengajar[i][4]
        }
      );

    }

  }

  /* =========================
     BATCH BUILD ROWS
  ========================= */

  const timestamp =
    new Date();

  const rows = [];

  data.forEach(
    function (item) {

      const hari =
        getNamaHariIndonesia(
          item.tanggal
        );

      const key =
        String(
          item.kelas
        ).trim() +
        "\u0000" +
        String(
          hari
        ).trim();

      const relasi =
        relasiByKelasHari.get(
          key
        ) || null;

      rows.push([

        item.tanggal,

        item.nisn,

        item.nama,

        item.kelas,

        item.status,

        "",

        item.inputOleh,

        relasi
          ? relasi.idRelasi
          : "",

        relasi
          ? relasi.hari
          : "",

        relasi
          ? relasi.mapel
          : "",

        timestamp

      ]);

    }
  );

  /* =========================
     SINGLE BATCH WRITE
  ========================= */

  if (
    rows.length > 0
  ) {

    sheet
      .getRange(
        sheet.getLastRow() + 1,
        1,
        rows.length,
        11
      )
      .setValues(
        rows
      );

  }

  return true;

}

function reviseAttendance(
  kelas,
  tanggal,
  data
) {

  const sheet =
    SS.getSheetByName(
      "Absensi"
    );

  if (
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return true;
  }

  const allData =
    sheet
      .getDataRange()
      .getValues();

  const kelasTarget =
    String(
      kelas
    ).trim();

  const tanggalTarget =
    String(
      tanggal
    ).trim();

  /*
   * Cari semua baris Absensi yang
   * termasuk kelas + tanggal target.
   *
   * Kita tidak menghapus satu per satu.
   */
  const targetRows = [];

  for (
    let i = 1;
    i < allData.length;
    i++
  ) {

    const tgl =
      Utilities.formatDate(
        new Date(
          allData[i][0]
        ),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd"
      );

    const kelasData =
      String(
        allData[i][3]
      ).trim();

    if (
      tgl === tanggalTarget &&
      kelasData === kelasTarget
    ) {

      targetRows.push(
        i
      );

    }

  }

  if (
    targetRows.length === 0
  ) {

    throw new Error(
      "Data absensi yang akan direvisi tidak ditemukan."
    );

  }

  /*
   * Untuk menjaga keamanan data,
   * jumlah data revisi harus sama
   * dengan jumlah record yang sudah ada.
   */
  if (
    targetRows.length !==
    data.length
  ) {

    throw new Error(
      "Jumlah data revisi (" +
      data.length +
      ") tidak sama dengan data absensi sebelumnya (" +
      targetRows.length +
      "). Revisi dibatalkan untuk mencegah data tidak sinkron."
    );

  }

  /* =========================
     BATCH LOOKUP GURU MENGAJAR
  ========================= */

  const sheetGuruMengajar =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const dataMengajar =
    sheetGuruMengajar
      .getDataRange()
      .getValues();

  const relasiByKelasHari =
    new Map();

  for (
    let i = 1;
    i < dataMengajar.length;
    i++
  ) {

    if (
      String(
        dataMengajar[i][5]
      ).trim() !==
      "Aktif"
    ) {
      continue;
    }

    const kelasData =
      String(
        dataMengajar[i][2]
      ).trim();

    const hariData =
      String(
        dataMengajar[i][3]
      ).trim();

    const key =
      kelasData +
      "\u0000" +
      hariData;

    /*
     * Pertahankan perilaku lama:
     * gunakan relasi aktif pertama.
     */
    if (
      !relasiByKelasHari.has(
        key
      )
    ) {

      relasiByKelasHari.set(
        key,
        {
          idRelasi:
            dataMengajar[i][0],

          hari:
            dataMengajar[i][3],

          mapel:
            dataMengajar[i][4]
        }
      );

    }

  }

  /* =========================
     BATCH BUILD DATA REVISI
  ========================= */

  const timestamp =
    new Date();

  const rows = [];

  data.forEach(
    function (item) {

      const hari =
        getNamaHariIndonesia(
          item.tanggal
        );

      const key =
        String(
          item.kelas
        ).trim() +
        "\u0000" +
        String(
          hari
        ).trim();

      const relasi =
        relasiByKelasHari.get(
          key
        ) || null;

      rows.push([

        item.tanggal,

        item.nisn,

        item.nama,

        item.kelas,

        item.status,

        "",

        item.inputOleh,

        relasi
          ? relasi.idRelasi
          : "",

        relasi
          ? relasi.hari
          : "",

        relasi
          ? relasi.mapel
          : "",

        timestamp

      ]);

    }
  );

  /*
   * Pastikan seluruh baris target
   * benar-benar berurutan.
   *
   * Ini penting karena kita akan
   * melakukan satu setValues().
   */
  for (
    let i = 1;
    i < targetRows.length;
    i++
  ) {

    if (
      targetRows[i] !==
      targetRows[0] + i
    ) {

      throw new Error(
        "Data absensi target tidak berurutan. Revisi dibatalkan demi keamanan data."
      );

    }

  }

  /* =========================
     SINGLE BATCH UPDATE
  ========================= */

  sheet
    .getRange(
      targetRows[0] + 1,
      1,
      rows.length,
      11
    )
    .setValues(
      rows
    );

  return true;

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

function getAttendanceByClassAndDate(
  kelas,
  tanggal
) {

  const sheet =
    SS.getSheetByName(
      "Absensi"
    );

  const data =
    sheet.getDataRange()
      .getValues();

  const statusTerakhir = {};

  let info = {

    ditemukan: false,

    inputOleh: "",

    timestamp: ""

  };

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    const tgl =

      Utilities.formatDate(

        new Date(data[i][0]),

        Session.getScriptTimeZone(),

        "yyyy-MM-dd"

      );

    const kelasData =

      String(data[i][3]).trim();

    if (

      tgl === tanggal

      &&

      kelasData ===
      String(kelas).trim()

    ) {

      statusTerakhir[
        String(data[i][1])
      ] = data[i][4];

      info.ditemukan = true;

      info.inputOleh =
        data[i][6];

      info.timestamp =
        data[i][10];

    }

  }

  const hasil = [];

  for (
    const nisn
    in
    statusTerakhir
  ) {

    hasil.push({

      nisn: nisn,

      status:
        statusTerakhir[nisn]

    });

  }

  return JSON.stringify({

    info: info,

    data: hasil

  });

}
