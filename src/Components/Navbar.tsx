import React, { useContext } from 'react';
import { Switch } from './Reusables';
import { ThemeContext } from './Context';

export const Navbar: React.FC = () => {
  const { changeTheme } = useContext(ThemeContext);
  return (
    <div className="navbar border border-blue-300  shadow-md sm:p-6 p-2">
      <div className=" h-full flex justify-between items-center">
        <span>chatML</span>
        <Switch switchName="theme-switch" callback={changeTheme} />
      </div>
    </div>
  );
};

Navbar.displayName = 'Navbar';
