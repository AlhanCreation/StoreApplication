import React, { useState, useEffect } from 'react';
import { getStoreDashboard } from '../services/storeService';
import Loading from '../components/common/Loading';

const StoreDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await getStoreDashboard();
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loading />;

  if (!dashboardData || !dashboardData.store) {
    return (
      <div className="alert alert-warning">
        No store data found. Please contact an administrator to assign a store to your account.
      </div>
    );
  }

  const { store, ratings } = dashboardData;

  const ratingDistribution = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  };
  
  ratings.forEach(rating => {
    ratingDistribution[rating.rating] = (ratingDistribution[rating.rating] || 0) + 1;
  });

  return (
    <div className="store-dashboard">
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h2 className="card-title">{store.name} Dashboard</h2>
          <p className="text-muted">{store.address}</p>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <span className="display-4">{store.average_rating}</span>
                  <span className="text-muted">/5</span>
                </div>
                <div>
                  <div className="mb-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <i key={star} className={`bi bi-star${star <= store.average_rating ? '-fill' : ''} text-warning me-1`}></i>
                    ))}
                  </div>
                  <p className="mb-0">Based on {store.total_ratings} {store.total_ratings === 1 ? 'rating' : 'ratings'}</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <h5>Rating Distribution</h5>
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="d-flex align-items-center mb-2">
                  <div style={{ width: '30px' }}>{star}</div>
                  <div className="progress flex-grow-1 mx-2" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      style={{ width: `${(ratingDistribution[star] / store.total_ratings) * 100 || 0}%` }}
                    ></div>
                  </div>
                  <div style={{ width: '30px' }}>{ratingDistribution[star] || 0}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card shadow">
        <div className="card-header bg-light">
          <h4 className="mb-0">Recent Ratings</h4>
        </div>
        <div className="card-body">
          {ratings.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Rating</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map(rating => (
                    <tr key={rating.id}>
                      <td>
                        {rating.user_name}
                        <div className="small text-muted">{rating.user_email}</div>
                      </td>
                      <td>
                        <div className="d-flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <i key={star} className={`bi bi-star${star <= rating.rating ? '-fill' : ''} text-warning`}></i>
                          ))}
                          <span className="ms-2">{rating.rating}/5</span>
                        </div>
                      </td>
                      <td>{new Date(rating.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-3">No ratings yet for your store.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;