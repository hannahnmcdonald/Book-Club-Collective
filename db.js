import knex from 'knex';
import dotenv from 'dotenv';
import knexConfig from './knexfile.js';
dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const envConfig = knexConfig[environment];

const db = knex(envConfig);

export default db;


