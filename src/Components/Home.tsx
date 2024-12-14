import React, { useContext } from 'react';
import { Navbar, Content } from './index';
import { ThemeContext, ChatContextProvider } from './Context';

export const Home: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`web-container transition duration-500 ease-in-out ${
        theme === 'light' ? 'bg-white' : 'bg-gray-700'
      }`}
    >
      <Navbar />
      <ChatContextProvider>
        <Content />
      </ChatContextProvider>
    </div>
  );
};

Home.displayName = 'Home';
