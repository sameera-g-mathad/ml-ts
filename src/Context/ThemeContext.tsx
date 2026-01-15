import React, { createContext, useCallback, useMemo, useState } from 'react';
import { childrenProp, themeInterfaceByContext } from '../interface';

/**
 * This context is used to manage the theme of the application.
 * It provides the current theme, a function to change the theme,
 * and a color combination to use for the theme.
 * The initial theme is set to 'light' and the color combination is set to a default value.
 */

export const ThemeContext = createContext<themeInterfaceByContext>({
  theme: 'light',
  colorToUse: { system: '', user: '', secondary: '' },
});

export const ThemeContextProvider: React.FC<childrenProp> = ({ children }) => {
  // const webColors = [
  //   // 'rgb(59, 130, 246)', // bg-blue-500
  //   // 'rgb(249, 168, 37)', // bg-yellow-500
  //   'rgb(251, 146, 60)', // bg-amber-500
  //   // 'rgb(34, 197, 94)', // bg-green-500
  //   'rgb(16, 185, 129)', // bg-emerald-500
  //   'rgb(6, 182, 212)', // bg-cyan-500
  //   'rgb(37, 99, 235)', // bg-sky-500
  //   'rgb(139, 92, 246)', // bg-violet-500
  //   'rgb(168, 85, 247)', // bg-purple-500
  //   'rgb(236, 72, 153)', // bg-fuchsia-500
  //   'rgb(236, 72, 153)', // bg-pink-500
  //   'rgb(190, 24, 93)', // bg-rose-500
  //   // 'rgb(255, 0, 0)', // bg-red-500
  //   'rgb(255, 159, 28)', // bg-orange-500
  //   'rgb(20, 184, 166)', // bg-teal-500
  //   'rgb(191, 219, 74)', // bg-lime-500
  //   'rgb(75, 29, 219)', // bg-indigo-500
  //   'rgb(251, 113, 133)', // bg-red-400
  //   'rgb(74, 222, 128)', // bg-green-400
  //   'rgb(96, 165, 250)', // bg-blue-400
  //   'rgb(250, 204, 21)', // bg-yellow-400
  // ];

  // const color = useMemo(() => {
  //   // Randomly select a color from the webColors array
  //   // and return it as a string
  //   let choice = Math.floor(Math.random() * webColors.length);
  //   return webColors[choice];
  //   // eslint-disable-next-line 
  // }, []);

  const colorCombinations = useMemo(() => (
    [
      {
        'system': 'rgb(4, 120, 87)', //  (Amber 500)
        'user': 'rgb(75, 29, 219)', //(Fuchsia 500)
        'secondary': 'rgb(16, 185, 129)' // (Blue 400)
      },
      {
        'system': 'rgb(6, 182, 212)', // (Cyan 500)
        'user': 'rgb(139, 92, 246)', //(Violet 500)
        'secondary': 'rgb(251, 113, 133)' // (Red 400)
      },
      {
        'system': 'rgb(20, 184, 166)', //  (Teal 500)
        'user': 'rgb(168, 85, 247)', // (Purple 500)
        'secondary': 'rgb(251, 204, 21)' // (Yellow 400)
      },
      {
        'system': 'rgb(75, 29, 219)', //  (Indigo 500)
        'user': 'rgb(236, 72, 153)', // (Fuchsia 500)
        'secondary': 'rgb(190, 24, 93)' // (Rose 500)
      },
      {
        'system': 'rgb(16, 185, 129)', //(Emerald 500)
        'user': 'rgb(191, 219, 74)', // (Lime 500)
        'secondary': 'rgb(251, 146, 60)' // (Amber 500)
      },
    ]
  ), [])

  const color = useMemo(() => {
    // Randomly select a color from the webColors array
    // and return it as a string
    let choice = Math.floor(Math.random() * colorCombinations.length);
    return colorCombinations[choice];
    // eslint-disable-next-line 
  }, []);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // const useColor = useState(color);
  const changeTheme = useCallback((change: boolean) => {
    setTheme(change ? 'dark' : 'light');
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorToUse: color,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
