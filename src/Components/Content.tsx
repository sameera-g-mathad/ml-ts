import React, { memo, useContext } from 'react';
import { ChatContext } from './Context';

/**
 * This is the Content component of the application.
 * It contains the main functionality of the application.
 * It uses the ChatContext to manage the chat components.
 * The chat components are displayed in a scrollable container.
 */
export const Content: React.FC = memo(() => {
  // Use chatcontext to extract the chat components
  const { chatComponents } = useContext(ChatContext);
  return (
    <div className="web-content w-full overflow-y-scroll">
      <div>{chatComponents}</div>
    </div>
  );
});

Content.displayName = 'Content';
