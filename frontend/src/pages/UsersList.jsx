import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUsers } from '../services/userService';
import Loading from '../components/common/Loading';

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

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid py-4">
      <h1 className="h2 fw-bold mb-4">Users List</h1>
      <div className="row mb-4 g-2">
        <div className="col-auto">
          <input
            type="text"
            name="name"
            placeholder="Filter by name"
            value={filters.name}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <input
            type="text"
            name="email"
            placeholder="Filter by email"
            value={filters.email}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <input
            type="text"
            name="address"
            placeholder="Filter by address"
            value={filters.address}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <select
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            className="form-select"
          >
            <option value="">All Roles</option>
            <option value="Normal User">Normal User</option>
            <option value="Store Owner">Store Owner</option>
            <option value="System Administrator">System Administrator</option>
          </select>
        </div>
        <div className="col-auto">
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="form-select"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
            <option value="created_at">Created At</option>
          </select>
        </div>
        <div className="col-auto">
          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleFilterChange}
            className="form-select"
          >
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.role}</td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;