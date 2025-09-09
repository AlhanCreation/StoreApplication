import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/common/Loading';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    const result = await login(data.email, data.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4" style={{ color: '#007bff' }}>Welcome back!</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="email-address" className="form-label">Email</label>
                    <input
                      id="email-address"
                      {...register('email')}
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      id="password"
                      {...register('password')}
                      type="password"
                      className="form-control"
                    />
                  </div>

                  {error && <div className="alert alert-danger text-center mb-3">{error}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-100"
                  >
                    Login
                  </button>

                  <div className="text-center mt-2 mb-3">
                    <Link to="/forgot-password" className="text-primary">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="text-center mt-3">
                    <Link to="/register" className="text-primary">
                      Don't have an account? Register here
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;