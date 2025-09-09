import Store from '../models/Store.js';
import User from '../models/User.js';
import Rating from '../models/Rating.js';

export const getStores = async (req, res) => {
  try {
    const { name, address, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    const userId = req.user.id;
    
    const filters = {};
    if (name) filters.name = name;
    if (address) filters.address = address;

    // Get stores with user ratings for normal users
    if (req.user.role === 'Normal User') {
      const stores = await Rating.getStoresWithUserRatings(userId, filters, sortBy, sortOrder);
      return res.json(stores);
    }

    // For admin and store owners, get all stores
    const stores = await Store.findAll(filters, sortBy, sortOrder);
    res.json(stores);
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({ message: 'Failed to fetch stores', error: error.message });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, email, address, owner_email } = req.body;

    // Find owner by email
    let ownerId = null;
    if (owner_email) {
      const owner = await User.findByEmail(owner_email);
      if (!owner) {
        return res.status(400).json({ message: 'Store owner not found with provided email' });
      }
      if (owner.role !== 'Store Owner') {
        return res.status(400).json({ message: 'User must have Store Owner role' });
      }
      ownerId = owner.id;
    }

    // Create store
    const storeId = await Store.create({ name, email, address, owner_id: ownerId });
    
    res.status(201).json({
      message: 'Store created successfully',
      store: {
        id: storeId,
        name,
        email,
        address,
        owner_id: ownerId
      }
    });
  } catch (error) {
    console.error('Create store error:', error);
    res.status(500).json({ message: 'Failed to create store', error: error.message });
  }
};

export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    console.error('Get store error:', error);
    res.status(500).json({ message: 'Failed to fetch store', error: error.message });
  }
};

export const getStoreRatings = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify store exists and user has access
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if user is the store owner or admin
    if (req.user.role === 'Store Owner' && store.owner_id !== userId) {
      return res.status(403).json({ message: 'Access denied. You can only view ratings for your own store.' });
    }

    const ratings = await Rating.findByStoreId(id);
    res.json(ratings);
  } catch (error) {
    console.error('Get store ratings error:', error);
    res.status(500).json({ message: 'Failed to fetch store ratings', error: error.message });
  }
};

export const getStoreOwnerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find store owned by user
    const store = await Store.findByOwnerId(userId);
    if (!store) {
      return res.status(404).json({ message: 'No store found for this user' });
    }

    // Get ratings for the store
    const ratings = await Rating.findByStoreId(store.id);

    res.json({
      store: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        average_rating: store.average_rating,
        total_ratings: store.total_ratings
      },
      ratings
    });
  } catch (error) {
    console.error('Store owner dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: error.message });
  }
};