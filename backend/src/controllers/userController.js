import User from '../models/User.js';
import Store from '../models/Store.js';
import Rating from '../models/Rating.js';

export const getUsers = async (req, res) => {
  try {
    const { name, email, address, role, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    
    const filters = {};
    if (name) filters.name = name;
    if (email) filters.email = email;
    if (address) filters.address = address;
    if (role) filters.role = role;

    const users = await User.findAll(filters, sortBy, sortOrder);
    
    // Add store rating for store owners
    const usersWithRating = await Promise.all(users.map(async (user) => {
      if (user.role === 'Store Owner') {
        const store = await Store.findByOwnerId(user.id);
        return {
          ...user,
          rating: store ? store.average_rating : null
        };
      }
      return user;
    }));

    res.json(usersWithRating);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const userId = await User.create({ name, email, password, address, role });
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: userId,
        name,
        email,
        address,
        role
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add store rating if user is store owner
    if (user.role === 'Store Owner') {
      const store = await Store.findByOwnerId(user.id);
      user.rating = store ? store.average_rating : null;
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
      User.getStats(),
      Store.getStats(),
      Rating.getStats()
    ]);

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
};