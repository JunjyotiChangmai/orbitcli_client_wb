import React from 'react';
import TerminalBackground from '../../components/TerminalBackground';
import Navbar from '../../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <section className="hero">
        <TerminalBackground />
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">✨ New Version Available</div>
          <h1>
            <span className="gradient-text">Orbit CLI</span>
            <br />
            Your Smart Companion for Code Generation
          </h1>
          <p>Download the powerful Orbit CLI to revolutionize your development workflow. Generate code, automate tasks, and build faster with our intelligent command-line interface.</p>
          <div className="hero-buttons">
            <a href="#download" className="btn-primary">
              <span>Download Now</span>
              <svg width="10" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3V17M10 17L4 11M10 17L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#learn-more" className="btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      <section className="features aligned-features-section">
        <div className="section-header aligned-section-header">
          <h2>Why Choose Orbit CLI?</h2>
          <p className="section-subtitle">Powerful features built to elevate developers</p>
        </div>
        <div className="aligned-feature-grid">
          <div className="aligned-feature-card">
            <div className="aligned-icon">
              <svg height="44" width="44" viewBox="0 0 44 44"><rect width="44" height="44" rx="14" fill="#2563eb"/><path d="M16.5 28l4.5 4 8.5-10" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3>AI Code Generation</h3>
            <p>Write code faster and smarter with instant intelligent suggestions and templates.</p>
          </div>
          <div className="aligned-feature-card">
            <div className="aligned-icon">
              <svg width="44" height="44" viewBox="0 0 44 44"><rect width="44" height="44" rx="14" fill="#10b981"/><rect x="11" y="13" width="22" height="16" rx="4" fill="#fff"/><rect x="11" y="13" width="22" height="16" rx="4" stroke="#10b981" strokeWidth="2"/></svg>
            </div>
            <h3>Universal Platform</h3>
            <p>Seamlessly compatible with Windows, Mac, and Linux—develop your way.</p>
          </div>
          <div className="aligned-feature-card">
            <div className="aligned-icon">
              <svg width="44" height="44" viewBox="0 0 44 44"><rect width="44" height="44" rx="14" fill="#a21caf"/><path d="M17 19h10M22 14v10" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3>Automate Everything</h3>
            <p>Custom scripts and commands to automate all your repetitive dev tasks.</p>
          </div>
          <div className="aligned-feature-card">
            <div className="aligned-icon">
              <svg width="44" height="44" viewBox="0 0 44 44"><rect width="44" height="44" rx="14" fill="#f59e42"/><path d="M13 22l5 8 11-16" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3>Intuitive CLI UX</h3>
            <p>A friendly, responsive CLI interface—designed for efficiency and productivity.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Coding Experience?</h2>
          <p>Join thousands of developers who are already boosting their productivity with Orbit CLI. Download now and start building smarter.</p>
          <a href="#download" className="btn-primary btn-large">
            <span>Get Orbit CLI Today</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
