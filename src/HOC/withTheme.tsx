import React, { useContext } from 'react';
import { ThemeContext } from '../Context';
import { themeInterface } from '../interface';

export const withTheme = <P extends object>(
  Component: React.ComponentType<P & themeInterface>, inject?: Partial<keyof themeInterface>[]
) => {
  return (props: P) => {
    const { theme, colorToUse, changeTheme } = useContext(ThemeContext);
    const themeProps: themeInterface = {
      theme,
      changeTheme,
      systemColor: colorToUse['system'],
      userColor: colorToUse['user'],
      secondaryColor: colorToUse['secondary']
    }
    const propsToUse: Partial<themeInterface> = {};
    inject?.forEach(key =>
      (propsToUse as any)[key] = themeProps[key]
    )
    return <Component {...props} {...propsToUse as any} />;
  };
};
