import React, { useContext } from 'react';
import { Navbar, Content } from './index';
import ThemeContext from '../Context/ThemeContext';

export const Home: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`web-container transition duration-500 ease-in-out ${
        theme === 'light' ? 'bg-white' : 'bg-gray-700'
      }`}
    >
      <Navbar />
      <Content />
    </div>
  );
};

Home.displayName = 'Home';
