import React, { memo, useContext } from 'react';
import { Switch } from './../Reusables';
import { ThemeContext } from './../Context';
import { DarkTheme, LightTheme } from '../Svgs';


/**
 * This is the Navbar component of the application.
 * It contains the logo and the theme switcher.
 * There is no logo technically, but the name of the app is used as a logo.
 * The theme switcher is used to switch between light and dark themes.
 * The theme is managed using the ThemeContext.
 */
export const Navbar: React.FC = memo(() => {
  // Use themecontext to extract the theme
  const { theme, colorToUse, changeTheme } = useContext(ThemeContext);

  // The object below is used to display appropriate icon based on the theme.
  // The icons are imported from the Svgs component.
  const displayIcon = {
    light: <LightTheme />,
    dark: <DarkTheme />,
  };
  // console.log(useColor);
  return (
    <div
      // Set the background color of the navbar based on the theme
      style={{ backgroundColor: colorToUse['secondary'] }}
      className={`navbar shadow-md sm:p-6 p-2 text-white`}
    >
      {/* Styling the name as chat(ML)*/}
      <div className=" h-full flex justify-between items-center">
        <span className="font-semibold sm:text-3xl text-lg tracking-wider">
          <span className="font-medium italic">chat</span>
          <span className="uppercase">(ml)</span>
        </span>
        <div>
          {/* The switch component is used to switch between light and dark themes */}
          {/* The callback function is passed to the switch component to handle the change. More details on implementations in Reusables*/}
          <span className="flex justify-evenly items-center w-20">

            <Switch switchName="theme-switch" callback={changeTheme} />
            {displayIcon[theme]} {/* Based on the theme ['light', 'dark'], icon is dispalyed */}
          </span>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = 'Navbar';
