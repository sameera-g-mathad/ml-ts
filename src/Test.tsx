import React from 'react';
import { nt } from './ml-ts/numts';
const Test: React.FC = () => {
  const a = nt.array([
    [1, 2, 3],
    [2, 3, 4],
    [9, 6, 7],
  ]);
  const b = nt.array([
    [1, 2, 3],
    [2, 3, 4],
    [3, 6, 7],
  ]);

  console.log(nt.dot(a, b));
  return <div>{`dot: ${a.shape}`}</div>;
};

Test.displayName = 'Test';

export default Test;
