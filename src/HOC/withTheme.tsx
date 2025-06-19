import React, { useContext } from 'react';
import { ThemeContext } from '../Context';
import { themeInterface } from '../interface';
const withTheme = <P extends object>(
  Component: React.ComponentType<P & themeInterface>
) => {
  return (props: P) => {
    const { useColor } = useContext(ThemeContext);
    return <Component {...props} color={useColor} className='' />;
  };
};

export default withTheme;
