import React, { useEffect, useState } from 'react';

interface conversationalTypingInterface {
  text: string;
  speed: number;
}
export const ConversationTyping: React.FC<conversationalTypingInterface> = ({
  text,
  speed,
}) => {
  text = text.trim();
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    if (index < text.length) {
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
    }
  }, [index, speed, text]);

  return <div>{text.slice(0, index)}</div>;
};

ConversationTyping.displayName = 'ConversationTyping';
