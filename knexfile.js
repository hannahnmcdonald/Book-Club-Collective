import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '5433', 10),
      
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './db/migrations',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || process.env.DB_RAILWAY_URL, 
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './db/migrations', 
    },
  },
};

export default config;