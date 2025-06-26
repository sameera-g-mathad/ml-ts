import React, { memo } from 'react';
import Test from './Test';
// import { Home } from './Components';
// import { ThemeContextProvider } from './Context/ThemeContext';
import './App.css';
const App: React.FC = memo(() => {
  return (
    <Test />
    // <ThemeContextProvider>
    //   <Home />
    // </ThemeContextProvider>
  );
});

App.displayName = 'App';

export default App;
