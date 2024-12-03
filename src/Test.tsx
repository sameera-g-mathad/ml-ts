import React from 'react';
import { nt } from './ml-ts/numts';
const Test: React.FC = () => {
  const a = nt.array([[1, 2, 3]]);
  const b = nt.array([[4, 5, 6]]);
  let c = nt.dot(a, b.T);
  console.log(c);
  return <div>{`dot: ${c.shape}`}</div>;
};

Test.displayName = 'Test';

export default Test;
