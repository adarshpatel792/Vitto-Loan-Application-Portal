import pg from 'pg';
import { config } from '../config.js';

const { Pool } = pg;

if (!config.databaseUrl) {
  console.warn('DATABASE_URL is not set. API routes that touch PostgreSQL will fail until configured.');
}

export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000
});

export const query = (text, params) => pool.query(text, params);
