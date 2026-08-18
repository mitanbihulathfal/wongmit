/* =========================
   DATA GURU
========================= */

/* === MASTER ABSENSI (UTILITY) === */

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

  const data =
    getMasterSheetData("Guru");

  return JSON.stringify(data);

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

  invalidateMasterCache("Guru");

  return true;

}

function getTeacherById(id) {

  const data =
    getMasterSheetData("Guru");

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

  invalidateMasterCache("Guru");

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
    getMasterSheetData("Guru");

  for (let i = 1; i < data.length; i++) {

    if (
      String(data[i][0]).trim() ===
      String(id).trim()
    ) {

      sheet.deleteRow(i + 1);

      invalidateMasterCache("Guru");

      return true;

    }

  }

  return false;

}
