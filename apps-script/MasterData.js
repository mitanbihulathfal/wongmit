/* =========================================================
   P4–P6 MASTER DATA LAYER
   Master Data Bundle + Cache + Invalidation
   ========================================================= */

const MASTER_SHEETS = [
  "Siswa",
  "Guru",
  "Kelas",
  "Mapel",
  "GuruMengajar",
  "Pengaturan"
];

const MASTER_CACHE_PREFIX = "WONGMIT_MASTER_V1_";
const MASTER_CACHE_TTL = 21600; // maksimum 6 jam

/**
 * Membaca satu Master Sheet.
 *
 * Untuk sementara fungsi ini adalah single source
 * bagi seluruh pembacaan Master Data.
 *
 * P5 akan menambahkan Cache hit/fallback.
 * P6 akan memastikan cache dihapus setelah perubahan data.
 */
function getMasterSheetData(sheetName) {

  if (!MASTER_SHEETS.includes(sheetName)) {
    throw new Error(
      "Sheet bukan bagian dari Master Data: " + sheetName
    );
  }

  const cache =
    CacheService.getScriptCache();

  const cacheKey =
    MASTER_CACHE_PREFIX +
    sheetName;

  const cached =
    cache.get(cacheKey);

  if (cached) {

    try {
      return JSON.parse(cached);
    } catch (error) {
      // Cache rusak → abaikan dan baca ulang Sheet.
      cache.remove(cacheKey);
    }

  }

  const sheet =
    SS.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(
      "Sheet Master Data tidak ditemukan: " + sheetName
    );
  }

  const data =
    sheet
      .getDataRange()
      .getValues();

  /*
   * CacheService memiliki batas ukuran value.
   * Jika data terlalu besar, jangan paksa masuk cache.
   * Sistem tetap bekerja dengan fallback ke Sheet.
   */
  try {

    const serialized =
      JSON.stringify(data);

    if (
      serialized.length <= 95000
    ) {

      cache.put(
        cacheKey,
        serialized,
        MASTER_CACHE_TTL
      );

    }

  } catch (error) {

    console.warn(
      "Master cache gagal disimpan: " +
      sheetName
    );

  }

  return data;
}


/**
 * Master Data Bundle.
 *
 * Satu pemanggilan backend dapat mengambil
 * seluruh master yang dibutuhkan frontend.
 */
function getMasterDataBundle() {

  const bundle = {};

  MASTER_SHEETS.forEach(function (sheetName) {

    bundle[sheetName] =
      getMasterSheetData(sheetName);

  });

  return bundle;
}

/* =========================================================
   P6 — MASTER CACHE INVALIDATION
   ========================================================= */

function invalidateMasterCache(sheetNames) {

  const cache =
    CacheService.getScriptCache();

  if (!Array.isArray(sheetNames)) {
    sheetNames = [sheetNames];
  }

  sheetNames.forEach(function (sheetName) {

    if (!MASTER_SHEETS.includes(sheetName)) {
      return;
    }

    cache.remove(
      MASTER_CACHE_PREFIX +
      sheetName
    );

  });

}


/**
 * Invalidate seluruh Master Data Cache.
 */
function invalidateAllMasterCache() {

  invalidateMasterCache(
    MASTER_SHEETS
  );

}
