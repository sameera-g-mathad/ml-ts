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
  const [index, setIndex] = useState<number>(-1);
  const [words, setWords] = useState('');

  useEffect(() => {
    setIndex(-1);
    setWords('');
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        if (index >= 0) setWords((prevWord) => prevWord + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, speed, text]);

  return <div dangerouslySetInnerHTML={{ __html: words }} />;
};

ConversationTyping.displayName = 'ConversationTyping';
