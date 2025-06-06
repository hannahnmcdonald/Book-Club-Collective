const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // your initialized Knex instance

const SALT_ROUNDS = 10;

// POST /users - register
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    console.log('Inserting new user:', { name, email });

    const [newUser] = await db('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        date_joined: new Date(),
      })
      .returning('*'); // PostgreSQL only

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Registration failed', error: err });
  }
});

// POST /users/login
router.post('/login', async (req, res) => {
  try {
    const user = await db('users').where({ email: req.body.email }).first();

    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

// POST /users/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => res.status(204).end());
  } else {
    res.status(404).end();
  }
});

module.exports = router;
