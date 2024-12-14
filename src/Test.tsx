import React from 'react';
import { nt } from './ml-ts/numts';
const Test: React.FC = () => {
  const a = nt.array([
    [1, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]);
  console.log(nt.exp(a));
  return <div>{`${nt.log2(a)}`}</div>;
};

Test.displayName = 'Test';

export default Test;
