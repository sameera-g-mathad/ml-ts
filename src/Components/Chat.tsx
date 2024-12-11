import React from 'react';
import { childrenProp } from '../interface';

export const Chat: React.FC<childrenProp> = ({ children }) => {
  return (
    <div className="w-full bg-blue-500 flex p-2 sm:p-6">
      <div className="mr-2">image</div>
      <div className="sm:w-1/2 w-3/4">{children}</div>
    </div>
  );
};

Chat.displayName = 'Chat';
