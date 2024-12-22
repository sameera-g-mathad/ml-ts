import React, { memo, useContext } from 'react';
import { ChatContext } from '../Context';
import { Table } from '../Reusables/Table';
export const DisplayDf: React.FC = memo(() => {
  const { df } = useContext(ChatContext);
  return <Table data={df} />;
});

DisplayDf.displayName = 'DisplayDf';
