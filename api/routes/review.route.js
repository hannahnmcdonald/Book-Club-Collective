import { Router } from 'express';
const reviewRoute = Router();
import db from '../../db.js';

reviewRoute.get('/review/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const isbn13 = id.replace(/-/g, '');

    if (isbn13.length !== 13) {
      return res.status(400).json({ message: 'Invalid ISBN format' });
    }

    const reviewData = await db('reviews')
    .join('users', 'reviews.user_id', 'users.id')
    .where('isbn', isbn13)
    .select(
      'reviews.description',
      'reviews.title',
      'reviews.stars',
      'reviews.isbn',
      'users.name as user_name'
    );

    const reviewTotal = reviewData.reduce((sum, review) => sum + (review.stars || 0), 0);
    const avg = reviewData.length ? reviewTotal / reviewData.length : 0;

    res.render('review', {
      reviews: reviewData,
      averageRating: avg.toFixed(1),
      totalReviews: reviewData.length,
      isbn: isbn13,
      logged_in: req.session.logged_in || false,
    });
  } catch (err) {
    console.error('Error fetching review:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

reviewRoute.post('/review', async (req, res) => {
  if (!req.session.logged_in) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { isbn, title, description, stars } = req.body;

  try {
    const [newReview] = await db('reviews')
      .insert({
        isbn,
        user_id: req.session.user_id,
        description,
        title,
        stars,
      })
      .returning('*');

    // Now fetch user_name
    const user = await db('users')
      .where({ id: req.session.user_id })
      .select('name')
      .first();

    res.status(201).json({
      ...newReview,
      user_name: user.name,
    });
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// reviewRoute.delete('/:id', async (req, res) => {
//     try {
//       const reviewData = await Review.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (reviewData) 
//       res.status(200).json(reviewData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//  });


export default reviewRoute;

