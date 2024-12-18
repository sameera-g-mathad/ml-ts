import React, { useContext } from 'react';
import { ThemeContext } from '../Context';

export const HorizontalRule: React.FC = () => {
  const { useColor } = useContext(ThemeContext);
  return <hr style={{ borderColor: useColor }} className="mt-3 border" />;
};

HorizontalRule.displayName = 'HorizontalRule';
