function getKelasAbsensi(sessionId) {

  const role =
    getRoleBySession(sessionId);

  const hasil = [];

  // ADMIN / KEPSEK
  if (
    role &&
    (
      role.includes("Admin") ||
      role.includes("KepalaSekolah")
    )
  ) {

    const sheet =
      SS.getSheetByName("Kelas");

    const data =
      getMasterSheetData("Kelas");

    for (let i = 1; i < data.length; i++) {

      if (
        String(data[i][3]) ===
        "Aktif"
      ) {

        hasil.push({

          nama: data[i][1]

        });

      }

    }

    return JSON.stringify(hasil);

  }

  // GURU

  const sessionSheet =
    SS.getSheetByName(
      "Session"
    );

  const sessionData =
    sessionSheet
      .getDataRange()
      .getValues();

  let idGuru = "";

  for (
    let i = 1;
    i < sessionData.length;
    i++
  ) {

    if (

      String(
        sessionData[i][0]
      ) ===
      String(sessionId)

      &&

      String(
        sessionData[i][5]
      ) ===
      "Aktif"

    ) {

      idGuru =
        sessionData[i][1];

      break;

    }

  }

  const sheetGuruMengajar =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const dataMengajar =
    getMasterSheetData("GuruMengajar");

  const daftarKelas = [];

  for (
    let i = 1;
    i < dataMengajar.length;
    i++
  ) {

    if (

      String(
        dataMengajar[i][1]
      ).trim()

      !==

      String(
        idGuru
      ).trim()

    ) {

      continue;

    }

    if (

      String(
        dataMengajar[i][5]
      ).trim()

      !==

      "Aktif"

    ) {

      continue;

    }

    const kelas =

      String(
        dataMengajar[i][2]
      ).trim();

    if (

      !daftarKelas.includes(
        kelas
      )

    ) {

      daftarKelas.push(
        kelas
      );

      hasil.push({

        nama: kelas

      });

    }

  }

  return JSON.stringify(
    hasil
  );

}

function saveAttendance(data) {

  const sheet =
    SS.getSheetByName(
      "Absensi"
    );

  if (
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return true;
  }

  /* =========================
     BATCH LOOKUP GURU MENGAJAR
  ========================= */

  const sheetGuruMengajar =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const dataMengajar =
    sheetGuruMengajar
      .getDataRange()
      .getValues();

  const relasiByKelasHari =
    new Map();

  for (
    let i = 1;
    i < dataMengajar.length;
    i++
  ) {

    if (
      String(
        dataMengajar[i][5]
      ).trim() !==
      "Aktif"
    ) {
      continue;
    }

    const kelas =
      String(
        dataMengajar[i][2]
      ).trim();

    const hari =
      String(
        dataMengajar[i][3]
      ).trim();

    const key =
      kelas +
      "\u0000" +
      hari;

    /*
     * Pertahankan perilaku lama:
     * getRelasiMengajarByHari()
     * menggunakan relasi aktif pertama
     * yang ditemukan.
     */
    if (
      !relasiByKelasHari.has(key)
    ) {

      relasiByKelasHari.set(
        key,
        {
          idRelasi:
            dataMengajar[i][0],

          hari:
            dataMengajar[i][3],

          mapel:
            dataMengajar[i][4]
        }
      );

    }

  }

  /* =========================
     BATCH BUILD ROWS
  ========================= */

  const timestamp =
    new Date();

  const rows = [];

  data.forEach(
    function (item) {

      const hari =
        getNamaHariIndonesia(
          item.tanggal
        );

      const key =
        String(
          item.kelas
        ).trim() +
        "\u0000" +
        String(
          hari
        ).trim();

      const relasi =
        relasiByKelasHari.get(
          key
        ) || null;

      rows.push([

        item.tanggal,

        item.nisn,

        item.nama,

        item.kelas,

        item.status,

        "",

        item.inputOleh,

        relasi
          ? relasi.idRelasi
          : "",

        relasi
          ? relasi.hari
          : "",

        relasi
          ? relasi.mapel
          : "",

        timestamp

      ]);

    }
  );

  /* =========================
     SINGLE BATCH WRITE
  ========================= */

  if (
    rows.length > 0
  ) {

    sheet
      .getRange(
        sheet.getLastRow() + 1,
        1,
        rows.length,
        11
      )
      .setValues(
        rows
      );

  }

  return true;

}

function reviseAttendance(
  kelas,
  tanggal,
  data
) {

  const sheet =
    SS.getSheetByName(
      "Absensi"
    );

  if (
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return true;
  }

  const allData =
    sheet
      .getDataRange()
      .getValues();

  const kelasTarget =
    String(
      kelas
    ).trim();

  const tanggalTarget =
    String(
      tanggal
    ).trim();

  /*
   * Cari semua baris Absensi yang
   * termasuk kelas + tanggal target.
   *
   * Kita tidak menghapus satu per satu.
   */
  const targetRows = [];

  for (
    let i = 1;
    i < allData.length;
    i++
  ) {

    const tgl =
      Utilities.formatDate(
        new Date(
          allData[i][0]
        ),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd"
      );

    const kelasData =
      String(
        allData[i][3]
      ).trim();

    if (
      tgl === tanggalTarget &&
      kelasData === kelasTarget
    ) {

      targetRows.push(
        i
      );

    }

  }

  if (
    targetRows.length === 0
  ) {

    throw new Error(
      "Data absensi yang akan direvisi tidak ditemukan."
    );

  }

  /*
   * Untuk menjaga keamanan data,
   * jumlah data revisi harus sama
   * dengan jumlah record yang sudah ada.
   */
  if (
    targetRows.length !==
    data.length
  ) {

    throw new Error(
      "Jumlah data revisi (" +
      data.length +
      ") tidak sama dengan data absensi sebelumnya (" +
      targetRows.length +
      "). Revisi dibatalkan untuk mencegah data tidak sinkron."
    );

  }

  /* =========================
     BATCH LOOKUP GURU MENGAJAR
  ========================= */

  const sheetGuruMengajar =
    SS.getSheetByName(
      "GuruMengajar"
    );

  const dataMengajar =
    sheetGuruMengajar
      .getDataRange()
      .getValues();

  const relasiByKelasHari =
    new Map();

  for (
    let i = 1;
    i < dataMengajar.length;
    i++
  ) {

    if (
      String(
        dataMengajar[i][5]
      ).trim() !==
      "Aktif"
    ) {
      continue;
    }

    const kelasData =
      String(
        dataMengajar[i][2]
      ).trim();

    const hariData =
      String(
        dataMengajar[i][3]
      ).trim();

    const key =
      kelasData +
      "\u0000" +
      hariData;

    /*
     * Pertahankan perilaku lama:
     * gunakan relasi aktif pertama.
     */
    if (
      !relasiByKelasHari.has(
        key
      )
    ) {

      relasiByKelasHari.set(
        key,
        {
          idRelasi:
            dataMengajar[i][0],

          hari:
            dataMengajar[i][3],

          mapel:
            dataMengajar[i][4]
        }
      );

    }

  }

  /* =========================
     BATCH BUILD DATA REVISI
  ========================= */

  const timestamp =
    new Date();

  const rows = [];

  data.forEach(
    function (item) {

      const hari =
        getNamaHariIndonesia(
          item.tanggal
        );

      const key =
        String(
          item.kelas
        ).trim() +
        "\u0000" +
        String(
          hari
        ).trim();

      const relasi =
        relasiByKelasHari.get(
          key
        ) || null;

      rows.push([

        item.tanggal,

        item.nisn,

        item.nama,

        item.kelas,

        item.status,

        "",

        item.inputOleh,

        relasi
          ? relasi.idRelasi
          : "",

        relasi
          ? relasi.hari
          : "",

        relasi
          ? relasi.mapel
          : "",

        timestamp

      ]);

    }
  );

  /*
   * Pastikan seluruh baris target
   * benar-benar berurutan.
   *
   * Ini penting karena kita akan
   * melakukan satu setValues().
   */
  for (
    let i = 1;
    i < targetRows.length;
    i++
  ) {

    if (
      targetRows[i] !==
      targetRows[0] + i
    ) {

      throw new Error(
        "Data absensi target tidak berurutan. Revisi dibatalkan demi keamanan data."
      );

    }

  }

  /* =========================
     SINGLE BATCH UPDATE
  ========================= */

  sheet
    .getRange(
      targetRows[0] + 1,
      1,
      rows.length,
      11
    )
    .setValues(
      rows
    );

  return true;

}

function getAttendanceByClassAndDate(
  kelas,
  tanggal
) {

  const sheet =
    SS.getSheetByName(
      "Absensi"
    );

  const data =
    sheet.getDataRange()
      .getValues();

  const statusTerakhir = {};

  let info = {

    ditemukan: false,

    inputOleh: "",

    timestamp: ""

  };

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    const tgl =

      Utilities.formatDate(

        new Date(data[i][0]),

        Session.getScriptTimeZone(),

        "yyyy-MM-dd"

      );

    const kelasData =

      String(data[i][3]).trim();

    if (

      tgl === tanggal

      &&

      kelasData ===
      String(kelas).trim()

    ) {

      statusTerakhir[
        String(data[i][1])
      ] = data[i][4];

      info.ditemukan = true;

      info.inputOleh =
        data[i][6];

      info.timestamp =
        data[i][10];

    }

  }

  const hasil = [];

  for (
    const nisn
    in
    statusTerakhir
  ) {

    hasil.push({

      nisn: nisn,

      status:
        statusTerakhir[nisn]

    });

  }

  return JSON.stringify({

    info: info,

    data: hasil

  });

}
