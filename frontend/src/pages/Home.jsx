import React from 'react';

const Home = () => {
  return (
    <section className="bg-primary text-white py-5 d-flex align-items-center min-vh-100">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-3 fw-bold mb-2">Discover & Rate</h1>
            <h2 className="display-3 fw-bold mb-2">Amazing Local</h2>
            <h3 className="display-3 fw-bold mb-4">Stores</h3>
            <p className="lead mb-5">Read authentic reviews, best stores in your area, share your experiences with authentic community</p>
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-4 mb-3">
            <div className="card bg-light text-dark border-0">
              <div className="card-body text-center">
                <i className="fas fa-store fa-3x text-primary mb-2"></i>
                <h4 className="card-title text-primary mb-1">1000+</h4>
                <p className="card-text mb-0">Listed Stores</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-light text-dark border-0">
              <div className="card-body text-center">
                <i className="fas fa-comments fa-3x text-primary mb-2"></i>
                <h4 className="card-title text-primary mb-1">5000+</h4>
                <p className="card-text mb-0">Reviews</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-light text-dark border-0">
              <div className="card-body text-center">
                <i className="fas fa-users fa-3x text-primary mb-2"></i>
                <h4 className="card-title text-primary mb-1">500+</h4>
                <p className="card-text mb-0">Active Users</p>
              </div>
            </div>
          </div>
        </div>
    
        <div className="row justify-content-center mb-5">
          <div className="col-md-4 mb-3">
            <div className="card bg-light text-dark border-0 h-100">
              <div className="card-body text-center">
                <i className="fas fa-map-marker-alt fa-3x text-primary mb-3"></i>
                <h5 className="card-title">Discover Local Stores</h5>
                <p className="card-text">Explore thousands of stores in your area and find the best ones based on community ratings.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-light text-dark border-0 h-100">
              <div className="card-body text-center">
                <i className="fas fa-star fa-3x text-primary mb-3"></i>
                <h5 className="card-title">Rate & Review</h5>
                <p className="card-text">Share your experiences by rating and reviewing your favorite stores to help others.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card bg-light text-dark border-0 h-100">
              <div className="card-body text-center">
                <i className="fas fa-users fa-3x text-primary mb-3"></i>
                <h5 className="card-title">Join Community</h5>
                <p className="card-text">Connect with other users, discuss stores, and be part of our growing community.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-12">
            <a href="/stores" className="btn btn-light btn-lg me-3">
              <i className="fas fa-store me-2"></i>Browse Stores
            </a>
            <a href="/register" className="btn btn-outline-light btn-lg">
              <i className="fas fa-user-plus me-2"></i>Join Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;