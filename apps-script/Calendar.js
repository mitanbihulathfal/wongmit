/* =========================
   KALENDER SEKOLAH
========================= */

function getWeekDays() {
  return [
    "Ahad",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];
}

function validateWeekDay(hari) {

  const hariNormalized =
    String(
      hari || ""
    ).trim();

  if (
    !getWeekDays().includes(
      hariNormalized
    )
  ) {

    throw new Error(
      "Hari tidak valid. Gunakan salah satu dari: " +
      getWeekDays().join(", ")
    );

  }

  return hariNormalized;

}

function getWeeklyHolidays() {

  const sheet =
    SS.getSheetByName(
      "Pengaturan"
    );

  if (!sheet) {
    throw new Error(
      "Sheet Pengaturan tidak ditemukan"
    );
  }

  const data =
    getMasterSheetData("Pengaturan");

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    const key =
      String(
        data[i][0]
      ).trim();

    if (key === "hari_libur") {

      return String(
        data[i][1] || ""
      )
        .split(",")
        .map(function (hari) {
          return String(hari).trim();
        })
        .filter(function (hari) {
          return hari !== "";
        });

    }

  }

  return [];

}

function isSchoolHoliday(date) {

  if (!date) {
    return false;
  }

  const hari =
    getWeekDays()[
      new Date(date).getDay()
    ];

  const hariLibur =
    getWeeklyHolidays();

  return hariLibur.some(function (libur) {

    return String(libur).trim() === hari;

  });

}

/* =========================
   KONTEKS KALENDER ABSENSI
========================= */

function getAttendanceCalendarContext(
  kelas,
  tanggal,
  namaGuru = ""
) {

  const hari =
    getNamaHariIndonesia(tanggal);

  const hariLibur =
    isSchoolHoliday(tanggal);

  const namaGuruNormalized =
    String(namaGuru || "").trim();

  let roleGuru = "";
  let idGuru = "";

  if (namaGuruNormalized) {

    const guruSheet =
      SS.getSheetByName("Guru");

    const guruData =
      getMasterSheetData("Guru");

    for (let i = 1; i < guruData.length; i++) {

      if (
        String(guruData[i][1]).trim()
        === namaGuruNormalized
      ) {

        idGuru = guruData[i][0];
        roleGuru = String(guruData[i][2] || "").trim();
        break;

      }

    }

  }

  const rolesGuru =
    roleGuru
      .split(",")
      .map(function (role) {
        return String(role).trim();
      })
      .filter(Boolean);

  const isExemptRole =
    rolesGuru.includes("Admin")
    ||
    rolesGuru.includes("KepalaSekolah");

  let hasTeacherSchedule = false;
  let teacherSchedule = null;

  if (idGuru && !isExemptRole) {

    const sheetGuruMengajar =
      SS.getSheetByName("GuruMengajar");

    const dataMengajar =
      getMasterSheetData("GuruMengajar");

    for (let i = 1; i < dataMengajar.length; i++) {

      if (
        String(dataMengajar[i][1]).trim()
        !== String(idGuru).trim()
      ) {
        continue;
      }

      if (
        String(dataMengajar[i][2]).trim()
        !== String(kelas).trim()
      ) {
        continue;
      }

      if (
        String(dataMengajar[i][3]).trim()
        !== String(hari).trim()
      ) {
        continue;
      }

      if (
        String(dataMengajar[i][5]).trim()
        !== "Aktif"
      ) {
        continue;
      }

      hasTeacherSchedule = true;

      teacherSchedule = {
        idRelasi: dataMengajar[i][0],
        hari: dataMengajar[i][3],
        mapel: dataMengajar[i][4]
      };

      break;

    }

  }

  const shouldWarnTeacherSchedule =
    !!idGuru
    &&
    !isExemptRole
    &&
    !hasTeacherSchedule;

  return {

    tanggal: tanggal,
    hari: hari,
    isSchoolHoliday: hariLibur,
    roleGuru: roleGuru,
    isExemptRole: isExemptRole,
    hasFormalActivity: hasTeacherSchedule,
    hasTeacherSchedule: hasTeacherSchedule,
    shouldWarn: shouldWarnTeacherSchedule,
    warningType: shouldWarnTeacherSchedule
      ? "teacher_schedule"
      : "",
    teacherSchedule: teacherSchedule

  };

}

/* =========================
   NAMA HARI
========================= */

function getNamaHariIndonesia(

  tanggal

) {

  return getWeekDays()[

    new Date(
      tanggal
    ).getDay()

  ];

}
