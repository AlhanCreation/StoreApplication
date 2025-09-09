import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUsers } from '../../services/userService';
import Loading from '../common/Loading';

const UsersList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
    sortBy: 'created_at',
    sortOrder: 'DESC'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(filters);
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'System Administrator') {
      fetchUsers();
    }
  }, [user, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <Loading />;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      <div className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filters.name}
          onChange={handleFilterChange}
          className="mr-2 p-2 border"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by email"
          value={filters.email}
          onChange={handleFilterChange}
          className="mr-2 p-2 border"
        />
        <input
          type="text"
          name="address"
          placeholder="Filter by address"
          value={filters.address}
          onChange={handleFilterChange}
          className="mr-2 p-2 border"
        />
        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          className="mr-2 p-2 border"
        >
          <option value="">All Roles</option>
          <option value="Normal User">Normal User</option>
          <option value="Store Owner">Store Owner</option>
          <option value="System Administrator">System Administrator</option>
        </select>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="mr-2 p-2 border"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="role">Role</option>
          <option value="created_at">Created At</option>
        </select>
        <select
          name="sortOrder"
          value={filters.sortOrder}
          onChange={handleFilterChange}
          className="p-2 border"
        >
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Address</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="py-2 px-4 border">{u.name}</td>
              <td className="py-2 px-4 border">{u.email}</td>
              <td className="py-2 px-4 border">{u.address}</td>
              <td className="py-2 px-4 border">{u.role}</td>
              <td className="py-2 px-4 border">{new Date(u.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;