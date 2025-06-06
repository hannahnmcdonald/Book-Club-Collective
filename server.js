//server.js
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './api/router.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import dotenv from 'dotenv';
import pgPool from './pgPool.js'; // Import the pgPool instance

dotenv.config();

// console.log(db.client.pool, db.client); // Log the pool to verify it's set up correctly

// Setup PostgreSQL session store using existing knex pool
const PgSession = connectPgSimple(session);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

const hbs = exphbs.create();

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(
    session({
      store: new PgSession({
        pool: pgPool, // Reuse pool from knex instance
        tableName: 'session',
        createTableIfMissing: true, // Auto-creates the sessions table if needed
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: false, // set to true if using HTTPS
      },
    })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('images')); 

app.use(router);

app.listen(PORT, () => console.log('Now listening om port ' + PORT));