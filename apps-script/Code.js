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
