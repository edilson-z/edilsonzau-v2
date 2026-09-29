// ThemeToggle.jsx
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  // 1. Initialize state based on localStorage or system preferences
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  // 2. Synchronize the state with the HTML attribute and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. Toggle helper function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} className="mode-toggle" aria-label="Toggle dark mode">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
