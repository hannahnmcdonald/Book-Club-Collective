const router = require('express').Router();
const { Club } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newClub = await Club.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newClub);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
