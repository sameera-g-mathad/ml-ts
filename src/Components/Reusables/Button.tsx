import React, { useContext } from 'react';
import { buttonInterface } from '../../interface';
import { ThemeContext } from '../Context';
export const Button: React.FC<buttonInterface> = ({ name, callback }) => {
  const { useColor } = useContext(ThemeContext);
  // useEffect(() => console.log(useColor), [useColor]);
  return (
    <button
      style={{ ...({ '--button-color': useColor } as React.CSSProperties) }}
      className="border-2 py-2 px-5 m-1 rounded-lg button"
      onClick={callback}
    >
      {name}
    </button>
  );
};

Button.displayName = 'Button';
