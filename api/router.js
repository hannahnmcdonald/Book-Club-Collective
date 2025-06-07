import { Router } from 'express';
import loginRoute from '../api/routes/login.route.js';
import registerRoute from '../api/routes/register.routes.js';
import reviewRoute from './routes/review.route.js';
import clubRoute from './routes/club.route.js';
import profileRoute from './routes/profile.route.js';

const router = Router();

router.use('/auth', loginRoute);
router.use('/auth', registerRoute);
router.use('/', reviewRoute);
router.use('/', clubRoute);
router.use('/', profileRoute);

export default router;


