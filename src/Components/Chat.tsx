import React, { useContext } from 'react';
import { childrenProp, chatInterface } from '../interface';
import { UserSvg, SystemSvg } from './Svgs';
import { ThemeContext } from './Context';
export const Chat: React.FC<childrenProp & chatInterface> = ({
  children,
  gerneratedBy,
}) => {
  const displayPosition = {
    user: 'items-end flex-row-reverse',
    system: '',
  };
  const displayIcon = {
    user: <UserSvg />,
    system: <SystemSvg />,
  };
  const { theme, useColor } = useContext(ThemeContext);
  const background = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  return (
    // <div>
    <div
      className={`w-full flex p-2 sm:p-6 justify-start ${displayPosition[gerneratedBy]}`}
    >
      <div
        style={{ background: useColor }}
        className="mx-1 py-2 sm:mx-2 sm:py-4 pt-4 w-10 h-10 relative flex justify-center items-center rounded-full"
      >
        {displayIcon[gerneratedBy]}
      </div>
      <div
        className={`sm:w-1/2 w-5/6 border shadow-lg p-4 rounded-3xl ${background} ${textColor}`}
      >
        {children}
      </div>
    </div>
    // {/* <span>{`${chatRecord[gerneratedBy]}`}</span> */}
    // {/* </div> */}
  );
};

Chat.displayName = 'Chat';
