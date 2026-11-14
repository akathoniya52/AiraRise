// src/shared/constants.ts
// Application-wide constants

/** All supported user roles */
export const USER_ROLES = ['ward_officer', 'housing_admin', 'school_admin', 'field_team'] as const;

/** Pollutant name normalization map */
export const POLLUTANT_ALIASES: Record<string, string> = {
  'pm2.5': 'PM2.5',
  'pm25': 'PM2.5',
  'pm 2.5': 'PM2.5',
  'pm2_5': 'PM2.5',
  'pm_2.5': 'PM2.5',
  'pm_25': 'PM2.5',
  'particulate matter 2.5': 'PM2.5',
  'pm10': 'PM10',
  'pm 10': 'PM10',
  'pm_10': 'PM10',
  'particulate matter 10': 'PM10',
  'no2': 'NO2',
  'nitrogen dioxide': 'NO2',
  'so2': 'SO2',
  'sulfur dioxide': 'SO2',
  'sulphur dioxide': 'SO2',
  'co': 'CO',
  'carbon monoxide': 'CO',
  'o3': 'O3',
  'ozone': 'O3',
  'aqi': 'AQI',
  'air quality index': 'AQI',
};

/** Unit normalization map */
export const UNIT_ALIASES: Record<string, string> = {
  'µg/m³': 'µg/m³',
  'ug/m3': 'µg/m³',
  'μg/m³': 'µg/m³',
  'ug/m³': 'µg/m³',
  'µg/m3': 'µg/m³',
  'microgram/m3': 'µg/m³',
  'micrograms per cubic meter': 'µg/m³',
  'mg/m³': 'mg/m³',
  'mg/m3': 'mg/m³',
  'milligram/m3': 'mg/m³',
  'ppm': 'ppm',
  'ppb': 'ppb',
  'index': 'index',
};

/** Conversion factors to µg/m³ */
export const UNIT_CONVERSION_TO_UGM3: Record<string, number> = {
  'mg/m³': 1000,   // 1 mg/m³ = 1000 µg/m³
  'µg/m³': 1,
};

/** API version prefix */
export const API_PREFIX = '/api/v1';

/** File upload constraints */
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024, // 10 MB
  ALLOWED_MIMETYPES: [
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/plain',
  ],
  ALLOWED_EXTENSIONS: ['.csv', '.xlsx', '.xls'],
};

/** Column header patterns for auto-detection */
export const COLUMN_PATTERNS = {
  location: /^(location|area|station|site|place|ward|zone|city|district|address)$/i,
  timestamp: /^(date|time|datetime|timestamp|recorded_at|measured_at|observation_date)$/i,
  pollutant: /^(pollutant|parameter|substance|type|indicator)$/i,
  value: /^(value|reading|measurement|concentration|level|amount|result)$/i,
  unit: /^(unit|units|measure|uom)$/i,
};
