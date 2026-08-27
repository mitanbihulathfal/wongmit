/* =========================
   IMPORT INFRASTRUCTURE
========================= */

/* === TEMPLATE EXCEL (UTILITY) === */

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

/* === DATA VALIDATION (UTILITY) ==== */

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