// src/components/TypingText.jsx
import React, { useState, useEffect } from 'react';

const TypingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 5); // Скорость печати (50мс)
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <p className="typing-text">{displayedText}</p>;
};

export default TypingText;