import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Terminal, Key, Shield, Zap, ArrowRight, Command, Sparkles, Globe } from 'lucide-react';
import TypeWriter from '../components/TypeWriter ';
import InstallOrbitCLI from '../components/InstallOrbitCLI ';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Now with multi-LLM support</span>
            </div>
            
            {/* <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your AI Assistant,
              <br />
              <span className="gradient-text">One Command Away</span>
            </h1> */}

               <TypeWriter/>

            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              OrbitCLI brings the power of GPT, Gemini, and Claude directly to your terminal. Turn hours-long workflows into a single command. Your tools. Your workflow. Your codebase, evolving at thought speed.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="hero" size="lg" className="gap-2 w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="https://github.com/AkhilByteWrangler/OrbitCLI" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  <Command className="w-4 h-4" />
                  View on GitHub
                </Button>
              </a>
            </div> */}

            <InstallOrbitCLI/>
          </div>

          <div className="mt-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="terminal-bg rounded-xl border border-border overflow-hidden shadow-2xl glow-border">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/50">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="ml-4 text-sm text-muted-foreground font-mono">terminal</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-primary">$</span>
                  <span className="text-foreground">orbit ask "How do I create a REST API in Node.js?"</span>
                </div>
                <div className="mt-4 text-muted-foreground leading-relaxed">
                  <span className="text-primary">→</span> Here's a simple REST API using Express.js:
                  <br /><br />
                  <code className="text-cyan-400">const express = require('express');</code>
                  <br />
                  <code className="text-cyan-400">const app = express();</code>
                  <br />
                  <code className="text-cyan-400">app.get('/api/users', (req, res) =&gt; &#123;...&#125;);</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need in your terminal
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              OrbitCLI integrates seamlessly with your development workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Terminal,
                title: 'CLI First',
                description: 'Native terminal experience with intuitive commands',
              },
              {
                icon: Globe,
                title: 'Multi-LLM',
                description: 'Choose between GPT, Gemini, or Claude on the fly',
              },
              {
                icon: Key,
                title: 'Secure Keys',
                description: 'Your API keys are encrypted and stored safely',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Get instant responses without leaving your terminal',
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20">
            <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to supercharge your terminal?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of developers who use OrbitCLI to accelerate their workflow.
            </p>
            <Link to="/register">
              <Button variant="hero" size="lg" className="gap-2">
                Create Account
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 OrbitCLI. Built for developers, by developers.</p>
        </div>
      </footer>
    </div>
  );
}