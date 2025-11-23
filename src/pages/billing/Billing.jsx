import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Billing.css'

const Billing = () => {
  const navigate = useNavigate()
  const [billingPeriod, setBillingPeriod] = useState('monthly') // 'monthly' or 'yearly'

  const plans = [
    {
      id: 'free',
      name: 'Free',
      monthlyPrice: '₹0',
      yearlyPrice: '₹0',
      description: 'Perfect for getting started',
      features: [
        '10 requests per day',
        'Basic model access',
        'Community support',
        'Standard response time'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      monthlyPrice: '₹2,399',
      yearlyPrice: '₹23,990',
      yearlySavings: 'Save ₹2,398',
      description: 'For professionals and small teams',
      features: [
        '1,000 requests per month',
        'All model access',
        'Priority support',
        'Faster response times',
        'API access',
        'Advanced features'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited requests',
        'All model access',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'On-premise options'
      ],
      popular: false
    }
  ]

  const getPrice = (plan) => {
    if (plan.monthlyPrice === 'Custom' || plan.yearlyPrice === 'Custom') {
      return 'Custom'
    }
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
  }

  const getPeriod = (plan) => {
    if (plan.monthlyPrice === 'Custom' || plan.yearlyPrice === 'Custom') {
      return ''
    }
    return billingPeriod === 'monthly' ? 'month' : 'year'
  }

  return (
    <div className="billing-container">
      <div className="billing-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <h1>Billing & Plans</h1>
        <p>Choose the perfect plan for your needs</p>
        
        <div className="billing-toggle-container">
          <span className={`toggle-label ${billingPeriod === 'monthly' ? 'active' : ''}`}>Monthly</span>
          <div className="billing-toggle" onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}>
            <div className={`toggle-slider ${billingPeriod === 'yearly' ? 'yearly' : ''}`}></div>
          </div>
          <span className={`toggle-label ${billingPeriod === 'yearly' ? 'active' : ''}`}>
            Yearly
            <span className="savings-badge">Save 17%</span>
          </span>
        </div>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <div className="plan-header">
              <h2 className="plan-name">{plan.name}</h2>
              <div className="plan-price">
                <span className="price-amount">{getPrice(plan)}</span>
                {getPeriod(plan) && <span className="price-period">/{getPeriod(plan)}</span>}
              </div>
              {billingPeriod === 'yearly' && plan.yearlySavings && (
                <div className="yearly-savings">{plan.yearlySavings}</div>
              )}
              <p className="plan-description">{plan.description}</p>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="plan-button">
              {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Billing

