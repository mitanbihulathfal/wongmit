/* =========================
        DATA KELAS
========================= */

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
    getMasterSheetData("Kelas");

  const guruData =
    getMasterSheetData("Guru");

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

  invalidateMasterCache("Kelas");

  return true;

}

function getClassById(id) {

  const data =
    getMasterSheetData("Kelas");

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

  invalidateMasterCache("Kelas");

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
    getMasterSheetData("Kelas");

  for (let i = 1; i < data.length; i++) {

    if (
      String(data[i][0]).trim() ===
      String(id).trim()
    ) {

      sheet.deleteRow(i + 1);

      invalidateMasterCache("Kelas");

      return true;

    }

  }

  return false;

}
