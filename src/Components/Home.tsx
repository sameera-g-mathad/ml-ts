import React, { memo, useContext, useMemo } from 'react';
import { Navbar, Content } from './index';
import { ThemeContext, ChatContextProvider } from './Context';


/**
 * This is the main component of the application.
 * It contains the Navbar and the Content components.
 * It uses the ThemeContext to set the background color of the container.
 * The background color changes based on the theme selected (light or dark).
 * The ChatContextProvider is used to provide the chat context to the Content component.
 * The Content component contains the main functionality of the application.
 * 
 *
 */
export const Home: React.FC = memo(() => {
  // Use themecontext to extract the theme
  // and set the background color of the container
  const { theme } = useContext(ThemeContext);

  // Memoizing the content to prevent re-renders during theme changes.
  const content = useMemo(() => {
    return <Content />
  }, [])
  return (
    <div
      className={`web-container transition duration-300 ease-in-out ${theme === 'light' ? 'bg-stone-100' : 'bg-gray-900'
        }`}
    >
      {/* Make sure Navbar is displayed on the top always*/}
      <Navbar />
      {/* ChatContextProvider is added here to prevent re-renders of the Home component.*/}
      <ChatContextProvider>
        {content}
      </ChatContextProvider>
    </div>
  );
});

Home.displayName = 'Home';
