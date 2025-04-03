import React, { useState, useEffect } from 'react';
import '../styles/dynamicText.css';

// Пул шрифтов
const fonts = [
  'Dela Gothic One',
  'MedievalSharp', // Готический
  'Great Vibes', // Рукописный
];

// Символы для рандомизации
const symbols = "/?.'[}&*@#$!%0123456789";

// Генерация случайного текста
const generateRandomText = (original) => {
  return original
    .split('')
    .map((char) =>
      Math.random() > 0.5
        ? char
        : symbols[Math.floor(Math.random() * symbols.length)]
    )
    .join('');
};

const DynamicText = () => {
  const [text, setText] = useState('AXTI-XTI');
  const [font, setFont] = useState(fonts[0]);
  const [effect, setEffect] = useState('random');

  useEffect(() => {
    const interval = setInterval(() => {
      setText(generateRandomText('AXTI-XTI'));
      setFont(fonts[Math.floor(Math.random() * fonts.length)]);
      setEffect(['glow'], ['shadow']);
    }, 200); // Увеличиваем частоту обновления

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`dynamic-text ${effect}`}
      style={{
        fontFamily: font,
        fontSize: 72, // Случайный размер шрифта
        textShadow:
         effect === 'glow'
            ? '0 0 15px #ff2d2d, 0 0 30px #ff2d2d'
            : effect === 'shadow'
            ? '2px 2px 5px rgba(0, 0, 0, 0.8)'
            : 'glow',
      }}
    >
      {text}
    </div>
  );
};

export default DynamicText;