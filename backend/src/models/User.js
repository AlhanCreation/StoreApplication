import { getConnection } from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  static async create(userData) {
    const pool = getConnection();
    const { name, email, password, address, role = 'Normal User' } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address, role]
    );
    
    return result.insertId;
  }

  static async findByEmail(email) {
    const pool = getConnection();
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return users[0] || null;
  }

  static async findById(id) {
    const pool = getConnection();
    const [users] = await pool.execute(
      'SELECT id, name, email, address, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return users[0] || null;
  }

  static async findAll(filters = {}, sortBy = 'name', sortOrder = 'ASC') {
    const pool = getConnection();
    let query = 'SELECT id, name, email, address, role, created_at FROM users WHERE 1=1';
    const params = [];

    if (filters.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }
    if (filters.email) {
      query += ' AND email LIKE ?';
      params.push(`%${filters.email}%`);
    }
    if (filters.address) {
      query += ' AND address LIKE ?';
      params.push(`%${filters.address}%`);
    }
    if (filters.role) {
      query += ' AND role = ?';
      params.push(filters.role);
    }

    // Validate sortBy to prevent SQL injection
    const allowedSortFields = ['name', 'email', 'role', 'created_at'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'name';
    const validSortOrder = ['ASC', 'DESC'].includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

    query += ` ORDER BY ${validSortBy} ${validSortOrder}`;

    const [users] = await pool.execute(query, params);
    return users;
  }

  static async updatePassword(id, newPassword) {
    const pool = getConnection();
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    const [result] = await pool.execute(
      'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [hashedPassword, id]
    );
    
    return result.affectedRows > 0;
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async getStats() {
    const pool = getConnection();
    const [result] = await pool.execute(
      'SELECT COUNT(*) as total_users FROM users'
    );
    return result[0].total_users;
  }

  static async delete(id) {
    const pool = getConnection();
    const [result] = await pool.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default User;