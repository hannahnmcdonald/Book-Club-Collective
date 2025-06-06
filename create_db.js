// create-db.ts
// import { Client } from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();

// async function createDatabase() {
//   const client = new Client({
//     user: process.env.DB_USER || 'yourusername',
//     password: process.env.DB_PASSWORD || 'yourpassword',
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
//     database: 'postgres', // connect to default db to issue CREATE DATABASE
//   });

//   try {
//     await client.connect();
//     await client.query(`CREATE DATABASE bcc_db`);
//     console.log('Database created successfully!');
//   } catch (err) {
//     console.error('Error creating database:', err);
//   } finally {
//     await client.end();
//   }
// }

// createDatabase();
