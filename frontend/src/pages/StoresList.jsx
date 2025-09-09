import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStores } from '../services/storeService';
import Loading from '../components/common/Loading';

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getAllStores();
        setStores(data.stores || data);
      } catch (err) {
        setError('Failed to fetch stores');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) return <Loading />;

  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="container-fluid py-4">
      <h1 className="h2 fw-bold mb-4">Stores</h1>
      <div className="row g-4">
        {stores.map((store) => (
          <div key={store.id} className="col-lg-4 col-md-6">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h2 className="card-title h5">{store.name}</h2>
                <p className="card-text text-muted">{store.address}</p>
                {store.average_rating && (
                  <div className="mb-2">
                    <span className="text-warning">★ {store.average_rating}/5</span>
                    <span className="text-muted ms-2">({store.total_ratings || 0} ratings)</span>
                  </div>
                )}
                <Link
                  to={`/stores/${store.id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {stores.length === 0 && (
        <div className="text-center mt-4">
          <p className="text-muted">No stores found.</p>
        </div>
      )}
    </div>
  );
};

export default StoresList;