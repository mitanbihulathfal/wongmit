function getMapelRekap(
  sessionId,
  guru = "",
  kelas = ""
) {

  const dataMengajar =
    getFilteredGuruMengajar(
      sessionId,
      guru,
      kelas
    );

  const daftarMapel = [];

  for (
    let i = 0;
    i < dataMengajar.length;
    i++
  ) {

    const mapelItems =
      splitMapelRekapValue(
        dataMengajar[i].mapel
      );

    for (
      let j = 0;
      j < mapelItems.length;
      j++
    ) {

      if (
        !daftarMapel.includes(
          mapelItems[j]
        )
      ) {
        daftarMapel.push(
          mapelItems[j]
        );
      }

    }

  }

  return JSON.stringify(
    daftarMapel
  );

}

/* =========================
   DATA REKAP INTERNAL (ARRAY)
========================= */

function getDataRekapRaw(
  sessionId,
  tanggalAwal,
  tanggalAkhir,
  guru,
  kelas,
  mapel,
  relasiMengajar
) {

  const allowed =

    checkRole(
      sessionId,
      [
        "Admin",
        "KepalaSekolah",
        "WaliKelas",
        "GuruMapel"
      ]
    );

  if (!allowed) {

    throw new Error(
      "Akses ditolak"
    );

  }

  const sheet =

    SS.getSheetByName(
      "Absensi"
    );

  const data =

    sheet
      .getDataRange()
      .getValues();

  const hasil = [];

  hasil.push(
    data[0]
  );

  const daftarRelasi =
    new Set();

  relasiMengajar.forEach(function (item) {
    daftarRelasi.add(item.idRelasi);
  });

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    const tanggal =

      Utilities.formatDate(

        new Date(
          data[i][0]
        ),

        Session.getScriptTimeZone(),

        "yyyy-MM-dd"

      );

    const kelasData =

      String(
        data[i][3]
      ).trim();

    const relasiData =

      String(
        data[i][7] || ""
      ).trim();

    const mapelData =

      String(
        data[i][9] || ""
      ).trim();

    if (

      tanggal >= tanggalAwal

      &&

      tanggal <= tanggalAkhir

    ) {

      if (
        kelas
        &&
        kelasData !==
        String(kelas).trim()
      ) {

        continue;

      }

      if (
        (
          guru
          ||
          mapel
        )
        &&
        !daftarRelasi.has(
          relasiData
        )
      ) {

        continue;

      }

      if (
        mapel
        &&
        !matchesMapelRekap(
          mapelData,
          mapel
        )
      ) {

        continue;

      }

      hasil.push(
        data[i]
      );

    }

  }

  return hasil;

}

function getDataRekap(
  sessionId,
  tanggalAwal,
  tanggalAkhir,
  guru,
  kelas,
  mapel = ""
) {

  const relasiMengajar =

    getFilteredGuruMengajar(
      sessionId,
      guru,
      kelas,
      mapel
    );

  const hasil =

    getDataRekapRaw(
      sessionId,
      tanggalAwal,
      tanggalAkhir,
      guru,
      kelas,
      mapel,
      relasiMengajar
    );

  return JSON.stringify(
    hasil
  );

}

function mergeDataRekap(
  sessionId,
  tanggalAwal,
  tanggalAkhir,
  guru,
  kelas,
  mapel = ""
) {

  const masterSiswa =
    getMasterSiswa();

  /* Satu kali pemanggilan relasi mengajar, dipakai bersama getDataRekapRaw */
  const relasiMengajar =
    getFilteredGuruMengajar(
      sessionId,
      guru,
      kelas,
      mapel
    );

  const dataAbsensi =
    getDataRekapRaw(
      sessionId,
      tanggalAwal,
      tanggalAkhir,
      guru,
      kelas,
      mapel,
      relasiMengajar
    );

  const setKelasFilter =
    new Set();

  relasiMengajar.forEach(function (item) {
    setKelasFilter.add(item.kelas);
  });

  /* Lookup absensi per NISN utk hindari nested loop O(n*m) */
  const absensiByNisn =
    new Map();

  for (
    let j = 1;
    j < dataAbsensi.length;
    j++
  ) {

    const nisnAbs =

      String(
        dataAbsensi[j][1]
      ).trim();

    if (
      !absensiByNisn.has(
        nisnAbs
      )
    ) {

      absensiByNisn.set(
        nisnAbs,
        []
      );

    }

    absensiByNisn.get(
      nisnAbs
    ).push(
      dataAbsensi[j]
    );

  }

  const hasil = [];

  for (
    let i = 1;
    i < masterSiswa.length;
    i++
  ) {

    const kelasSiswa =

      String(
        masterSiswa[i][6]
      ).trim();

    // Filter kelas jika dipilih
    if (

      kelas

      &&

      kelasSiswa !==

      String(kelas).trim()

    ) {

      continue;

    }

    if (
      (
        guru
        ||
        mapel
      )
      &&
      !setKelasFilter.has(
        kelasSiswa
      )
    ) {

      continue;

    }

    const nisn =

      String(
        masterSiswa[i][1]
      ).trim();

    const dataSiswa = {

      nisn: nisn,

      nama: masterSiswa[i][2],

      kelas: kelasSiswa,

      absensi:
        absensiByNisn.get(
          nisn
        ) || []

    };

    hasil.push(

      dataSiswa

    );

  }

  return hasil;

}

function hitungRekap(
  dataMerge
) {

  const hasil = [];

  for (
    let i = 0;
    i < dataMerge.length;
    i++
  ) {

    const siswa =
      dataMerge[i];

    let hadir = 0;
    let sakit = 0;
    let izin = 0;
    let alpa = 0;

    for (
      let j = 0;
      j < siswa.absensi.length;
      j++
    ) {

      const status =

        String(
          siswa.absensi[j][4]
        ).trim();

      switch (status) {

        case "Hadir":
          hadir++;
          break;

        case "Sakit":
          sakit++;
          break;

        case "Izin":
          izin++;
          break;

        case "Alpa":
          alpa++;
          break;

      }

    }

    const total =

      hadir +

      sakit +

      izin +

      alpa;

    const persentase =

      total === 0

        ? 0

        : Math.round(

          (hadir / total) * 100

        );

    let keterangan = "";

    if (persentase === 100) {

      keterangan =
        "Sempurna";

    }

    else if (
      persentase >= 95
    ) {

      keterangan =
        "Sangat Baik";

    }

    else if (
      persentase >= 90
    ) {

      keterangan =
        "Baik";

    }

    else if (
      persentase >= 85
    ) {

      keterangan =
        "Cukup Baik";

    }

    else if (
      persentase >= 75
    ) {

      keterangan =
        "Perlu Peningkatan";

    }

    else if (
      persentase >= 50
    ) {

      keterangan =
        "Perlu Perhatian";

    }

    else {

      keterangan =
        "Perlu Tindak Lanjut";

    }

    hasil.push({

      nisn: siswa.nisn,

      nama: siswa.nama,

      kelas: siswa.kelas,

      hadir: hadir,

      sakit: sakit,

      izin: izin,

      alpa: alpa,

      persentase: persentase,

      keterangan: keterangan

    });

  }

  return hasil;

}

function getRekapFinal(

  sessionId,

  tanggalAwal,

  tanggalAkhir,

  guru,

  kelas,

  mapel = ""

) {

  const dataMerge =

    mergeDataRekap(

      sessionId,

      tanggalAwal,

      tanggalAkhir,

      guru,

      kelas,

      mapel

    );

  return hitungRekap(
    dataMerge
  );

}

function getSemesterExport(
  tanggalAwal,
  tanggalAkhir
) {

  const awal =
    new Date(
      tanggalAwal
    );

  const akhir =
    new Date(
      tanggalAkhir
    );

  const bulanAwal =
    awal.getMonth() + 1;

  const bulanAkhir =
    akhir.getMonth() + 1;

  if (
    bulanAwal >= 7 &&
    bulanAkhir >= 7
  ) {

    return "Ganjil";

  }

  if (
    bulanAwal <= 6 &&
    bulanAkhir <= 6
  ) {

    return "Genap";

  }

  return "Lintas Semester";

}

function exportRekapExcel(
  sessionId,
  tanggalAwal,
  tanggalAkhir,
  guru,
  kelas,
  mapel = "",
  guruText,
  dataSnapshot
) {

  if (
    arguments.length < 7
  ) {
    guruText = mapel;
    mapel = "";
  }

  const snapshotValid =
    Array.isArray(dataSnapshot) &&
    dataSnapshot.every(function (row) {
      return row &&
        Object.prototype.hasOwnProperty.call(row, "nisn") &&
        Object.prototype.hasOwnProperty.call(row, "nama") &&
        Object.prototype.hasOwnProperty.call(row, "kelas") &&
        Object.prototype.hasOwnProperty.call(row, "hadir") &&
        Object.prototype.hasOwnProperty.call(row, "sakit") &&
        Object.prototype.hasOwnProperty.call(row, "izin") &&
        Object.prototype.hasOwnProperty.call(row, "alpa") &&
        Object.prototype.hasOwnProperty.call(row, "persentase") &&
        Object.prototype.hasOwnProperty.call(row, "keterangan");
    });

  const data = snapshotValid
    ? dataSnapshot
    : getRekapFinal(
        sessionId,
        tanggalAwal,
        tanggalAkhir,
        guru,
        kelas,
        mapel
      );

  const spreadsheet =

    createExportSpreadsheet(

      createExportFileName(

        "REKAP_ABSENSI"

      )

    );

  const sheet =

    spreadsheet
      .getSheets()[0];

  const pengaturanSheet =

    SS.getSheetByName(
      "Pengaturan"
    );

  const config = {};

  pengaturanSheet

    .getDataRange()

    .getValues()

    .slice(1)

    .forEach(function (row) {

      config[row[0]] = row[1];

    });

  sheet.setName(
    "Rekap Absensi"
  );

  sheet
    .getRange("A1:J1")
    .merge();

  sheet
    .getRange("A2:J2")
    .merge();

  sheet
    .getRange("A1")
    .setValue(
      "REKAP ABSENSI SISWA"
    );

  sheet
    .getRange("A2")
    .setValue(
      "MIS TANBIHUL ATHFAL"
    );

  sheet
    .getRange("A1")
    .setFontWeight("bold")
    .setFontSize(16)
    .setHorizontalAlignment("center");

  sheet
    .getRange("A2")
    .setFontWeight("bold")
    .setFontSize(12)
    .setHorizontalAlignment("center");

  sheet
    .getRange("A4")
    .setValue("Guru");

  sheet
    .getRange("A5")
    .setValue("Kelas");

  sheet
    .getRange("A6")
    .setValue("Periode");

  sheet
    .getRange("H4")
    .setValue("Tahun Ajaran");

  sheet
    .getRange("H5")
    .setValue("Semester");

  sheet
    .getRange("H6")
    .setValue("Tanggal Export");

  sheet
    .getRange("H4:I4")
    .merge();

  sheet
    .getRange("H5:I5")
    .merge();

  sheet
    .getRange("H6:I6")
    .merge();

  sheet
    .getRange("A4:A6")
    .setFontWeight("bold");

  sheet
    .getRange("H4:H6")
    .setFontWeight("bold");

  const guruHeader =

    guruText || "Semua Guru";

  const kelasText =

    kelas || "Semua Kelas";

  const periode =

    tanggalAwal +

    " s.d. " +

    tanggalAkhir;

  const tahunAjaran =

    config.tahun_ajaran;

  const semester =

    getSemesterExport(
      tanggalAwal,
      tanggalAkhir
    );

  const tanggalExport =

    Utilities.formatDate(

      new Date(),

      Session.getScriptTimeZone(),

      "dd MMMM yyyy HH:mm"

    ) + " WIB";

  sheet
    .getRange("B4")
    .setValue(
      guruHeader
    );

  sheet
    .getRange("B5")
    .setValue(
      kelasText
    );

  sheet
    .getRange("B6")
    .setValue(
      periode
    );

  sheet
    .getRange("J4")
    .setValue(
      tahunAjaran
    );

  sheet
    .getRange("J5")
    .setValue(
      semester
    );

  sheet
    .getRange("J6")
    .setValue(
      tanggalExport
    );

  // Header export menggunakan single source of truth
  // dan lebar kolom disiapkan setelah nilai header selesai ditulis.
  sheet.setColumnWidth(1, 90);   // A : label kiri
  sheet.setColumnWidth(2, 220);  // B : nilai Guru/Kelas/Periode
  sheet.setColumnWidth(8, 120);  // H : label kanan
  sheet.setColumnWidth(10, 220); // J : nilai Tahun Ajaran/Semester/Tanggal Export

  sheet
    .getRange("A8:J8")
    .setValues([
      [

        "No",

        "NISN",

        "Nama Siswa",

        "KLS",

        "H",

        "S",

        "I",

        "A",

        "%",

        "Ket"

      ]

    ]);

  sheet
    .getRange("A8:J8")
    .setFontWeight("bold");

  sheet
    .getRange("A8:J8")
    .setHorizontalAlignment(
      "center"
    );

  sheet
    .getRange("A8:J8")
    .setVerticalAlignment(
      "middle"
    );

  sheet
    .getRange("A8:J8")
    .setBorder(

      true,

      true,

      true,

      true,

      true,

      true

    );

  sheet
    .getRange("A8:J8")
    .setBackground("#D9EAD3");

  sheet
    .getRange("A8:J8")
    .setFontColor("#000000");

  const rows = [];

  for (
    let i = 0;
    i < data.length;
    i++
  ) {

    rows.push([

      i + 1,

      data[i].nisn,

      data[i].nama,

      data[i].kelas,

      data[i].hadir,

      data[i].sakit,

      data[i].izin,

      data[i].alpa,

      data[i].persentase,

      data[i].keterangan

    ]);

  }

  if (
    rows.length > 0
  ) {

    const range =

      sheet.getRange(

        9,

        1,

        rows.length,

        10

      )

    range
      .setValues(rows);

    range
      .setBorder(

        true,

        true,

        true,

        true,

        true,

        true

      );

    range.setVerticalAlignment(
      "middle"
    );

    // Kolom No
    sheet
      .getRange(
        9,
        1,
        rows.length,
        1
      )
      .setHorizontalAlignment(
        "center"
      );

    // Kolom NISN
    sheet
      .getRange(
        9,
        2,
        rows.length,
        1
      )
      .setHorizontalAlignment(
        "center"
      );

    // Kolom KLS sampai %
    sheet
      .getRange(
        9,
        4,
        rows.length,
        6
      )
      .setHorizontalAlignment(
        "center"
      );

    // Kolom %
    for (
      let i = 0;
      i < rows.length;
      i++
    ) {

      sheet
        .getRange(
          9 + i,
          9
        )
        .setValue(

          rows[i][8] + "%"

        );

    }

  }

  // Lebar kolom laporan

  sheet.setColumnWidth(1, 55);    // No

  sheet.setColumnWidth(2, 120);   // NISN

  sheet.setColumnWidth(3, 230);   // Nama Siswa

  sheet.setColumnWidth(4, 55);    // KLS

  sheet.setColumnWidth(5, 45);    // H

  sheet.setColumnWidth(6, 45);    // S

  sheet.setColumnWidth(7, 45);    // I

  sheet.setColumnWidth(8, 45);    // A

  sheet.setColumnWidth(9, 60);    // %

  sheet.setColumnWidth(10, 180);  // Ket

  // Freeze informasi laporan
  sheet.setFrozenRows(8);

  sheet
    .getRange(
      8,
      1,
      rows.length + 1,
      10
    )
    .createFilter();

  // ==============================
  // Layout siap cetak A4 Landscape
  // ==============================

  sheet.setHiddenGridlines(true);

  const spreadsheetId =
    spreadsheet.getId();

  SpreadsheetApp.flush();

  sheet.setRowHeights(
    1,
    8,
    28
  );

  sheet.setRowHeight(
    2,
    24
  );

  sheet.setRowHeight(
    8,
    26
  );

  return {

    spreadsheetId:
      spreadsheetId,

    exportUrl:

      exportSpreadsheetAsXlsx(

        spreadsheetId

      ),

    data:
      data

  };

}
