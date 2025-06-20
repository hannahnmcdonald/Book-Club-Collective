// pgPool.js - DEV
// import pg from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();

// const pool = new pg.Pool({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || '5432', 10),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// export default pool;

// pgPool.js - PROD
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL, // ✅ point to Railway
  ssl: { rejectUnauthorized: false }, // ✅ required by Railway
});

export default pool;

