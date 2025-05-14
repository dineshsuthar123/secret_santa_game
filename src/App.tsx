import { useState } from 'react';
import './App.css';
import React from 'react';

function shuffleArray(array: string[]) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generatePairs(names: string[]) {
  if (names.length < 2) return [];
  const shuffled = shuffleArray([...names]);
  const pairs = shuffled.map((name, i) => ({
    giver: name,
    receiver: shuffled[(i + 1) % shuffled.length],
  }));
  return pairs;
}

function App() {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [pairs, setPairs] = useState<{ giver: string; receiver: string }[]>([]);
  const [error, setError] = useState('');

  const addName = () => {
    const trimmed = input.trim();
    if (trimmed && !names.includes(trimmed)) {
      setNames([...names, trimmed]);
      setInput('');
      setError('');
    } else if (names.includes(trimmed)) {
      setError('Name already added!');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addName();
  };

  const handleGenerate = () => {
    if (names.length < 2) {
      setError('Add at least 2 participants!');
      return;
    }
    setPairs(generatePairs(names));
    setError('');
  };

  const handleReset = () => {
    setNames([]);
    setPairs([]);
    setInput('');
    setError('');
  };

  return (
    <>
      {/* Animated snowflakes background */}
      <div className="snow">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            className="snowflake"
            key={i}
            style={{
              left: `${Math.random() * 100}vw`,
              fontSize: `${Math.random() * 1.5 + 1}em`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 6 + 7}s`,
            }}
          >
            ❄️
          </span>
        ))}
      </div>
      <div className="santa-app">
        <header className="santa-header">
          <h1>🎅 Secret Santa 🎁</h1>
          <p>Enter participant names and generate your Secret Santa pairs!</p>
        </header>
        <div className="santa-form">
          <input
            type="text"
            placeholder="Add participant name"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={addName}>Add</button>
          <button onClick={handleReset} className="reset-btn">Reset</button>
        </div>
        {error && <div className="santa-error">{error}</div>}
        <ul className="santa-names">
          {names.map((name, idx) => (
            <li key={idx}>{name}</li>
          ))}
        </ul>
        <button className="generate-btn" onClick={handleGenerate} disabled={names.length < 2}>
          Generate Secret Santa Pairs
        </button>
        {pairs.length > 0 && (
          <div className="santa-results">
            <h2>Secret Santa Pairs</h2>
            <ul>
              {pairs.map((pair, idx) => (
                <li key={idx}>
                  <span className="giver">{pair.giver}</span>
                  <span className="santa-arrow">→</span>
                  <span className="receiver">{pair.receiver}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <footer className="santa-footer">
          <p>Made with ❤️ for the holidays</p>
        </footer>
      </div>
    </>
  );
}

export default App;
