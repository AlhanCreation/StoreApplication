import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { getUserById } from '../../services/userService';
import Loading from '../common/Loading';

const UserProfile = () => {
  const { user, updateUser, updatePassword: updateUserPassword } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const { register: registerProfile, handleSubmit: handleSubmitProfile } = useForm({
    defaultValues: { name: '', email: '' }
  });

  const { register: registerPassword, handleSubmit: handleSubmitPassword, reset: resetPassword } = useForm();

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const data = await getUserById(user.id);
          setProfile(data);
          registerProfile('name', { value: data.name });
          registerProfile('email', { value: data.email });
        } catch (err) {
          setError('Failed to fetch profile');
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user, registerProfile]);

  const onEditSubmit = async (data) => {
    try {
      setProfile({ ...profile, ...data });
      updateUser({ ...user, ...data });
      setEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      setPasswordError('');
      await updateUserPassword(data.currentPassword, data.newPassword);
      setSuccess('Password updated successfully!');
      resetPassword();
      setChangingPassword(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setPasswordError(err.error || 'Failed to update password');
    }
  };

  if (loading) return <Loading />;

  if (error) return <div className="alert alert-danger">{error}</div>;

  if (!profile) return <div className="p-6">Profile not found.</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">User Profile</h1>
      
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="row">
        <div className="col-md-6">
          {editing ? (
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title">Edit Profile</h3>
                <form onSubmit={handleSubmitProfile(onEditSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      {...registerProfile('name')}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      {...registerProfile('email')}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title">Profile Information</h3>
                <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
                <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
                <p className="mb-2"><strong>Role:</strong> {profile.role}</p>
                {profile.assigned_store && (
                  <p className="mb-0"><strong>Assigned Store:</strong> {profile.assigned_store.name}</p>
                )}
                <button onClick={() => setEditing(true)} className="btn btn-success mt-3">Edit Profile</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="col-md-6">
          {changingPassword ? (
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title">Change Password</h3>
                <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="form-control"
                      {...registerPassword('currentPassword')}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      className="form-control"
                      {...registerPassword('newPassword')}
                    />
                  </div>
                  {passwordError && <div className="alert alert-danger">{passwordError}</div>}
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Update Password</button>
                    <button type="button" onClick={() => { setChangingPassword(false); setPasswordError(''); resetPassword(); }} className="btn btn-secondary">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <button onClick={() => setChangingPassword(true)} className="btn btn-outline-primary w-100">Change Password</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;