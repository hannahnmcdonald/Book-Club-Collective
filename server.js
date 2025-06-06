//server.js
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './api/router.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

const hbs = exphbs.create();

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('images')); 

app.use(router);

app.listen(PORT, () => console.log('Now listening om port ' + PORT));