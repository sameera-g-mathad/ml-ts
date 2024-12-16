import React, { memo, useContext } from 'react';
import { Navbar, Content } from './index';
import { ThemeContext, ChatContextProvider } from './Context';

export const Home: React.FC = memo(() => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`web-container transition duration-300 ease-in-out ${
        theme === 'light' ? 'bg-white' : 'bg-gray-900'
      }`}
    >
      <Navbar />
      <ChatContextProvider>
        <Content />
      </ChatContextProvider>
    </div>
  );
});

Home.displayName = 'Home';
