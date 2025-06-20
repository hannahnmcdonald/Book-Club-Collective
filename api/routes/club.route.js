import { Router } from 'express';
const clubRoute = Router();
import db from '../../db.js';

clubRoute.get('/clubs', async (req, res) => {
    if (!req.session.logged_in) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const clubs = await db('clubs')
        .join('users', 'clubs.user_id', 'users.id')
        .select('clubs.*', 'users.name as user_name'); 
  
      res.render('clubs', {
        clubs,
        logged_in: req.session.logged_in || false,
        user_id: req.session.user_id || null,
        user_name: req.session.user_name || null,
      });
    } catch (err) {
      console.error('Error fetching clubs:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

clubRoute.post('/clubs', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, description } = req.body;

    try {
        // Insert new club into the database
        const newClub = await db('clubs').insert({
            name,
            description,
            user_id: req.session.user_id, // Assuming the user creating the club is the logged-in user
        }).returning('*');

        res.status(201).json(newClub[0]);
    } catch (err) {
        console.error('Error creating club:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default clubRoute;