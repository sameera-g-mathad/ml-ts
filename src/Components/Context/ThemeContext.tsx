import React, { createContext, useState } from 'react';
import { childrenProp, themeInterfaceByContext } from '../../interface';

export const ThemeContext = createContext<themeInterfaceByContext>({
  theme: 'light',
  useColor: '',
});

export const ThemeContextProvider: React.FC<childrenProp> = ({ children }) => {
  const webColors = [
    // 'rgb(59, 130, 246)', // bg-blue-500
    // 'rgb(249, 168, 37)', // bg-yellow-500
    'rgb(251, 146, 60)', // bg-amber-500
    // 'rgb(34, 197, 94)', // bg-green-500
    'rgb(16, 185, 129)', // bg-emerald-500
    'rgb(6, 182, 212)', // bg-cyan-500
    'rgb(37, 99, 235)', // bg-sky-500
    'rgb(139, 92, 246)', // bg-violet-500
    'rgb(168, 85, 247)', // bg-purple-500
    'rgb(236, 72, 153)', // bg-fuchsia-500
    'rgb(236, 72, 153)', // bg-pink-500
    'rgb(190, 24, 93)', // bg-rose-500
    // 'rgb(255, 0, 0)', // bg-red-500
    'rgb(255, 159, 28)', // bg-orange-500
    'rgb(20, 184, 166)', // bg-teal-500
    'rgb(191, 219, 74)', // bg-lime-500
    'rgb(75, 29, 219)', // bg-indigo-500
    'rgb(251, 113, 133)', // bg-red-400
    'rgb(74, 222, 128)', // bg-green-400
    'rgb(96, 165, 250)', // bg-blue-400
    'rgb(250, 204, 21)', // bg-yellow-400
  ];
  let choice = Math.floor(Math.random() * webColors.length);
  let color = webColors[choice];

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // const useColor = useState(color);
  const changeTheme = (change: boolean) => {
    setTheme(change ? 'dark' : 'light');
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        useColor: color,
        // useColor: useColor[0],
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
