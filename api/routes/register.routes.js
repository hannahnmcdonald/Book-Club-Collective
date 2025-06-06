import { Router } from 'express';
import { registerUser } from '../services/auth.service.js';

const registerRoute = Router();

registerRoute.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerUser({ name, email, password });
    req.session.user_id = user.id;
    req.session.logged_in = true;
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

export default registerRoute;
