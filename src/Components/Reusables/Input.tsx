import React, { ChangeEvent, useState } from 'react';
import withTheme from '../HOC/withTheme';
import { inputInterface, themeInterface } from '../../interface';

const InputComponent: React.FC<themeInterface & inputInterface> = ({
  color,
  size,
  defaultValue,
}) => {
  const sizes = {
    small: 'w-12',
    medium: 'w-32',
    large: 'w-64',
    full: 'w-full',
  };
  const [input, setInput] = useState(defaultValue);
  return (
    <input
      type="text"
      style={{ borderColor: color }}
      className={`outline-none bg-none rounded-lg pl-2 border-2 text-black ${sizes[size]}`}
      value={input}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
    />
  );
};

InputComponent.displayName = 'InputComponent';

export const Input = withTheme(InputComponent);
