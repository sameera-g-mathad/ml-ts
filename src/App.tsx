import React from 'react';
import { nt } from './ml-ts/numts';
const App: React.FC = () => {
  const a = nt.array([[1, 2, 3]]);
  const b = nt.array([[4, 5, 6]]);
  return <div>{`dot product = ${nt.dot(a.T, b)}`}</div>;
};

App.displayName = 'App';

export default App;
