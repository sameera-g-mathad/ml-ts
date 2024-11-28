import React from 'react';
import { nt } from './ml-ts/numts';
const App: React.FC = () => {
  const a = nt.array([
    [1, 2, 3],
    [2, 4, 2],
    [2, 4, 2],
  ]);
  console.log(a);
  const [row, col] = a.shape;
  return <div>{`Shape: (${row}, ${col})`}</div>;
};

App.displayName = 'App';

export default App;
