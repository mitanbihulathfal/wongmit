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
