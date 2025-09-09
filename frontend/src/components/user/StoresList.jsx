import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStores } from '../../services/storeService';
import Loading from '../common/Loading';

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{store.name}</h2>
            <p className="text-gray-600 mb-2">{store.address}</p>
            {store.average_rating && (
              <div className="mb-2">
                <span className="text-yellow-500">★ {store.average_rating}/5</span>
                <span className="text-gray-500 ml-2">({store.total_ratings || 0} ratings)</span>
              </div>
            )}
            <Link
              to={`/stores/${store.id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      {stores.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No stores found.</p>
      )}
    </div>
  );
};

export default StoresList;