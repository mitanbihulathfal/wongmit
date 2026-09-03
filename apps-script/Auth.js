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

      /* Sprint 4D - Maintenance gate:
         saat mode_maintenance aktif
         hanya Admin yang boleh masuk.
         Session TIDAK dibuat untuk
         non-Admin. Field maintenance
         bersifat ADDITIVE - handler
         lama yang hanya membaca
         result.success tetap
         kompatibel. Fail-open di
         isMaintenanceMode(). */

      if (
        isMaintenanceMode() &&
        String(data[i][4])
          .split(",")
          .indexOf("Admin") === -1
      ) {

        return {

          success: false,

          maintenance: true

        };

      }

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

      /* Sprint 4D - Maintenance gate:
         session valid + maintenance
         aktif + non-Admin -> false
         (kontrak boolean TETAP;
         frontend existing otomatis
         mengarahkan ke login page).
         Admin tetap true. Fail-open
         di isMaintenanceMode(). */

      if (
        isMaintenanceMode() &&
        String(
          getRoleBySession(sessionId) || ""
        ).split(",").indexOf("Admin") === -1
      ) {

        return false;

      }

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

  /* Sprint 4D - Maintenance gate:
     saat mode_maintenance aktif,
     RPC non-Admin ditolak
     SERVER-SIDE (menutup tab lama
     yang masih terbuka dengan
     session aktif). Admin bypass.
     Pesan error Maintenance
     DIBEDAKAN dari "Akses ditolak"
     agar caller dapat
     membedakannya. Fail-open di
     isMaintenanceMode(). */

  if (
    isMaintenanceMode() &&
    role.split(",").indexOf("Admin") === -1
  ) {

    throw new Error(
      "Aplikasi sedang dalam mode maintenance"
    );

  }

  const roles =
    role.split(',');

  return allowedRoles.some(

    r => roles.includes(r)

  );

}
