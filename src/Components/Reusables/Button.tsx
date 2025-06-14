import React from 'react';
import { buttonInterface, themeInterface } from '../../interface';
import withTheme from '../HOC/withTheme';

export const ButtonComponent: React.FC<buttonInterface & themeInterface> = ({
  name,
  iconComponent,
  callback,
  color,
  disabled,
}) => {
  // useEffect(() => console.log(useColor), [useColor]);
  return (
    <button
      aria-label='Hover here'
      disabled={disabled}
      style={{
        ...({ '--use-color': color } as React.CSSProperties),
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      className="button border-2 py-2 sm:px-4 px-3 mr-1 rounded-xl tracking-wide capitalize"
      onClick={callback}
    >
      <span className="flex justify-evenly items-center">
        {iconComponent && iconComponent()}
        {name}
      </span>
    </button>
  );
};

ButtonComponent.displayName = 'ButtonComponent';

export const Button = withTheme(ButtonComponent);
