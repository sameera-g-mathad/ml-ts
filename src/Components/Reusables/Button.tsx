import React from 'react';
import { buttonInterface } from '../../interface';
export const Button: React.FC<buttonInterface> = ({ name, callback }) => {
  return <button onClick={callback}>{name}</button>;
};

Button.displayName = 'Button';
