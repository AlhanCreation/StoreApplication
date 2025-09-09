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
                <h2 className="text-center mb-4">Sign in to your account</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <input
                      id="email-address"
                      {...register('email')}
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="password"
                      {...register('password')}
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  {error && <div className="alert alert-danger text-center mb-3">{error}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-100"
                  >
                    Sign in
                  </button>

                  <div className="text-center mt-3">
                    <Link to="/register" className="text-primary">
                      Don't have an account? Sign up
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