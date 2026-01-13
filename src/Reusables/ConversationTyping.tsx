import React, { memo, useEffect, useState } from 'react';
import { conversationalTypingInterface } from '../interface';

/**
 * ConversationTyping component is responsible for displaying a typing animation
 * for the given text. It takes in the text to be displayed, the speed of the typing animation,
 * and a callback function to be called once the typing animation is complete.
 */
export const ConversationTyping: React.FC<conversationalTypingInterface> = memo(
  ({ text, speed, callback }) => {
    text = text.trim(); // trim the text to remove any leading or trailing whitespace.
    speed = speed || 3; // set a default speed of 3 if no speed is provided.
    const [index, setIndex] = useState<number>(-1); // index to keep track of the current position in the text.
    const [words, setWords] = useState(''); // state to keep track of the words that have been typed so far.

    useEffect(() => {
      setIndex(-1);
      setWords('');
    }, [text]);

    useEffect(() => {
      // If the index is less than the length of the text,
      // set a timer to update the words and index after the specified speed.
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
