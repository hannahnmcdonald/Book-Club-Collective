import { Router } from 'express';
import loginRoute from '../api/routes/login.route.js';
import registerRoute from '../api/routes/register.routes.js';

const router = Router();

router.use('/auth', loginRoute);
router.use('/auth', registerRoute);

// const apiRoutes = require('./api');
// const homeRoutes = require('./homeRoutes');

// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

export default router;


