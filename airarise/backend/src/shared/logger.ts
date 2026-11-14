// src/shared/logger.ts
// Simple structured logger

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

function getLevel(): LogLevel {
  const env = process.env['NODE_ENV'] || 'development';
  return env === 'production' ? 'info' : 'debug';
}

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] <= LOG_LEVELS[getLevel()];
}

function formatMessage(level: LogLevel, message: string, meta?: Record<string, unknown>): string {
  const ts = new Date().toISOString();
  const base = `[${ts}] [${level.toUpperCase()}] ${message}`;
  if (meta && Object.keys(meta).length > 0) {
    return `${base} ${JSON.stringify(meta)}`;
  }
  return base;
}

export const logger = {
  error(message: string, meta?: Record<string, unknown>): void {
    if (shouldLog('error')) {
      console.error(formatMessage('error', message, meta));
    }
  },
  warn(message: string, meta?: Record<string, unknown>): void {
    if (shouldLog('warn')) {
      console.warn(formatMessage('warn', message, meta));
    }
  },
  info(message: string, meta?: Record<string, unknown>): void {
    if (shouldLog('info')) {
      console.log(formatMessage('info', message, meta));
    }
  },
  debug(message: string, meta?: Record<string, unknown>): void {
    if (shouldLog('debug')) {
      console.log(formatMessage('debug', message, meta));
    }
  },
};
