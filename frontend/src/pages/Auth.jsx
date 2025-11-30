import React, { useState } from 'react';
import Login from '../components/auth/Login/Login';
import Register from '../components/auth/Register/Register';
import './Auth.css';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="auth-page">
      <div className="auth-modal">
        <div className="auth-tabs">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        <div className="auth-content">
          {activeTab === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}
