import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/common/Loading';

const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { register: registerField, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    const result = await register(data);
    if (result.success) {
      navigate('/login');
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
                <h2 className="text-center mb-4">Create your account</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <input
                      id="name"
                      {...registerField('name')}
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="email-address"
                      {...registerField('email')}
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="address"
                      {...registerField('address')}
                      type="text"
                      className="form-control"
                      placeholder="Address"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="password"
                      {...registerField('password')}
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
                    Sign up
                  </button>

                  <div className="text-center mt-3">
                    <Link to="/login" className="text-primary">
                      Already have an account? Sign in
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

export default Register;