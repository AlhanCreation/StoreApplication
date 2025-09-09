import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser } from '../../services/userService';

const CreateUser = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      await createUser(data);
      navigate('/admin/users', { state: { message: 'User created successfully!' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-body p-4">
            <h2 className="mb-4">Create New User</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter user's full name"
                  {...register("name")}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter user's email"
                  {...register("email")}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  {...register("password")}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea
                  id="address"
                  className="form-control"
                  placeholder="Enter user's address"
                  rows="2"
                  {...register("address")}
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label htmlFor="role" className="form-label">User Role</label>
                <select
                  id="role"
                  className="form-select"
                  {...register("role")}
                >
                  <option value="Normal User">Normal User</option>
                  <option value="Store Owner">Store Owner</option>
                  <option value="System Administrator">System Administrator</option>
                </select>
              </div>
              
              <div className="d-flex justify-content-between mt-4">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={() => navigate('/admin/users')}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;