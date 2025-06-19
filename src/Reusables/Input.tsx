import React, { ChangeEvent } from 'react';
import withTheme from '../HOC/withTheme';
import { inputInterface, themeInterface } from '../interface';

const InputComponent: React.FC<themeInterface & inputInterface> = ({
  color,
  size,
  defaultValue,
  callback
}) => {
  const sizes = {
    small: 'w-12',
    medium: 'w-32',
    large: 'w-64',
    full: 'w-full',
  };
  return (
    <input
      type="text"
      style={{ borderColor: color }}
      className={`outline-none bg-none rounded-xl pl-2 border-2 text-black ${sizes[size]}`}
      value={defaultValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => callback && callback(e.target.value)}
    />
  );
};

InputComponent.displayName = 'InputComponent';

export const Input = withTheme(InputComponent);
