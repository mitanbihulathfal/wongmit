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
