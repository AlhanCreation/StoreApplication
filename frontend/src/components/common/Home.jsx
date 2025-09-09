import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'System Administrator':
          navigate('/admin/dashboard');
          break;
        case 'Store Owner':
          navigate('/owner/dashboard');
          break;
        default:
          navigate('/stores');
          break;
      }
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return <div>Loading...</div>;
};

export default Home;