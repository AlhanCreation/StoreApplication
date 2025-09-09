import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { getStoreById, submitRating } from '../../services/storeService';
import Loading from '../common/Loading';

const StoreDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await getStoreById(id);
        setStore(data.store);
        setRatings(data.ratings || []);
      } catch (err) {
        setError('Failed to fetch store details');
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  const onSubmitRating = async (data) => {
    if (!user) return;
    setSubmitting(true);
    try {
      const ratingData = {
        store_id: id,
        rating: data.rating
      };
      await submitRating(ratingData);
      reset();
      // Refresh ratings
      const dataFetch = await getStoreById(id);
      setRatings(dataFetch.ratings || []);
      setStore(dataFetch.store); // Update average and user_rating
    } catch (err) {
      setError('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  if (error) return <div className="alert alert-danger">{error}</div>;

  if (!store) return <div className="p-6">Store not found.</div>;

  const canRate = user && user.role !== 'Store Owner' && !store.user_rating;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{store.name}</h1>
      <p className="text-muted mb-2">{store.address}</p>
      {store.description && <p className="mb-4">{store.description}</p>}
      <div className="mb-4">
        <span className="text-warning fs-3">★ {store.average_rating || 0}/5</span>
        <span className="text-muted ms-2">({store.total_ratings || 0} ratings)</span>
        {store.user_rating && (
          <div className="mt-2">
            <span>Your rating: ★ {store.user_rating}/5</span>
          </div>
        )}
      </div>

      {canRate && (
        <div className="card mb-4 shadow">
          <div className="card-body">
            <h3 className="card-title">Rate this Store</h3>
            <form onSubmit={handleSubmit(onSubmitRating)}>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <select
                  id="rating"
                  className="form-select"
                  {...register('rating', { required: true })}
                >
                  <option value="">Select rating</option>
                  <option value="1">1 star</option>
                  <option value="2">2 stars</option>
                  <option value="3">3 stars</option>
                  <option value="4">4 stars</option>
                  <option value="5">5 stars</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
              >
                {submitting ? 'Submitting...' : 'Submit Rating'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow">
        <div className="card-header">
          <h3 className="mb-0">Ratings ({ratings.length})</h3>
        </div>
        <div className="card-body">
          {ratings.length > 0 ? (
            <div className="list-group">
              {ratings.map((rating) => (
                <div key={rating.id} className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <span className="text-warning">★ {rating.rating}/5</span>
                    <small>{new Date(rating.created_at).toLocaleDateString()}</small>
                  </div>
                  <p className="mb-1">By {rating.user_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No ratings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;