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
