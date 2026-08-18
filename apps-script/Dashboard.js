/* =========================
   DASHBOARD
========================= */

function getDashboardData() {

  const siswaSheet =
    SS.getSheetByName("Siswa");

  const guruSheet =
    SS.getSheetByName("Guru");

  const kelasSheet =
    SS.getSheetByName("Kelas");

  const absensiSheet =
    SS.getSheetByName("Absensi");

  const pengaturanSheet =
    SS.getSheetByName("Pengaturan");

  /* =========================
     PENGATURAN — BATCH READ
  ========================= */

  const configData =
    pengaturanSheet
      .getDataRange()
      .getValues();

  const config = {};

  for (
    let i = 1;
    i < configData.length;
    i++
  ) {

    config[
      configData[i][0]
    ] = configData[i][1];

  }

  /* =========================
     MASTER — READ MINIMAL
  ========================= */

  const totalSiswa =
    Math.max(
      siswaSheet.getLastRow() - 1,
      0
    );

  const guruLastRow =
    guruSheet.getLastRow();

  const guruData =
    guruLastRow > 1
      ? guruSheet
          .getRange(
            2,
            1,
            guruLastRow - 1,
            3
          )
          .getValues()
      : [];

  let totalGuru = 0;

  for (
    let i = 0;
    i < guruData.length;
    i++
  ) {

    const role =
      String(
        guruData[i][2] || ""
      ).trim();

    if (
      role !== "Admin"
    ) {

      totalGuru++;

    }

  }

  const totalKelas =
    Math.max(
      kelasSheet.getLastRow() - 1,
      0
    );

  /* =========================
     ABSENSI HARI INI
     BACA KOLOM YANG DIPERLUKAN
  ========================= */

  const absensiLastRow =
    absensiSheet.getLastRow();

  const absensiData =
    absensiLastRow > 1
      ? absensiSheet
          .getRange(
            2,
            1,
            absensiLastRow - 1,
            4
          )
          .getValues()
      : [];

  const sekarang =
    new Date();

  const awalHari =
    new Date(sekarang);

  awalHari.setHours(
    0,
    0,
    0,
    0
  );

  const awalBesok =
    new Date(awalHari);

  awalBesok.setDate(
    awalBesok.getDate() + 1
  );

  const kelasSudahAbsen =
    new Set();

  for (
    let i = 0;
    i < absensiData.length;
    i++
  ) {

    const tanggal =
      absensiData[i][0];

    if (
      !tanggal
    ) {
      continue;
    }

    const tanggalAbsensi =
      tanggal instanceof Date
        ? tanggal
        : new Date(tanggal);

    if (
      tanggalAbsensi >= awalHari &&
      tanggalAbsensi < awalBesok
    ) {

      kelasSudahAbsen.add(
        String(
          absensiData[i][3] || ""
        ).trim()
      );

    }

  }

  return {

    totalSiswa,

    totalGuru,

    totalKelas,

    hadir:
      kelasSudahAbsen.size,

    totalDiabsen:
      totalKelas,

    izin: 0,

    sakit: 0,

    alpa: 0,

    tahunAjaran:
      config.tahun_ajaran,

    semester:
      config.semester

  };

}

function getDashboardAttendanceSummary() {

  const sheet =
    SS.getSheetByName("Absensi");

  const kelasSheet =
    SS.getSheetByName("Kelas");

  const guruMengajarSheet =
    SS.getSheetByName("GuruMengajar");

  const guruSheet =
    SS.getSheetByName("Guru");

  if (
    !sheet ||
    !kelasSheet ||
    !guruMengajarSheet ||
    !guruSheet
  ) {

    throw new Error(
      "Sheet Dashboard Absensi tidak lengkap."
    );

  }

  /* =========================
     KELAS — KOLOM A SAJA
  ========================= */

  const kelasLastRow =
    kelasSheet.getLastRow();

  const kelasData =
    kelasLastRow > 1
      ? kelasSheet
          .getRange(
            2,
            1,
            kelasLastRow - 1,
            1
          )
          .getValues()
          .flat()
      : [];

  /* =========================
     GURU — KOLOM A:B
  ========================= */

  const guruLastRow =
    guruSheet.getLastRow();

  const guruData =
    guruLastRow > 1
      ? guruSheet
          .getRange(
            2,
            1,
            guruLastRow - 1,
            2
          )
          .getValues()
      : [];

  const guruById =
    new Map();

  for (
    let i = 0;
    i < guruData.length;
    i++
  ) {

    const idGuru =
      String(
        guruData[i][0] || ""
      ).trim();

    if (
      !idGuru
    ) {
      continue;
    }

    guruById.set(
      idGuru,
      String(
        guruData[i][1] || ""
      ).trim()
    );

  }

  /* =========================
     GURU MENGAJAR
     KOLOM B:F
  ========================= */

  const guruMengajarLastRow =
    guruMengajarSheet.getLastRow();

  const guruMengajarData =
    guruMengajarLastRow > 1
      ? guruMengajarSheet
          .getRange(
            2,
            2,
            guruMengajarLastRow - 1,
            5
          )
          .getValues()
      : [];

  const hariSekarang =
    getWeekDays()[
      new Date().getDay()
    ];

  const guruMengajarByKelasHari =
    new Map();

  for (
    let i = 0;
    i < guruMengajarData.length;
    i++
  ) {

    const idGuru =
      String(
        guruMengajarData[i][0] || ""
      ).trim();

    const kelasGuru =
      String(
        guruMengajarData[i][1] || ""
      ).trim();

    const hariGuru =
      String(
        guruMengajarData[i][2] || ""
      ).trim();

    const statusGuru =
      String(
        guruMengajarData[i][4] || ""
      ).trim();

    if (
      statusGuru !== "Aktif" ||
      !idGuru ||
      !kelasGuru ||
      !hariGuru
    ) {
      continue;
    }

    const key =
      kelasGuru +
      "\u0000" +
      hariGuru;

    if (
      !guruMengajarByKelasHari.has(
        key
      )
    ) {

      guruMengajarByKelasHari.set(
        key,
        guruById.get(
          idGuru
        ) || "-"
      );

    }

  }

  /* =========================
     ABSENSI — KOLOM A:E SAJA
     SATU KALI READ
  ========================= */

  const absensiLastRow =
    sheet.getLastRow();

  const absensi =
    absensiLastRow > 1
      ? sheet
          .getRange(
            2,
            1,
            absensiLastRow - 1,
            5
          )
          .getValues()
      : [];

  /* =========================
     BATAS HARI
     TANPA formatDate PER BARIS
  ========================= */

  const sekarang =
    new Date();

  const awalHari =
    new Date(sekarang);

  awalHari.setHours(
    0,
    0,
    0,
    0
  );

  const awalBesok =
    new Date(awalHari);

  awalBesok.setDate(
    awalBesok.getDate() + 1
  );

  const absensiByKelas =
    new Map();

  for (
    let i = 0;
    i < absensi.length;
    i++
  ) {

    const nilaiTanggal =
      absensi[i][0];

    if (
      !nilaiTanggal
    ) {
      continue;
    }

    const tanggal =
      nilaiTanggal instanceof Date
        ? nilaiTanggal
        : new Date(
            nilaiTanggal
          );

    if (
      tanggal < awalHari ||
      tanggal >= awalBesok
    ) {
      continue;
    }

    const kelas =
      String(
        absensi[i][3] || ""
      ).trim();

    if (
      !kelas
    ) {
      continue;
    }

    let summary =
      absensiByKelas.get(
        kelas
      );

    if (!summary) {

      summary = {
        hadir: 0,
        sakit: 0,
        izin: 0,
        alpa: 0,
        total: 0
      };

      absensiByKelas.set(
        kelas,
        summary
      );

    }

    const status =
      String(
        absensi[i][4] || ""
      ).trim();

    switch (status) {

      case "Hadir":
        summary.hadir++;
        break;

      case "Sakit":
        summary.sakit++;
        break;

      case "Izin":
        summary.izin++;
        break;

      case "Alpa":
        summary.alpa++;
        break;

    }

    summary.total++;

  }

  /* =========================
     BENTUK HASIL
  ========================= */

  const hasil = [];

  kelasData.forEach(
    function (kelas) {

      const kelasKey =
        String(
          kelas || ""
        ).trim();

      const guruMengajar =
        guruMengajarByKelasHari.get(
          kelasKey +
          "\u0000" +
          String(
            hariSekarang
          ).trim()
        ) || "-";

      const summary =
        absensiByKelas.get(
          kelasKey
        );

      if (!summary) {

        hasil.push({

          kelas: kelas,

          guruMengajar:
            guruMengajar,

          status:
            "Belum diabsen"

        });

        return;

      }

      hasil.push({

        kelas: kelas,

        guruMengajar:
          guruMengajar,

        hadir:
          summary.hadir,

        sakit:
          summary.sakit,

        izin:
          summary.izin,

        alpa:
          summary.alpa,

        total:
          summary.total

      });

    }
  );

  /* =========================
     SORT KELAS
  ========================= */

  hasil.sort(
    function (a, b) {

      return String(
        a.kelas
      ).localeCompare(
        String(
          b.kelas
        ),
        undefined,
        {
          numeric: true
        }
      );

    }
  );

  return hasil;

}
