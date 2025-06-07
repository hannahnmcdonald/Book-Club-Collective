import { Router } from 'express';

const logoutRoute = Router();

logoutRoute.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
        return res.status(500).json({ message: 'Failed to log out' });
      }
      // Clear the cookie manually if you're using a session cookie
      res.clearCookie('connect.sid'); // Only needed if cookie name is not custom
      return res.status(200).json({ message: 'Logout successful' });
    });
  } else {
    res.status(400).json({ message: 'No user is logged in' });
  }
});

export default logoutRoute;
