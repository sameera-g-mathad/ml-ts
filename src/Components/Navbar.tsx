import React, { memo, useContext } from 'react';
import { Switch } from './Reusables';
import { ThemeContext } from './Context';
import { DarkTheme, LightTheme } from './Svgs';

export const Navbar: React.FC = memo(() => {
  const { theme, useColor, changeTheme } = useContext(ThemeContext);
  const displayIcon = {
    light: <LightTheme />,
    dark: <DarkTheme />,
  };
  // console.log(useColor);
  return (
    <div
      style={{ backgroundColor: useColor }}
      className={`navbar shadow-md sm:p-6 p-2 text-white`}
    >
      <div className=" h-full flex justify-between items-center">
        <span className="font-semibold sm:text-3xl text-lg tracking-wider">
          <span className="font-medium italic">chat</span>
          <span className="uppercase">(ml)</span>
        </span>
        <div>
          <span className="flex justify-evenly items-center w-20">
            <Switch switchName="theme-switch" callback={changeTheme} />
            {displayIcon[theme]}
          </span>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';
