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
 * - Membaca Sheet Pengaturan (Key | Value) LANGSUNG dari
 *   Sheet (tanpa cache master) agar perubahan manual pada
 *   key identity aplikasi terbaca segera, tanpa menunggu
 *   TTL cache 6 jam. Pola baca langsung ini mengikuti
 *   preseden Dashboard.js/Rekap.js untuk Sheet Pengaturan.
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
 *   appLongName   : dari key "tagline_aplikasi",
 *                   fallback "Aplikasi Administratif
 *                   Guru Online" (universal, bukan
 *                   "Website ONline Guru", bukan
 *                   nama sekolah)
 *   logoAplikasi  : dari key "logo_aplikasi",
 *                   fallback "" (File ID, tanpa resolver URL)
 *   favicon       : dari key "favicon", fallback ""
 *   versiAplikasi : dari key "versi_aplikasi",
 *                   fallback "" (tidak ada konstanta versi
 *                   existing di kode)
 * }
 */

function getAppInfo() {

  /* Baca langsung dari Sheet, bukan lewat
     getMasterSheetData(), agar identity aplikasi
     selalu fresh. Cache master (TTL 6 jam) hanya
     di-invalidate oleh fungsi save, sedangkan
     perubahan manual pada Sheet Pengaturan tidak
     menghapus cache. Baca ini hanya terjadi saat
     halaman login dirender, jadi biayanya kecil. */

  const sheet =
    SS.getSheetByName("Pengaturan");

  const config = {};

  if (sheet) {

    const data =
      sheet
        .getDataRange()
        .getValues();

    for (let i = 1; i < data.length; i++) {

      const key =
        String(data[i][0]).trim();

      if (key) {
        config[key] = data[i][1];
      }

    }

  }

  return {

    namaAplikasi:
      config.nama_aplikasi ||
      "Administratif Guru",

    appLongName:
      config.tagline_aplikasi ||
      "Aplikasi Administratif Guru Online",

    logoAplikasi:
      config.logo_aplikasi || "",

    /* Field derived URL - tambahan
       saja, nilai File ID existing
       tidak berubah. */

    logoAplikasiUrl:
      resolveDriveImageUrl(
        config.logo_aplikasi
      ),

    favicon:
      config.favicon || "",

    /* Field derived URL - tambahan
       additive (Sprint 4C): favicon
       runtime dinamis. Invalid/kosong
       -> "" (frontend pakai fallback).
       Nilai File ID existing tidak
       berubah. */

    faviconUrl:
      resolveDriveImageUrl(
        config.favicon
      ),

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

/* =========================
   ASSET RESOLVER
   Kontrak Sheet tetap File ID.
   Resolver string-only (tanpa
   DriveApp): File ID valid ->
   URL thumbnail Drive yang dapat
   dipakai <img>. Invalid/kosong
   -> "" (frontend pakai fallback).
========================= */

function resolveDriveImageUrl(fileId) {

  const id =
    String(fileId || "").trim();

  if (
    !/^[A-Za-z0-9_-]{20,}$/.test(id)
  ) {

    return "";

  }

  return "https://drive.google.com/thumbnail?id="
    + id
    + "&sz=w400";

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
