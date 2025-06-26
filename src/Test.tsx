import React from 'react';
import { nt } from './ml-ts/numts';
const Test: React.FC = () => {
  const a = nt.array([[25, 55, 1],
  [40, 85, 15],
  [22, 49, 0],
  [35, 75, 10],
  [29, 60, 3],
  [31, 62, 4],
  [45, 90, 20],
  [28, 59, 2],
  [39, 80, 12],
  [33, 66, 5],
  [33, 66, 5]]);
  return <div>{`${nt.quantile(a, 0.25).array}`}</div>;
};

Test.displayName = 'Test';

export default Test;
