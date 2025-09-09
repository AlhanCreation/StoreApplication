import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getDashboardStats } from '../services/userService';
import Loading from '../components/common/Loading';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError('Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'System Administrator') {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <Loading />;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container-fluid py-4">
      <h1 className="h2 fw-bold mb-4">Admin Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h2 className="card-title h5">Total Users</h2>
              <p className="card-text display-4 text-primary fw-bold">{stats.totalUsers || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h2 className="card-title h5">Total Stores</h2>
              <p className="card-text display-4 text-success fw-bold">{stats.totalStores || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-body text-center">
              <h2 className="card-title h5">Total Ratings</h2>
              <p className="card-text display-4 text-info fw-bold">{stats.totalRatings || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;