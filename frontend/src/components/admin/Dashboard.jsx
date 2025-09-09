import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getDashboardStats } from '../../services/userService';
import Loading from '../common/Loading';

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Stores</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalStores || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Ratings</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.totalRatings || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;