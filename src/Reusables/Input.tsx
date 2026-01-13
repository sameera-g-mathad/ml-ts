import React, { ChangeEvent } from 'react';
import { withTheme } from '../HOC';
import { inputInterface, themeInterface } from '../interface';

/**
 * Input component is responsible for rendering a text input field that allows users to enter text.
 * It takes in a size, default value, and a callback function to handle changes to the input value.
 */
const InputComponent: React.FC<themeInterface & inputInterface> = ({
  secondaryColor,
  size,
  defaultValue,
  callback
}) => {
  const sizes = {
    small: 'w-12',
    medium: 'w-20',
    large: 'w-40',
    full: 'w-full',
  };
  return (
    <input
      type="text"
      style={{ borderColor: secondaryColor }}
      className={`outline-none bg-none rounded-xl pl-2 border-2 text-black ${sizes[size]}`}
      value={defaultValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => callback && callback(e.target.value)}
    />
  );
};

InputComponent.displayName = 'InputComponent';

export const Input = withTheme(InputComponent, ['secondaryColor']);
