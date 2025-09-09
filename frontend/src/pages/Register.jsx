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
  const { register: registerField, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

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
                      {...registerField('name', {
                        required: 'Full Name is required',
                        minLength: {
                          value: 20,
                          message: 'Full Name must be at least 20 characters'
                        },
                        maxLength: {
                          value: 60,
                          message: 'Full Name must not exceed 60 characters'
                        }
                      })}
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Full Name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>
                    }
                  </div>
                  <div className="mb-3">
                    <input
                      id="email-address"
                      {...registerField('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: 'Email must be a valid email address'
                        }
                      })}
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Email address"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>
                    }
                  </div>
                  <div className="mb-3">
                    <input
                      id="address"
                      {...registerField('address', {
                        required: 'Address is required',
                        maxLength: {
                          value: 400,
                          message: 'Address must not exceed 400 characters'
                        }
                      })}
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      placeholder="Address"
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address.message}</div>
                    }
                  </div>
                  <div className="mb-3">
                    <input
                      id="password"
                      {...registerField('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        },
                        maxLength: {
                          value: 16,
                          message: 'Password must not exceed 16 characters'
                        },
                        pattern: {
                          value: /(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
                          message: 'Password must include at least one uppercase letter and one special character'
                        }
                      })}
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Password"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>
                    }
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