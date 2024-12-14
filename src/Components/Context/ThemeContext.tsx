import React, { createContext, useState } from 'react';
import { childrenProp, themeInterfaceByContext } from '../../interface';

export const ThemeContext = createContext<themeInterfaceByContext>({
  theme: 'light',
});

export const ThemeContextProvider: React.FC<childrenProp> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');
  const changeTheme = (change: boolean) => {
    setTheme(change ? 'dark' : 'light');
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
