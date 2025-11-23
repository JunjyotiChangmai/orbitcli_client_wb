import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1); // 1: Info, 2: Payment, 3: Confirm
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+1',
    oneTimeOffer: true,
    rememberInfo: false
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Get plan and model info from location state or use default
  const planInfo = location.state?.plan || {
    name: 'Pro',
    price: 2399,
    priceDisplay: '₹2,399',
    period: 'month',
    billingPeriod: 'monthly'
  };

  const modelInfo = location.state?.model || {
    name: 'Orbit CLI',
    fullName: 'Orbit CLI',
    description: 'Your Smart Companion for Code Generation'
  };

  // Always use plan price from billing section (same as billing page)
  const getPrice = () => {
    // Handle both number and string formats
    if (typeof planInfo.price === 'number') {
      return planInfo.price;
    }
    return parseFloat(planInfo.price.toString().replace(/[₹,]/g, '')) || 0;
  };

  // Format price with rupee symbol and commas
  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Calculate totals - use plan price from billing
  const subtotal = getPrice();
  const tax = subtotal > 0 ? 100 : 0; // Tax in rupees
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    
    // Validate form data for step 1
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return;
      }
      // Move to payment step
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate payment data
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardName) {
        alert('Please fill in all payment details');
        return;
      }
      // Move to confirmation step
      setCurrentStep(3);
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteOrder = () => {
    // Complete the order
    console.log('Order completed:', {
      formData,
      paymentData,
      planInfo,
      modelInfo,
      total
    });
    // You can add navigation to success page or dashboard here
    alert('Order placed successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        {/* Left Column - Order Summary */}
        <div className="checkout-left">
          <div className="payment-header">
            <h2>Complete Your Purchase</h2>
            <div className="total-amount">
              {formatPrice(subtotal)}
              {planInfo.period && <span className="price-period">/{planInfo.period}</span>}
            </div>
          </div>

          <div className="product-card">
            <div className="product-pattern"></div>
            <div className="product-content">
              <h3 className="product-name">{modelInfo.name}</h3>
              <p className="product-type">{modelInfo.fullName}</p>
              {modelInfo.description && (
                <p className="product-version">{modelInfo.description}</p>
              )}
            </div>
          </div>

          <div className="summary-section">
            <h3 className="summary-title">Summary</h3>
            <div className="summary-item">
              <span className="summary-label">Items Subtotal:</span>
              <span className="summary-value">{formatPrice(subtotal)}</span>
            </div>
            {subtotal > 0 && <div className="summary-item-count">1 Item</div>}
            {tax > 0 && (
              <div className="summary-item">
                <span className="summary-label">Tax:</span>
                <span className="summary-value">{formatPrice(tax)}</span>
              </div>
            )}
            <div className="summary-divider"></div>
            <div className="summary-item total">
              <span className="summary-label">Order Total:</span>
              <span className="summary-value">{formatPrice(total)}</span>
            </div>
          </div>

          {/* <div className="delivery-info">
            <div className="delivery-icon">⚡</div>
            <div className="delivery-text">
              <p>Instant Delivery to Email/SMS</p>
              <p>Free Shipping 😉</p>
            </div>
          </div> */}

          <div className="checkout-footer">
            <div className="powered-by">
              <div className="powered-icons">
                <div className="powered-icon icon-1"></div>
                <div className="powered-icon icon-2"></div>
                <div className="powered-icon icon-3"></div>
              </div>
            </div>
            <p className="footer-text">
              By subscribing, you agree to receive recurring automated text marketing. Data Rates may apply. Purchase is not a condition of consent. By Clicking Pay you agree to our{' '}
              <a href="#" className="footer-link">T&C</a>, <a href="#" className="footer-link">Privacy</a>
            </p>
          </div>
        </div>

        {/* Right Column - Information Form */}
        <div className="checkout-right">
          <div className="progress-indicator">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span>Info</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Payment</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>Confirm</span>
            </div>
          </div>

          {currentStep === 1 && (
            <form className="checkout-form" onSubmit={handleContinue}>
              <h2 className="form-title">Information</h2>

              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="hi@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <div className="phone-input-group">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="country-code"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(123) 456 - 7890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="one-time-offer">
                <div className="offer-card">
                  <label className="offer-checkbox-label">
                    <input
                      type="checkbox"
                      name="oneTimeOffer"
                      checked={formData.oneTimeOffer}
                      onChange={handleInputChange}
                      className="offer-checkbox"
                    />
                    <span className="offer-text">Yes! I want to add</span>
                  </label>
                  <div className="offer-price">{formatPrice(subtotal + tax)}</div>
                </div>
                <p className="offer-description">
                  One Time Offer: Want our advanced funnel training? Learn the 9 secret funnels and how you can use them...
                </p>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberInfo"
                    checked={formData.rememberInfo}
                    onChange={handleInputChange}
                  />
                  <span>Remember Information & Sign up for Texts</span>
                </label>
                <p className="checkbox-hint">Click Continue to confirm</p>
              </div>

              <button type="submit" className="continue-button">
                Continue
              </button>
            </form>
          )}

          {currentStep === 2 && (
            <form className="checkout-form" onSubmit={handleContinue}>
              <h2 className="form-title">Payment</h2>

              <div className="form-group">
                <label htmlFor="cardName">Cardholder Name *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="Tur name "
                  value={paymentData.cardName}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentChange}
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="tur Date of brith"
                    value={paymentData.expiryDate}
                    onChange={handlePaymentChange}
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className="button-group">
                <button type="button" onClick={handleBack} className="back-button-form">
                  Back
                </button>
                <button type="submit" className="continue-button">
                  Continue to Confirm
                </button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <div className="checkout-form">
              <h2 className="form-title">Confirm Order</h2>

              <div className="confirmation-section">
                <div className="confirmation-item">
                  <h3>Order Summary</h3>
                  <div className="confirmation-details">
                    <p><strong>Plan:</strong> {planInfo.name}</p>
                    <p><strong>Model:</strong> {modelInfo.fullName}</p>
                    <p><strong>Subtotal:</strong> {formatPrice(subtotal)}</p>
                    <p><strong>Tax:</strong> {formatPrice(tax)}</p>
                    <p><strong>Total:</strong> {formatPrice(total)}</p>
                  </div>
                </div>

                <div className="confirmation-item">
                  <h3>Contact Information</h3>
                  <div className="confirmation-details">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.countryCode} {formData.phone}</p>
                  </div>
                </div>

                <div className="confirmation-item">
                  <h3>Payment Method</h3>
                  <div className="confirmation-details">
                    <p><strong>Card:</strong> {paymentData.cardNumber ? `**** **** **** ${paymentData.cardNumber.replace(/\s/g, '').slice(-4)}` : 'Not provided'}</p>
                    <p><strong>Expiry:</strong> {paymentData.expiryDate || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button type="button" onClick={handleBack} className="back-button-form">
                  Back
                </button>
                <button type="button" onClick={handleCompleteOrder} className="continue-button">
                  Complete Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

