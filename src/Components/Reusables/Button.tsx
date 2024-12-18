import React, { useContext } from 'react';
import { buttonInterface } from '../../interface';
import { ThemeContext } from '../Context';
export const Button: React.FC<buttonInterface> = ({
  name,

  iconComponent,
  callback,
}) => {
  const { useColor } = useContext(ThemeContext);
  // useEffect(() => console.log(useColor), [useColor]);
  return (
    <button
      style={{ ...({ '--use-color': useColor } as React.CSSProperties) }}
      className="button border-2 py-2 sm:px-4 px-3 mr-1 rounded-lg tracking-wide"
      onClick={callback}
    >
      <span className="flex justify-evenly items-center">
        {iconComponent && iconComponent()}
        {name}
      </span>
    </button>
  );
};

Button.displayName = 'Button';
