import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createStore } from '../../services/storeService';
import Loading from '../common/Loading';

const CreateStore = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await createStore(data);
      setSuccess('Store created successfully!');
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create store. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-body p-4">
            <h2 className="mb-4">Create New Store</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Store Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter store name"
                  {...register("name")}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Store Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter store email"
                  {...register("email")}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  id="address"
                  type="text"
                  className="form-control"
                  placeholder="Enter store address"
                  {...register("address")}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="owner_email" className="form-label">Owner Email</label>
                <input
                  id="owner_email"
                  type="email"
                  className="form-control"
                  placeholder="Enter owner email"
                  {...register("owner_email")}
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Store'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;