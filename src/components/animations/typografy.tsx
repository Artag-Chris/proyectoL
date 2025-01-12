import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypographyProps {
  text: string;
  speed?: number;
  delay?: number;
  spaceBefore?: boolean;
  color?: string;
}

const Typography: React.FC<TypographyProps> = ({ text, speed = 50, delay = 1000, spaceBefore = false, color = 'black' }) => {
  const sequence = spaceBefore ? [' ', delay, text] : [text, delay, ''];

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      speed={speed as any}
      style={{ display: 'inline-block', color: color }}
    />
  );
};

export default Typography;