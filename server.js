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

app.get('/', (req, res) => {
    res.render('homepage', { logged_in: false }); // or false or whatever your context is
});

app.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
    res.render('login');
});
  
app.get('/searchbook', (req, res) => {
    res.render('searchbook', {
      logged_in: req.session.logged_in,
    });
});
  
app.get('/register', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
    res.render('register');
});
  
// app.get('/review/:id', async(req, res) => {
//     console.log('Review route hit with id:', req.params['id']);
//     try { 
//         const isbn13 = req.params['id'];
//         const reviewData = await Review.findAll({ where: {
//         isbn:isbn13
//       }, 
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//                 }
//           ]
//       })
//       let reviewTotal = 0;
//       const reviews = reviewData.map((review) => {
//         const reviewSerializedData = review.get({ plain:true});
//         const rating = reviewSerializedData.stars;
//         reviewTotal += rating;
//         return reviewSerializedData;
//       });
//       const avg = reviewTotal/reviewData.length;
//       res.render('review', {
//         isbn: isbn13, reviews:reviews, avgStars: avg,
//         logged_in: req.session.logged_in
//       });
//     } catch (err) {
//       console.log(err)
//     }
// });

app.listen(PORT, () => console.log('Now listening om port ' + PORT));