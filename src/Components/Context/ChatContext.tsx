import React, { createContext, useState } from 'react';
import {
  childrenProp,
  chatInterfaceByContext,
  GeneratedBy,
} from '../../interface';
import { WelcomeText } from '../Templates';
import { Chat } from '../Chat';

export const ChatContext = createContext<chatInterfaceByContext>({
  chatComponents: [],
  appendChatComponent: () => {},
});

export const ChatContextProvider: React.FC<childrenProp> = ({ children }) => {
  const [chatComponents, setChatComponents] = useState<JSX.Element[]>([
    <Chat key={1} gerneratedBy={GeneratedBy.system}>
      <WelcomeText />
    </Chat>,
  ]);

  const appendChatComponent = (Component: JSX.Element) => {
    setChatComponents((prevChatComponents) => [
      ...prevChatComponents,
      React.cloneElement(Component, { key: chatComponents.length + 1 }),
    ]);
  };
  return (
    <ChatContext.Provider
      value={{
        chatComponents,
        appendChatComponent,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.displayName = 'ChatContextProvider';
