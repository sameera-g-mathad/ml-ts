import React from 'react';
import { childrenProp, chatInterface } from '../interface';
import { UserSvg, SystemSvg } from './Svgs';

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
  // const chatRecord = {
  //   user: 'Requested At',
  //   system: 'Responded At',
  // };
  // const dateObj = new Date();

  return (
    // <div>
    <div
      className={`w-full flex p-2 sm:p-6 justify-start ${displayPosition[gerneratedBy]}`}
    >
      <div className="mx-1 py-2 sm:mx-2 sm:py-4 pt-4 w-10 h-10 relative bg-fuchsia-400 flex justify-center items-center rounded-full">
        {displayIcon[gerneratedBy]}
      </div>
      <div className="sm:w-1/2 w-5/6 border shadow-lg p-4 rounded-3xl">
        {children}
      </div>
    </div>
    // {/* <span>{`${chatRecord[gerneratedBy]}`}</span> */}
    // {/* </div> */}
  );
};

Chat.displayName = 'Chat';
