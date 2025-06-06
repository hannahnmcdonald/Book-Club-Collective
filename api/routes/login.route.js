import { Router } from 'express';
import { loginUser } from '../services/auth.service.js';

const loginRoute = Router();

loginRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await loginUser({ email, password });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Login failed' });
    }
});

export default loginRoute;