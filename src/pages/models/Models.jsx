import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Models.css'

const Models = () => {
  const navigate = useNavigate()

  const models = [
    {
      id: 'gpt',
      name: 'GPT',
      fullName: 'GPT-4',
      description: 'OpenAI\'s advanced language model with exceptional reasoning capabilities and multimodal support.',
      features: [
        'Advanced reasoning and problem-solving',
        'Multimodal capabilities (text, images)',
        'Large context window',
        'High accuracy and reliability'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      badge: 'Popular'
    },
    {
      id: 'gemini',
      name: 'Gemini',
      fullName: 'Google Gemini',
      description: 'Google\'s cutting-edge AI model designed for complex reasoning, code generation, and creative tasks.',
      features: [
        'Advanced code generation',
        'Multimodal understanding',
        'Fast response times',
        'Integration with Google services'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      badge: 'New'
    },
    {
      id: 'claude',
      name: 'Claude',
      fullName: 'Claude AI',
      description: 'Anthropic\'s AI assistant focused on helpfulness, harmlessness, and honesty with extended context.',
      features: [
        'Extended context understanding',
        'Ethical AI principles',
        'Detailed analysis capabilities',
        'Conversational excellence'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12L12 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      badge: 'Premium'
    }
  ]

  return (
    <div className="models-container">
      <div className="models-header">
        <h1>AI Models</h1>
        <p>Choose from our collection of powerful AI models, each optimized for different tasks and use cases.</p>
      </div>

      <div className="models-grid">
        {models.map((model) => (
          <div key={model.id} className={`model-card ${model.id}`}>
            <div className="model-badge">{model.badge}</div>
            <div className="model-icon">
              {model.icon}
            </div>
            <h2 className="model-title">{model.fullName}</h2>
            <p className="model-description">{model.description}</p>
            <ul className="model-features">
              {model.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button 
              className="model-button"
              onClick={() => navigate(`/models/${model.id}`)}
            >
              Use {model.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Models
