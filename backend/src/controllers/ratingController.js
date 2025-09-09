import Rating from '../models/Rating.js';
import Store from '../models/Store.js';

export const submitRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const userId = req.user.id;

    // Verify store exists
    const store = await Store.findById(store_id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Submit/update rating
    await Rating.create({ user_id: userId, store_id, rating });

    // Update store's average rating
    await Store.updateRating(store_id);

    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Submit rating error:', error);
    res.status(500).json({ message: 'Failed to submit rating', error: error.message });
  }
};

export const getUserRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const userId = req.user.id;

    const rating = await Rating.findByUserAndStore(userId, storeId);
    res.json(rating);
  } catch (error) {
    console.error('Get user rating error:', error);
    res.status(500).json({ message: 'Failed to fetch rating', error: error.message });
  }
};

export const updateRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const userId = req.user.id;

    // Verify store exists
    const store = await Store.findById(store_id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if user has already rated this store
    const existingRating = await Rating.findByUserAndStore(userId, store_id);
    if (!existingRating) {
      return res.status(404).json({ message: 'No existing rating found to update' });
    }

    // Update rating
    await Rating.create({ user_id: userId, store_id, rating });

    // Update store's average rating
    await Store.updateRating(store_id);

    res.json({ message: 'Rating updated successfully' });
  } catch (error) {
    console.error('Update rating error:', error);
    res.status(500).json({ message: 'Failed to update rating', error: error.message });
  }
};