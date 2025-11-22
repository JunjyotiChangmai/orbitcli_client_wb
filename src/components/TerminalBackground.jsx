import React, { useState, useEffect } from 'react';
import './TerminalBackground.css';

const TerminalBackground = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const commands = [
    { text: 'orbit init my-project', delay: 100 },
    { text: 'orbit generate component Button', delay: 80 },
    { text: 'orbit deploy --env production', delay: 90 },
    { text: 'orbit test --coverage', delay: 85 },
    { text: 'orbit build --optimize', delay: 95 },
  ];

  useEffect(() => {
    const currentCommand = commands[currentCommandIndex];
    let charIndex = 0;
    let timeoutId;

    const typeCommand = () => {
      if (charIndex < currentCommand.text.length) {
        setDisplayedText(currentCommand.text.slice(0, charIndex + 1));
        charIndex++;
        timeoutId = setTimeout(typeCommand, currentCommand.delay);
      } else {
        // Wait a bit before clearing
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            setDisplayedText('');
            setIsTyping(true);
            setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
          }, 1000);
        }, 2000);
      }
    };

    if (isTyping) {
      typeCommand();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentCommandIndex, isTyping]);

  // Cursor blink animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="terminal-background">
      <div className="terminal-glow"></div>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 8H18M6 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Terminal</span>
          </div>
        </div>
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="terminal-prompt">
              <span className="prompt-user">user</span>
              <span className="prompt-separator">@</span>
              <span className="prompt-host">orbit</span>
              <span className="prompt-path">:~$</span>
            </span>
            <span className="terminal-command">
              {displayedText}
              {showCursor && <span className="terminal-cursor">▊</span>}
            </span>
          </div>
          {!isTyping && displayedText && (
            <div className="terminal-output">
              <span className="terminal-success">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Command executed successfully
              </span>
            </div>
          )}
          <div className="terminal-pattern"></div>
          <div className="terminal-scanline"></div>
        </div>
      </div>
    </div>
  );
};

export default TerminalBackground;

