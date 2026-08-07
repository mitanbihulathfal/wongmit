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
        "width=device-width, initial-scale=1"
      )

      .setXFrameOptionsMode(

        HtmlService
          .XFrameOptionsMode
          .ALLOWALL

      );

  return output;

}

function include(filename) {
  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();
}

function getAppInfo() {

  return {
    appName: "WONG MIT",
    appLongName: "Website ONline Guru MI Tanbihul Athfal",
    logo: "https://iili.io/CU1QcrJ.png"
  };

}

function getDashboardData() {

  const siswaSheet =
    SS.getSheetByName("Siswa");

  const guruSheet =
    SS.getSheetByName("Guru");

  const kelasSheet =
    SS.getSheetByName("Kelas");

  const absensiSheet =
    SS.getSheetByName("Absensi");

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

  const totalSiswa =
    Math.max(
      siswaSheet.getLastRow() - 1,
      0
    );

  const dataGuru =

    guruSheet
      .getDataRange()
      .getValues();

  let totalGuru = 0;

  for (

    let i = 1;

    i < dataGuru.length;

    i++

  ) {

    const role =

      String(
        dataGuru[i][2]
      ).trim();

    if (

      role !== "Admin"

    ) {

      totalGuru++;

    }

  }

  const totalKelas =
    Math.max(
      kelasSheet.getLastRow() - 1,
      0
    );

  const dataAbsensi =
    absensiSheet
      .getDataRange()
      .getValues();

  const hariIni =
    Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );

  const kelasSudahAbsen =
    new Set();

  for (let i = 1; i < dataAbsensi.length; i++) {

    const tanggal = Utilities.formatDate(
      new Date(dataAbsensi[i][0]),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );

    if (tanggal === hariIni) {

      kelasSudahAbsen.add(
        String(dataAbsensi[i][3]).trim()
      );

    }

  }

  return {

    totalSiswa,
    totalGuru,
    totalKelas,

    hadir:
      kelasSudahAbsen.size,

    totalDiabsen:
      totalKelas,

    izin: 0,
    sakit: 0,
    alpa: 0,

    tahunAjaran:
      config.tahun_ajaran,

    semester:
      config.semester

  };

}

function getDashboardAttendanceSummary() {

  const sheet =
    SS.getSheetByName("Absensi");

  const kelasSheet =
    SS.getSheetByName("Kelas");

  const kelasData =
    kelasSheet
      .getRange(2, 1, kelasSheet.getLastRow() - 1, 1)
      .getValues()
      .flat();

  const absensi =
    sheet
      .getDataRange()
      .getValues();

  const hariIni =
    Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );

  const hasil = [];

  kelasData.forEach(function (kelas) {

    const dataKelas =
      absensi.filter(function (r) {

        const tgl =
          Utilities.formatDate(
            new Date(r[0]),
            Session.getScriptTimeZone(),
            "yyyy-MM-dd"
          );

        return tgl === hariIni &&
          String(r[3]).trim() === String(kelas).trim();

      });

    if (dataKelas.length === 0) {

      hasil.push({

        kelas: kelas,

        status: "Belum diabsen"

      });

      return;

    }

    let hadir = 0;
    let sakit = 0;
    let izin = 0;
    let alpa = 0;

    dataKelas.forEach(function (r) {

      switch (r[4]) {

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

    });

    hasil.push({

      kelas: kelas,

      hadir: hadir,

      sakit: sakit,

      izin: izin,

      alpa: alpa,

      total: dataKelas.length

    });

  });

  hasil.sort(function (a, b) {

    return String(a.kelas).localeCompare(

      String(b.kelas),

      undefined,

      {

        numeric: true

      }

    );

  });

  return hasil;

}

/* =========================
   PENGATURAN AKADEMIK
========================= */

function getAcademicSettings() {

  const sheet =

    SS.getSheetByName(
      "Pengaturan"
    );

  const data =

    sheet
      .getDataRange()
      .getValues();

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

function saveAcademicSettings(data) {

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

  return true;

}

function getPage(pageName) {

  return HtmlService
    .createHtmlOutputFromFile(pageName)
    .getContent();

}

function getStudents() {

  const sheet = SS.getSheetByName("Siswa");

  const data = sheet.getDataRange().getValues();

  return JSON.stringify(data);

}

function addStudent(data) {

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

  return true;

}

function getStudentById(id) {

  const sheet = SS.getSheetByName("Siswa");

  const data = sheet.getDataRange().getValues();

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

function updateStudent(data) {

  const sheet = SS.getSheetByName("Siswa");

  const allData = sheet.getDataRange().getValues();

  for (let i = 1; i < allData.length; i++) {

    if (String(allData[i][0]) === String(data.id)) {

      sheet.getRange(i + 1, 1, 1, 8).setValues([[
        data.id,
        data.nisn,
        data.nama,
        data.jk,
        data.tempatLahir,
        data.tanggalLahir,
        data.kelas,
        data.status
      ]]);

      return true;

    }

  }

  return false;

}

function deleteStudent(id) {

  const sheet = SS.getSheetByName("Siswa");

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (String(data[i][0]) === String(id)) {

      sheet.deleteRow(i + 1);

      return true;

    }

  }

  return false;

}

/* =========================
   MASTER SISWA (UTILITY)
========================= */

function getMasterSiswa() {

  const sheet =
    SS.getSheetByName(
      "Siswa"
    );

  return sheet
    .getDataRange()
    .getValues();

}

/* =========================
   MASTER ABSENSI (UTILITY)
========================= */

function getMasterAbsensi() {

  const sheet =
    SS.getSheetByName(
      "Absensi"
    );

  return sheet
    .getDataRange()
    .getValues();

}

function getTeachers(sessionId) {

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
    SS.getSheetByName("Guru");

  const data =
    sheet.getDataRange().getValues();

  return JSON.stringify(data);

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
    sheet
      .getDataRange()
      .getValues();

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

  const sheet =

    SS.getSheetByName(
      "Kelas"
    );

  const data =

    sheet
      .getDataRange()
      .getValues();

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

      String(
        data[i][3]
      ).trim()

      !==

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

function addTeacher(sessionId, data) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah"]
    );

  if (!allowed) {
    throw new Error("Akses ditolak");
  }

  const sheet =
    SS.getSheetByName("Guru");

  sheet.appendRow([
    data.id,
    data.namaGuru,
    data.username,
    data.password,
    data.role,
    data.status
  ]);

  return true;

}

function getTeacherById(id) {

  const sheet =
    SS.getSheetByName("Guru");

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (String(data[i][0]).trim() === String(id).trim()) {

      return {

        rowIndex: i + 1,

        id: data[i][0],
        namaGuru: data[i][1],
        username: data[i][2],
        password: data[i][3],
        role: data[i][4],
        status: data[i][5]

      };

    }

  }

  return null;

}

function getNamaGuruById(idGuru) {

  const sheet =
    SS.getSheetByName(
      "Guru"
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
        idGuru
      ).trim()

    ) {

      return data[i][1];

    }

  }

  return "";

}

function updateTeacher(
  sessionId,
  rowIndex,
  data
) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah"]
    );

  if (!allowed) {
    throw new Error("Akses ditolak");
  }

  const sheet =
    SS.getSheetByName("Guru");

  sheet.getRange(rowIndex, 1).setValue(data.id);
  sheet.getRange(rowIndex, 2).setValue(data.namaGuru);
  sheet.getRange(rowIndex, 3).setValue(data.username);
  sheet.getRange(rowIndex, 4).setValue(data.password);
  sheet.getRange(rowIndex, 5).setValue(data.role);
  sheet.getRange(rowIndex, 6).setValue(data.status);

  return true;

}

function deleteTeacher(
  sessionId,
  id
) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah"]
    );

  if (!allowed) {
    throw new Error("Akses ditolak");
  }

  const sheet =
    SS.getSheetByName("Guru");

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (
      String(data[i][0]).trim() ===
      String(id).trim()
    ) {

      sheet.deleteRow(i + 1);

      return true;

    }

  }

  return false;

}

function getClasses(sessionId) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah"]
    );

  if (!allowed) {
    throw new Error("Akses ditolak");
  }

  const kelasSheet =
    SS.getSheetByName("Kelas");

  const guruSheet =
    SS.getSheetByName("Guru");

  const kelasData =
    kelasSheet.getDataRange().getValues();

  const guruData =
    guruSheet.getDataRange().getValues();

  const hasil = [];

  hasil.push([
    "ID Kelas",
    "Nama Kelas",
    "Wali Kelas",
    "Status"
  ]);

  for (let i = 1; i < kelasData.length; i++) {

    const idWali =
      String(kelasData[i][2]);

    let namaWali = "-";

    for (let j = 1; j < guruData.length; j++) {

      if (
        String(guruData[j][0]) === idWali
      ) {

        namaWali = guruData[j][1];
        break;

      }

    }

    hasil.push([

      kelasData[i][0],
      kelasData[i][1],
      namaWali,
      kelasData[i][3]

    ]);

  }

  return JSON.stringify(hasil);

}

function getWaliKelasOptions() {

  const sheet =
    SS.getSheetByName("Guru");

  const data =
    sheet.getDataRange().getValues();

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

function addClass(
  sessionId,
  data
) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah"]
    );

  if (!allowed) {
    throw new Error("Akses ditolak");
  }

  const sheet =
    SS.getSheetByName("Kelas");

  sheet.appendRow([

    data.id,
    data.namaKelas,
    data.waliKelas,
    data.status

  ]);

  return true;

}

function getClassById(id) {

  const sheet =
    SS.getSheetByName("Kelas");

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (
      String(data[i][0]).trim() ===
      String(id).trim()
    ) {

      return {

        rowIndex: i + 1,

        id: data[i][0],
        namaKelas: data[i][1],
        waliKelas: data[i][2],
        status: data[i][3]

      };

    }

  }

  return null;

}

function updateClass(
  sessionId,
  rowIndex,
  data
) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah"]
    );

  if (!allowed) {
    throw new Error("Akses ditolak");
  }

  const sheet =
    SS.getSheetByName("Kelas");

  sheet.getRange(rowIndex, 1)
    .setValue(data.id);

  sheet.getRange(rowIndex, 2)
    .setValue(data.namaKelas);

  sheet.getRange(rowIndex, 3)
    .setValue(data.waliKelas);

  sheet.getRange(rowIndex, 4)
    .setValue(data.status);

  return true;

}

function deleteClass(
  sessionId,
  id
) {

  const allowed =
    checkRole(
      sessionId,
      ["Admin", "KepalaSekolah"]
    );

  if (!allowed) {
    throw new Error("Akses ditolak");
  }

  const sheet =
    SS.getSheetByName("Kelas");

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (
      String(data[i][0]).trim() ===
      String(id).trim()
    ) {

      sheet.deleteRow(i + 1);

      return true;

    }

  }

  return false;

}

function getGuruOptions() {

  const sheet =
    SS.getSheetByName("Guru");

  const data =
    sheet.getDataRange().getValues();

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
    sheet.getDataRange().getValues();

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
    sheet.getDataRange().getValues();

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
    guruSheet.getDataRange().getValues();

  const kelasData =
    kelasSheet.getDataRange().getValues();

  const relasiData =
    relasiSheet.getDataRange().getValues();

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
    guruSheet.getDataRange().getValues();

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
    sheet.getDataRange().getValues();

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
      sheet.getDataRange().getValues();

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
    sheetGuruMengajar
      .getDataRange()
      .getValues();

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
    sheet
      .getDataRange()
      .getValues();

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

    sheet
      .getDataRange()
      .getValues();

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

      return true;

    }

  }

  return false;

}

function isMapelUsed(
  namaMapel
) {

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

    const daftarMapel =

      String(
        data[i][4]
      )
        .split("|");

    for (
      let j = 0;
      j < daftarMapel.length;
      j++
    ) {

      if (

        daftarMapel[j].trim()

        ===

        String(
          namaMapel
        ).trim()

      ) {

        return true;

      }

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
    sheetGuruMengajar
      .getDataRange()
      .getValues();

  const dataGuru =
    sheetGuru
      .getDataRange()
      .getValues();

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

  const hari = [

    "Ahad",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Sabtu"

  ];

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
        sheetReferensi.getLastRow() + 1,
        4
      )
      .setValue(
        mapelData[i][1]
      );

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

  return hasil;

}

/* =========================
   LOOKUP GURU (UTILITY)
========================= */

function getGuruIdByNama(

  namaGuru

) {

  const sheet =

    SS.getSheetByName(

      "Guru"

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
   LOOKUP KELAS (UTILITY)
========================= */

function getKelasByNama(

  namaKelas

) {

  const sheet =

    SS.getSheetByName(

      "Kelas"

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

        data[i][1]

      ).trim()

      ===

      String(

        namaKelas

      ).trim()

    ) {

      return {

        id:

          data[i][0],

        nama:

          data[i][1],

        status:

          data[i][3]

      };

    }

  }

  return null;

}

/* =========================
   LOOKUP MAPEL (UTILITY)
========================= */

function getMapelByNama(

  namaMapel

) {

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

        data[i][1]

      ).trim()

      ===

      String(

        namaMapel

      ).trim()

    ) {

      return {

        id:

          data[i][0],

        nama:

          data[i][1],

        status:

          data[i][3]

      };

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

      row[2],

      daftarMapel.join("|"),

      row[8]

    ]);

    hasil.berhasil++;

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
    sheetGuruMengajar
      .getDataRange()
      .getValues();

  const dataGuru =
    sheetGuru
      .getDataRange()
      .getValues();

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

function getKelasByGuru(
  sessionId,
  idGuru
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

    sheet
      .getDataRange()
      .getValues();

  const daftarKelas = [];

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    if (

      String(
        data[i][1]
      ).trim()

      !==

      String(
        idGuru
      ).trim()

    ) {

      continue;

    }

    const kelas =

      String(
        data[i][2]
      ).trim();

    if (
      !daftarKelas.includes(
        kelas
      )
    ) {

      daftarKelas.push(
        kelas
      );

    }

  }

  return daftarKelas;

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
    sheet
      .getDataRange()
      .getValues();

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

function getRelasiMengajar(

  sessionId,

  idGuru,

  kelas,

  tanggal

) {

  const sheet =

    SS.getSheetByName(
      "GuruMengajar"
    );

  const data =

    sheet
      .getDataRange()
      .getValues();

  const hariIni =

    [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu"
    ][
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

  sheet.appendRow([

    data.idRelasi,
    data.idGuru,
    data.kelas,
    data.hari,
    data.mapel,
    data.status

  ]);

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
    data.hari
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

      return true;

    }

  }

  return false;

}

function getGuruMengajarById(
  idRelasi
) {

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

function getTemplateFolder() {

  const folderName =

    "WONG MIT - Template";

  const folders =

    DriveApp.getFoldersByName(
      folderName
    );

  if (

    folders.hasNext()

  ) {

    return folders.next();

  }

  return DriveApp.createFolder(
    folderName
  );

}

function getGuruMengajarTemplateFile() {

  const folder =

    getTemplateFolder();

  const files =

    folder.getFilesByName(
      "GuruMengajar.xlsx"
    );

  if (

    files.hasNext()

  ) {

    return files.next();

  }

  return null;

}

function createGuruMengajarTemplate() {

  const ss =

    SpreadsheetApp.create(
      "GuruMengajar"
    );

  const sheet =

    ss.getSheets()[0];

  sheet.setName(
    "GuruMengajar"
  );

  sheet
    .getRange(
      1,
      1,
      1,
      5
    )
    .setValues([[
      "Guru",
      "Kelas",
      "Hari",
      "Mata Pelajaran",
      "Status"
    ]]);

  sheet
    .getRange(
      "A1:E1"
    )
    .setFontWeight(
      "bold"
    );

  sheet.autoResizeColumns(
    1,
    5
  );

  return ss;

}

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

  const namaGuru =

    String(
      data[0].inputOleh
    ).trim();

  const guruSheet =

    SS.getSheetByName(
      "Guru"
    );

  const guruData =

    guruSheet
      .getDataRange()
      .getValues();

  let idGuru = "";

  for (

    let i = 1;

    i < guruData.length;

    i++

  ) {

    if (

      String(guruData[i][1]).trim()

      ===

      namaGuru

    ) {

      idGuru =

        guruData[i][0];

      break;

    }

  }

  data.forEach(function (item) {

    const relasi =

      getRelasiMengajarByHari(

        item.kelas,

        getNamaHariIndonesia(
          item.tanggal
        )

      );

    sheet.appendRow([

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

      new Date()

    ]);

  });

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

  const allData =

    sheet
      .getDataRange()
      .getValues();

  for (
    let i = allData.length - 1;
    i >= 1;
    i--
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

      tgl === tanggal

      &&

      kelasData ===
      String(kelas).trim()

    ) {

      sheet.deleteRow(
        i + 1
      );

    }

  }

  const namaGuru =

    String(
      data[0].inputOleh
    ).trim();

  const guruSheet =

    SS.getSheetByName(
      "Guru"
    );

  const guruData =

    guruSheet
      .getDataRange()
      .getValues();

  let idGuru = "";

  for (

    let i = 1;

    i < guruData.length;

    i++

  ) {

    if (

      String(guruData[i][1]).trim()

      ===

      namaGuru

    ) {

      idGuru =

        guruData[i][0];

      break;

    }

  }

  data.forEach(function (item) {

    const relasi =

      getRelasiMengajarByHari(

        item.kelas,

        getNamaHariIndonesia(
          item.tanggal
        )

      );

    sheet.appendRow([

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

      new Date()

    ]);

  });

  return true;

}

/* =========================
   NAMA HARI
========================= */

function getNamaHariIndonesia(

  tanggal

) {

  const hari =

    [

      "Ahad",

      "Senin",

      "Selasa",

      "Rabu",

      "Kamis",

      "Jumat",

      "Sabtu"

    ];

  return hari[

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
