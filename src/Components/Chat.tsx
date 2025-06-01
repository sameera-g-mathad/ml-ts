import React, { memo, useContext } from 'react';
import { childrenProp, chatInterface } from '../interface';
import { UserSvg, SystemSvg } from './Svgs';
import { ThemeContext } from './Context';

/**
 * This is the Chat component of the application.
 * It contains the chat messages and the user icon.
 * The chat messages are displayed in a scrollable container.
 * The user icon is displayed on the right side of the chat message.
 * The system icon is displayed on the left side of the chat message.
 * @param {childrenProp} children - The chat message to be displayed.
 * @param {'user' | 'system'} gerneratedBy - The type of the chat message and who generated it.
 * @param {boolean} widthFull - If true, the chat message will take the full width of the container.
 * @returns {JSX.Element} - The chat component.
 */
export const Chat: React.FC<childrenProp & chatInterface> = memo(({
  children,
  gerneratedBy,
  widthFull,
}) => {
  // This is to set the background color of the container.
  const { theme, useColor } = useContext(ThemeContext);

  // This is to place the chat message on either side of the display.
  // It uses enum which specifies that the generatedBy can have only two values.
  // If system, it will be on the left side of the display.
  // If user, it will be on the right side of the display.
  const displayPosition = {
    user: `items-end flex-row-reverse ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`,
    system: '',
  };

  // This is to display the user and system icons.
  // It uses enum which specifies that the generatedBy can have only two values.
  const displayIcon = {
    user: <UserSvg />,
    system: <SystemSvg />,
  };

  // extracting background color and text color from the theme, as
  // tailwind css does not support multiple dynamic classes.
  const background = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const date = new Date();
  return (
    <div
      className={`w-full flex p-2 my-4 sm:p-4 justify-start ${displayPosition[gerneratedBy]}`}
    >
      <div
        style={{ background: useColor }}
        className="mx-1 py-2 sm:mx-2 sm:py-4 w-8 h-8 sm:w-10 sm:h-10 relative flex justify-center items-center rounded-xl"
      >
        {displayIcon[gerneratedBy]}
      </div>
      <div
        style={{ borderColor: useColor }}
        // The below class is used to set the width of the container. 
        // If widthFull is true, it will take the full width of the container.
        // Else the same as to which user generated the message.
        className={`${widthFull
          ? 'sm:w-full max-h-screen overflow-y-scroll sm:max-w-full overflow-x-scroll'
          : gerneratedBy === 'system'
            ? 'sm:w-1/2'
            : 'sm:max-w-96'
          } w-5/6 border shadow-lg p-3 rounded-3xl ${background} ${textColor}`}
      >
        {children}
        <span style={{ color: useColor, fontSize: '11px' }} className='flex justify-end pt-2'>{date.toDateString()} - {date.toLocaleTimeString()}</span>
      </div>
      {/* <p style={{ color: useColor }} className={`flex text-xs items-center ${gerneratedBy === 'system' ? 'justify-start' : 'justify-end'} mt-3 mx-2`}>
        {new Date().toLocaleTimeString()}
      </p> */}
    </div >

  );
});

Chat.displayName = 'Chat';
