import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:5000/api/auth';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? 'signin' : 'signup';
      // For signup, you'll need to add a username since your backend requires it
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            userName: formData.email.split('@')[0], // Use email prefix as username
            email: formData.email, 
            password: formData.password 
          };

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`${isLogin ? 'Login' : 'Signup'} successful:`, data);
        
        // Store the JWT token
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Redirect to user details page
        if(endpoint === 'signup'){
          navigate('./Userdetails');
        }else{
          navigate('/Home');
        }
        
      } else {
        setError(data.message || `${isLogin ? 'Login' : 'Signup'} failed`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createFloatingHeart = (e) => {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.className = 'animated-heart';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      if (document.body.contains(heart)) {
        document.body.removeChild(heart);
      }
    }, 3000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        {/* Decorative Background Elements */}
        <div className="bg-circle bg-circle-primary"></div>
        <div className="bg-circle bg-circle-secondary"></div>

        {/* Header */}
        <div className="auth-header-section">
          <div className="icons-wrapper">
            <span className="primary-heart">💖</span>
            <span className="animated-sparkle">✨</span>
          </div>
          
          <h1 className="brand-title">Saanvri</h1>
          
          <h2 className="greeting-title">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h2>
          
          <p className="auth-description">
            {isLogin ? 'Sign in to your account' : 'Create your new account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form-wrapper">
          {/* Error Message */}
          {error && (
            <div className="error-message" style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Email */}
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="text-field"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="password-field-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="text-field password-field"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="visibility-toggle"
              >
                <span className="eye-icon">
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={createFloatingHeart}
            className="submit-button"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading 
              ? (isLogin ? 'Signing In...' : 'Creating Account...') 
              : (isLogin ? 'Sign In' : 'Create Account')
            }
          </button>

          {/* Forgot Password */}
          {isLogin && (
            <div className="password-recovery">
              <a href="#" className="recovery-link">
                Forgot your password?
              </a>
            </div>
          )}

          {/* Toggle Login/Register */}
          <div className="mode-switch-section">
            <p className="switch-prompt">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={toggleMode}
              className="mode-switch-btn"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
