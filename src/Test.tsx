import React from 'react';
import { nt } from './ml-ts/numts';
const Test: React.FC = () => {
  const a = nt.array([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]);
  const b = nt.array([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]);

  return <div>{`${nt.log(10)}`}</div>;
};

Test.displayName = 'Test';

export default Test;
