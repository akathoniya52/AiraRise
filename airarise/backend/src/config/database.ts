// src/config/database.ts
// MongoDB connection using Mongoose

import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../shared/logger.js';

export async function connectDatabase(): Promise<void> {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(env.MONGODB_URI, {
      autoIndex: env.NODE_ENV !== 'production',
    });

    logger.info('✅ Connected to MongoDB', { uri: env.MONGODB_URI.replace(/\/\/.*@/, '//***@') });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error', { error: String(err) });
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
  } catch (error) {
    logger.error('Failed to connect to MongoDB', { error: String(error) });
    // Don't crash the server — allow it to start without DB for development
    logger.warn('Server will start without database connection');
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected gracefully');
}
