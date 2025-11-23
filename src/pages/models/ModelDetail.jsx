import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ModelDetail.css'

const ModelDetail = () => {
  const { modelId } = useParams()
  const navigate = useNavigate()

  const models = {
    gpt: {
      name: 'GPT-4',
      fullName: 'GPT-4 by OpenAI',
      description: 'GPT-4 is OpenAI\'s most advanced language model, featuring exceptional reasoning capabilities, multimodal support, and state-of-the-art performance across a wide range of tasks.',
      longDescription: 'GPT-4 represents a significant leap forward in AI capabilities. It can understand and generate human-like text, analyze images, write code, solve complex problems, and assist with creative tasks. With its large context window and improved reasoning, GPT-4 is ideal for applications requiring deep understanding and nuanced responses.',
      price: 16500,
      features: [
        'Advanced reasoning and problem-solving capabilities',
        'Multimodal support (text and image understanding)',
        'Large context window for extended conversations',
        'High accuracy and reliability across diverse tasks',
        'Code generation and debugging assistance',
        'Creative writing and content generation',
        'Data analysis and insights',
        'Multi-language support'
      ],
      useCases: [
        'Content creation and writing assistance',
        'Code generation and software development',
        'Data analysis and research',
        'Customer support automation',
        'Educational tutoring',
        'Creative projects and brainstorming'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#10a37f',
      badge: 'Popular'
    },
    gemini: {
      name: 'Gemini',
      fullName: 'Google Gemini',
      description: 'Google Gemini is a cutting-edge AI model designed for complex reasoning, code generation, and creative tasks. It excels at understanding context and providing accurate, helpful responses.',
      longDescription: 'Gemini represents Google\'s latest advancement in AI technology. Built with multimodal capabilities, it can process and understand text, images, audio, and video. Gemini is optimized for tasks requiring deep reasoning, code generation, and creative problem-solving. Its architecture enables fast response times while maintaining high quality outputs.',
      price: 14800,
      features: [
        'Advanced code generation and debugging',
        'Multimodal understanding (text, images, audio, video)',
        'Fast response times',
        'Integration with Google services',
        'Complex reasoning capabilities',
        'Creative content generation',
        'Real-time collaboration features',
        'Enterprise-grade security'
      ],
      useCases: [
        'Software development and coding',
        'Multimedia content analysis',
        'Research and data processing',
        'Creative writing and design',
        'Business intelligence',
        'Educational content creation'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#4285f4',
      badge: 'New'
    },
    claude: {
      name: 'Claude',
      fullName: 'Claude AI by Anthropic',
      description: 'Claude is Anthropic\'s AI assistant focused on being helpful, harmless, and honest. It features extended context understanding and excels at detailed analysis and conversation.',
      longDescription: 'Claude is designed with a focus on safety, helpfulness, and transparency. It can handle extended conversations with context retention, provide detailed analysis of complex topics, and assist with a wide range of tasks while maintaining ethical principles. Claude\'s architecture prioritizes accuracy and thoughtful responses.',
      price: 15700,
      features: [
        'Extended context understanding (up to 200K tokens)',
        'Ethical AI principles and safety focus',
        'Detailed analysis and research capabilities',
        'Excellent conversational abilities',
        'Document analysis and summarization',
        'Creative writing assistance',
        'Code review and suggestions',
        'Multi-turn conversation support'
      ],
      useCases: [
        'Long-form content analysis',
        'Research and documentation',
        'Ethical AI applications',
        'Customer service',
        'Educational assistance',
        'Content moderation and review'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12L12 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: '#d97757',
      badge: 'Premium'
    }
  }

  const model = models[modelId]

  if (!model) {
    return (
      <div className="model-detail-container">
        <div className="model-not-found">
          <h1>Model Not Found</h1>
          <button onClick={() => navigate('/models')} className="back-button">
            Back to Models
          </button>
        </div>
      </div>
    )
  }

  const handleBilling = () => {
    navigate('/billing', {
      state: {
        model: {
          name: model.name,
          fullName: model.fullName,
          description: model.description,
          price: model.price,
          id: modelId
        }
      }
    })
  }

  return (
    <div className="model-detail-container">
      <div className="model-detail-header">
        <button onClick={() => navigate('/models')} className="back-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Models
        </button>
      </div>

      <div className="model-detail-content">
        <div className={`model-detail-hero ${modelId}`}>
          <div className={`model-icon-large ${modelId}`}>
            {model.icon}
          </div>
          <div className="model-hero-info">
            <div className="model-badge-large">{model.badge}</div>
            <h1 className="model-detail-title">{model.fullName}</h1>
            <p className="model-detail-subtitle">{model.description}</p>
            <div className="model-overview">
              <h2 className="overview-title">Overview</h2>
              <p className="overview-content">{model.longDescription}</p>
            </div>
          </div>
        </div>

        <div className="model-detail-sections">

          <section className={`model-section ${modelId}`}>
            <h2 className="section-title">Key Features</h2>
            <ul className="feature-list">
              {model.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <div className="feature-icon">✓</div>
                  <p>{feature}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="model-section">
            <h2 className="section-title">Use Cases</h2>
            <div className="use-cases-grid">
              {model.useCases.map((useCase, index) => (
                <div key={index} className="use-case-card">
                  <div className="use-case-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p>{useCase}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="model-section billing-section">
            <div className="billing-card">
              <h2 className="section-title">Ready to Get Started?</h2>
              <p className="section-content">
                Choose a plan that fits your needs and start using {model.name} today. 
                Flexible pricing options available for individuals and teams.
              </p>
              <button onClick={handleBilling} className="billing-button">
                <span>Go to Billing</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ModelDetail

