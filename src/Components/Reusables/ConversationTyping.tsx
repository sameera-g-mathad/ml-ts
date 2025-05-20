import React, { memo, useEffect, useState } from 'react';
import { conversationalTypingInterface } from '../../interface';

export const ConversationTyping: React.FC<conversationalTypingInterface> = memo(
  ({ text, speed, callback }) => {
    text = text.trim();
    speed = speed || 3;
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
      } else {
        if (callback && index === text.length) callback();
      }
      // eslint-disable-next-line 
    }, [index, speed, text]);

    return <div dangerouslySetInnerHTML={{ __html: words }} />;
  }
);

ConversationTyping.displayName = 'ConversationTyping';
