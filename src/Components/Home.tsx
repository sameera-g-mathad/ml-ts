import React, { useContext } from 'react';
import { Navbar } from './Navbar';
import ThemeContext from '../Context/ThemeContext';

export const Home: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`web-container transition duration-500 ease-in-out ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}
    >
      <Navbar />
      <div className="web-content"></div>
    </div>
  );
};

Home.displayName = 'Home';
