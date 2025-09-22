import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PeriodTrackerSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastPeriodDate: '',
    cycleLength: 28,
    periodDuration: '',
    preferredProducts: [],
    symptomsToTrack: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductToggle = (product) => {
    setFormData(prev => ({
      ...prev,
      preferredProducts: prev.preferredProducts.includes(product)
        ? prev.preferredProducts.filter(p => p !== product)
        : [...prev.preferredProducts, product]
    }));
  };

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptomsToTrack: prev.symptomsToTrack.includes(symptom)
        ? prev.symptomsToTrack.filter(s => s !== symptom)
        : [...prev.symptomsToTrack, symptom]
    }));
  };      

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Period Tracker Setup:', formData);
  //   if (formData.lastPeriodDate && formData.periodDuration && formData.preferredProducts.length > 0) {
  //     navigate('/home');
  //   } else {
  //     alert('Please fill in all required fields and select at least one preferred product');
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in');
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/auth/updateProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        date: formData.lastPeriodDate,       // Note: use names expected in backend
        Gap: formData.cycleLength,
        duration: formData.periodDuration,
        product: formData.preferredProducts.join(','), // or array if backend supports
        sympt: formData.symptomsToTrack.join(',')
      })
    });
    const data = await res.json();
    if (res.ok) {
      console.log('Profile updated:', data);
      navigate('/home'); // Or wherever appropriate
    } else {
      alert(data.message || 'Failed to update profile');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Network error');
  }
};


  const createFloatingFlower = (e) => {
    const flower = document.createElement('div');
    flower.innerHTML = '🌸';
    flower.className = 'tracker-floating-flower';
    flower.style.left = e.clientX + 'px';
    flower.style.top = e.clientY + 'px';
    document.body.appendChild(flower);
    setTimeout(() => {
      if (document.body.contains(flower)) {
        document.body.removeChild(flower);
      }
    }, 3000);
  };

  return (
    <div className="tracker-setup-page">
      <div className="tracker-main-container">
        {/* Header */}
        <div className="tracker-header-section">
          <div className="tracker-flower-icon">🌺</div>
          <h1 className="tracker-main-title">Period Tracker Setup</h1>
          <p className="tracker-subtitle-text">Let's personalize your Saanvri experience</p>
        </div>
        {/* Form Container */}
        <div className="tracker-form-container">
          <div className="tracker-form-content">
            {/* Last Period Start Date */}
            <div className="tracker-field-group">
              <label className="tracker-field-label">📅 Last Period Start Date *</label>
              <input
                type="date"
                name="lastPeriodDate"
                value={formData.lastPeriodDate}
                onChange={handleInputChange}
                required
                className="tracker-date-input"
              />
            </div>
            {/* Average Cycle Length */}
            <div className="tracker-field-group">
              <label className="tracker-field-label">🔄 Average Cycle Length (days)</label>
              <div className="tracker-slider-container">
                <input
                  type="range"
                  name="cycleLength"
                  min="21"
                  max="35"
                  value={formData.cycleLength}
                  onChange={handleInputChange}
                  className="tracker-range-slider"
                />
                <div className="tracker-cycle-display">{formData.cycleLength}</div>
              </div>
            </div>
            {/* Period Duration */}
            <div className="tracker-field-group">
              <label className="tracker-field-label">⏱️ Period Duration *</label>
              <select
                name="periodDuration"
                value={formData.periodDuration}
                onChange={handleInputChange}
                required
                className="tracker-duration-select"
              >
                <option value="">Select duration</option>
                <option value="3-4">3-4 days</option>
                <option value="5-6">5-6 days</option>
                <option value="7+">7+ days</option>
              </select>
            </div>
            {/* Preferred Products */}
            <div className="tracker-field-group">
              <label className="tracker-field-label">
                🛍️ Preferred Products * (Select all that apply)
              </label>
              <div className="tracker-products-grid">
                {[
                  { id: 'pads', name: 'Pads', icon: '🩱' },
                  { id: 'tampons', name: 'Tampons', icon: '🧻' },
                  { id: 'cup', name: 'Menstrual Cup', icon: '🥤' }
                ].map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductToggle(product.id)}
                    className={`tracker-product-card ${
                      formData.preferredProducts.includes(product.id)
                        ? 'tracker-product-selected'
                        : ''
                    }`}
                  >
                    <div className="tracker-product-icon">{product.icon}</div>
                    <div className="tracker-product-name">{product.name}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Symptoms to Track */}
            <div className="tracker-field-group">
              <label className="tracker-field-label">📊 Symptoms to Track (Optional)</label>
              <div className="tracker-symptoms-grid">
                {[
                  { id: 'cramps', name: 'Cramps', icon: '😣' },
                  { id: 'mood', name: 'Mood Swings', icon: '😅' },
                  { id: 'acne', name: 'Acne', icon: '😤' },
                  { id: 'bloating', name: 'Bloating', icon: '😮‍💨' },
                  { id: 'headache', name: 'Headache', icon: '🤕' },
                  { id: 'fatigue', name: 'Fatigue', icon: '😴' }
                ].map((symptom) => (
                  <div
                    key={symptom.id}
                    onClick={() => handleSymptomToggle(symptom.id)}
                    className={`tracker-symptom-toggle ${
                      formData.symptomsToTrack.includes(symptom.id)
                        ? 'tracker-symptom-active'
                        : ''
                    }`}
                  >
                    <span className="tracker-symptom-icon">{symptom.icon}</span>
                    <span className="tracker-symptom-text">{symptom.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
                createFloatingFlower(e);
              }}
              className="tracker-submit-button"
            >
              🌸 Complete Setup 🌸
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodTrackerSetup;
