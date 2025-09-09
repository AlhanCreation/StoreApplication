import { getConnection } from '../config/database.js';

class Store {
  static async create(storeData) {
    const pool = getConnection();
    const { name, email, address, owner_id } = storeData;
    
    const [result] = await pool.execute(
      'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
      [name, email, address, owner_id]
    );
    
    return result.insertId;
  }

  static async findById(id) {
    const pool = getConnection();
    const [stores] = await pool.execute(
      'SELECT * FROM stores WHERE id = ?',
      [id]
    );
    return stores[0] || null;
  }

  static async findByOwnerId(ownerId) {
    const pool = getConnection();
    const [stores] = await pool.execute(
      'SELECT * FROM stores WHERE owner_id = ?',
      [ownerId]
    );
    return stores[0] || null;
  }

  static async findByEmail(email) {
    const pool = getConnection();
    const [stores] = await pool.execute(
      'SELECT * FROM stores WHERE email = ?',
      [email]
    );
    return stores[0] || null;
  }

  static async findAll(filters = {}, sortBy = 'name', sortOrder = 'ASC') {
    const pool = getConnection();
    let query = 'SELECT * FROM stores WHERE 1=1';
    const params = [];

    if (filters.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }
    if (filters.address) {
      query += ' AND address LIKE ?';
      params.push(`%${filters.address}%`);
    }
    if (filters.email) {
      query += ' AND email LIKE ?';
      params.push(`%${filters.email}%`);
    }

    // Validate sortBy to prevent SQL injection
    const allowedSortFields = ['name', 'email', 'address', 'average_rating', 'total_ratings', 'created_at'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'name';
    const validSortOrder = ['ASC', 'DESC'].includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

    query += ` ORDER BY ${validSortBy} ${validSortOrder}`;

    const [stores] = await pool.execute(query, params);
    return stores;
  }

  static async updateRating(storeId) {
    const pool = getConnection();
    
    const [ratingStats] = await pool.execute(
      'SELECT AVG(rating) as avg_rating, COUNT(*) as total_ratings FROM ratings WHERE store_id = ?',
      [storeId]
    );

    const avgRating = ratingStats[0].avg_rating || 0;
    const totalRatings = ratingStats[0].total_ratings || 0;

    await pool.execute(
      'UPDATE stores SET average_rating = ?, total_ratings = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [parseFloat(avgRating).toFixed(1), totalRatings, storeId]
    );

    return { avgRating: parseFloat(avgRating).toFixed(1), totalRatings };
  }

  static async getStats() {
    const pool = getConnection();
    const [result] = await pool.execute(
      'SELECT COUNT(*) as total_stores FROM stores'
    );
    return result[0].total_stores;
  }

  static async update(id, updateData) {
    const pool = getConnection();
    const { name, email, address } = updateData;
    
    const [result] = await pool.execute(
      'UPDATE stores SET name = ?, email = ?, address = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, email, address, id]
    );
    
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const pool = getConnection();
    const [result] = await pool.execute(
      'DELETE FROM stores WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default Store;