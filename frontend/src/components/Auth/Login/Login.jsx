import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
        if (!email || !password) {
            throw new Error('Please fill in all fields');
        }
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error('Invalid email or password');
        }
        const data = await response.json();

        if(data.token){
            localStorage.setItem('token', data.token);
            console.log('Login successful');
        }
    } catch (err) {
        setError(err.message || 'Login failed. Please try again.');
    } finally {
        setLoading(false);
    }

    
    console.log('Login attempt:', { email, password });
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
          <p><a href="#forgot">Forgot password?</a></p>
        </div>
      </div>
    </div>
  );
}
