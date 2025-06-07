import { Router } from 'express';
const clubRoute = Router();
import db from '../../db.js';

clubRoute.get('/clubs', async (req, res) => {
    console.log('Fetching clubs for user:', req.session.user_id);
    if (!req.session.logged_in) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Fetch all clubs from the database
    try {
        const clubs = await db('clubs')
            .select('*');

        res.render('clubs', {
            clubs,
            logged_in: req.session.logged_in || false,
            user_id: req.session.user_id || null,
            user_name: req.session.user_name || null,
        });
    } catch (err) {
        console.error('Error fetching clubs:', err);
        res.status(500).json({ message: 'Internal server error' }); 
    };

});

clubRoute.post('/clubs', async (req, res) => {
    console.log('Attempting to create a new club');
    if (!req.session.logged_in) {
        console.log('Unauthorized access attempt to create a club');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('Creating a new club', req.body);
    const { name, description } = req.body;

    console.log('Creating club:', name, 'by user:', req.session.user_id);
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