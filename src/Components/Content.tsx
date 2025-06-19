import React, { memo, useContext, useEffect, useRef } from 'react';
import { ChatContext } from './../Context';

/**
 * This is the Content component of the application.
 * It contains the main functionality of the application.
 * It uses the ChatContext to manage the chat components.
 * The chat components are displayed in a scrollable container.
 */
export const Content: React.FC = memo(() => {
  // Use chatcontext to extract the chat components
  const { chatComponents } = useContext(ChatContext);
  const scroller = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scroller.current) {
      scroller.current.scrollTop = scroller.current.scrollHeight
    }
  }, [chatComponents])
  return (
    <div ref={scroller} className="web-content w-full overflow-y-scroll">
      <>{chatComponents}</>
    </div>
  );
});

Content.displayName = 'Content';
