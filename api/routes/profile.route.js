import { Router } from 'express';
const profileRoute = Router();
import db from '../../db.js';

profileRoute.get('/profile', async (req, res) => {
  if (!req.session.logged_in) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const userData = await db('users')
      .where({ id: req.session.user_id })
      .first();

    const reviews = await db('reviews')
      .where({ user_id: req.session.user_id });

    res.render('profile', {
      ...userData,
      reviews,
      logged_in: true,
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default profileRoute;