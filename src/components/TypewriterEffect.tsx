import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  delay: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      // Cleanup the timeout when the component unmounts or dependencies change
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && <span className="cursor">|</span>}
    </span>
  );
};

export default TypewriterEffect;