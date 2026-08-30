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
 * IDENTITY APLIKASI - single owner identity aplikasi.
 *
 * Pemilik kontrak: getAppInfo() (lihat ARCHITECTURE.md -
 * IDENTITY & BRANDING ARCHITECTURE).
 *
 * - Berlaku pada level deployment/platform.
 * - Dapat dipanggil TANPA session (pre-login), karena itu
 *   tidak menggunakan checkRole().
 * - Membaca Sheet Pengaturan (Key | Value) via cache layer
 *   getMasterSheetData("Pengaturan").
 * - TIDAK berisi identitas sekolah (nama_sekolah,
 *   kepala_sekolah, logo_sekolah) - pemiliknya
 *   getSchoolIdentity() di Pengaturan.js.
 *
 * Kontrak response (camelCase, konsisten dengan
 * getSchoolIdentity):
 * {
 *   namaAplikasi  : dari key "nama_aplikasi",
 *                   fallback "Administratif Guru"
 *                   (default universal, bukan WONG MIT)
 *   appLongName   : kepanjangan aplikasi, fallback
 *                   universal tanpa nama sekolah
 *   logoAplikasi  : dari key "logo_aplikasi",
 *                   fallback "" (File ID, tanpa resolver URL)
 *   favicon       : dari key "favicon", fallback ""
 *   versiAplikasi : dari key "versi_aplikasi",
 *                   fallback "" (tidak ada konstanta versi
 *                   existing di kode)
 * }
 */

function getAppInfo() {

  const data =
    getMasterSheetData("Pengaturan");

  const config = {};

  for (let i = 1; i < data.length; i++) {

    const key =
      String(data[i][0]).trim();

    if (key) {
      config[key] = data[i][1];
    }

  }

  return {

    namaAplikasi:
      config.nama_aplikasi ||
      "Administratif Guru",

    appLongName:
      "Aplikasi Administratif Guru Online",

    logoAplikasi:
      config.logo_aplikasi || "",

    favicon:
      config.favicon || "",

    versiAplikasi:
      config.versi_aplikasi || "",

    /* Alias legacy - dipertahankan untuk backward
       compatibility kontrak lama. Canonical:
       namaAplikasi & logoAplikasi. */

    appName:
      config.nama_aplikasi ||
      "Administratif Guru",

    logo:
      config.logo_aplikasi || ""

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
