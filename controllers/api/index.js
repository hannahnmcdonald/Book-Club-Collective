const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const clubRoutes = require('./clubRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/clubs', clubRoutes);

module.exports = router;