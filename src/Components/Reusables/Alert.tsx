import React from 'react';
import { childrenProp, alertInterface } from '../../interface';

export const Alert: React.FC<childrenProp & alertInterface> = ({
  children,
  type,
}) => {
  const allowedColors = {
    danger: {
      borderColor: 'bg-red-700',
      textColor: 'bg-red-700',
      backgroundColor: 'bg-red-400',
    },
    note: {
      borderColor: 'rgb(98, 78, 23)',
      color: 'rgba(98, 78, 23)',
      backgroundColor: 'rgb(249, 239, 209)',
    },
  };
  return (
    <div
      style={{ ...allowedColors[type] }}
      className="w-full max-h-20 border my-2 p-2 rounded-lg"
    >
      {children}
    </div>
  );
};

Alert.displayName = 'Alert';
