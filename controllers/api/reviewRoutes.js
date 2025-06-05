const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  console.log("testing")
  try {
    console.log(req.body)
    console.log(req.session.user_id)
    const newReview= await Review.create({
      ...req.body,
      user_id: req.session.user_id,
      loggedIn: req.session.loggedIn
    });

    res.status(200).json(newReview);
  } catch (err) {
      console.log(err)
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const reviewData = await Review.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (reviewData) 
      res.status(200).json(reviewData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
