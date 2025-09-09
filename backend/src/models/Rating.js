import { getConnection } from '../config/database.js';

class Rating {
  static async create(ratingData) {
    const pool = getConnection();
    const { user_id, store_id, rating } = ratingData;
    
    const [result] = await pool.execute(
      'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = VALUES(rating), updated_at = CURRENT_TIMESTAMP',
      [user_id, store_id, rating]
    );
    
    return result.insertId || result.affectedRows;
  }

  static async findByUserAndStore(userId, storeId) {
    const pool = getConnection();
    const [ratings] = await pool.execute(
      'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
      [userId, storeId]
    );
    return ratings[0] || null;
  }

  static async findByStoreId(storeId) {
    const pool = getConnection();
    const [ratings] = await pool.execute(
      `SELECT r.*, u.name as user_name, u.email as user_email 
       FROM ratings r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.store_id = ? 
       ORDER BY r.created_at DESC`,
      [storeId]
    );
    return ratings;
  }

  static async findByUserId(userId) {
    const pool = getConnection();
    const [ratings] = await pool.execute(
      `SELECT r.*, s.name as store_name, s.email as store_email 
       FROM ratings r 
       JOIN stores s ON r.store_id = s.id 
       WHERE r.user_id = ? 
       ORDER BY r.created_at DESC`,
      [userId]
    );
    return ratings;
  }

  static async getStats() {
    const pool = getConnection();
    const [result] = await pool.execute(
      'SELECT COUNT(*) as total_ratings FROM ratings'
    );
    return result[0].total_ratings;
  }

  static async getStoresWithUserRatings(userId, filters = {}, sortBy = 'name', sortOrder = 'ASC') {
    const pool = getConnection();
    let query = `
      SELECT s.*, 
             r.rating as user_rating,
             r.updated_at as user_rating_date
      FROM stores s 
      LEFT JOIN ratings r ON s.id = r.store_id AND r.user_id = ?
      WHERE 1=1
    `;
    const params = [userId];

    if (filters.name) {
      query += ' AND s.name LIKE ?';
      params.push(`%${filters.name}%`);
    }
    if (filters.address) {
      query += ' AND s.address LIKE ?';
      params.push(`%${filters.address}%`);
    }

    // Validate sortBy to prevent SQL injection
    const allowedSortFields = ['name', 'email', 'address', 'average_rating', 'total_ratings', 'created_at'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'name';
    const validSortOrder = ['ASC', 'DESC'].includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

    query += ` ORDER BY s.${validSortBy} ${validSortOrder}`;

    const [stores] = await pool.execute(query, params);
    return stores;
  }

  static async delete(userId, storeId) {
    const pool = getConnection();
    const [result] = await pool.execute(
      'DELETE FROM ratings WHERE user_id = ? AND store_id = ?',
      [userId, storeId]
    );
    return result.affectedRows > 0;
  }

  static async getAverageRatingByStore(storeId) {
    const pool = getConnection();
    const [result] = await pool.execute(
      'SELECT AVG(rating) as average_rating, COUNT(*) as total_ratings FROM ratings WHERE store_id = ?',
      [storeId]
    );
    return {
      averageRating: parseFloat(result[0].average_rating || 0).toFixed(1),
      totalRatings: result[0].total_ratings || 0
    };
  }
}

export default Rating;