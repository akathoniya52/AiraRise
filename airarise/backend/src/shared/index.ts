// src/shared/index.ts
// Barrel export for shared utilities

export { AppError, NotFoundError, ValidationError, AuthenticationError, AuthorizationError, ConflictError, RateLimitError, ExternalServiceError } from './errors.js';
export { sendSuccess, sendError, sendPaginated } from './response.js';
export { logger } from './logger.js';
export { USER_ROLES, POLLUTANT_ALIASES, UNIT_ALIASES, UNIT_CONVERSION_TO_UGM3, API_PREFIX, UPLOAD_LIMITS, COLUMN_PATTERNS } from './constants.js';
