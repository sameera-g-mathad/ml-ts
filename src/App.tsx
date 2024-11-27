import React from 'react';
import { Numts } from './ml-ts/numts';
const App: React.FC = () => {
  const a = new Numts([[1, 2, 3, 'asa']]);
  const [row, col] = a.shape;
  console.log(a, a.T);
  return <div>{`Shape: (${row}, ${col})`}</div>;
};

App.displayName = 'App';

export default App;
