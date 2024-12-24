import React, { memo, useContext, useState } from 'react';
import { ChatContext } from '../Context';
import { Table } from '../Reusables/Table';
import { ConversationTyping } from '../Reusables';
export const DisplayDf: React.FC = memo(() => {
  const { df } = useContext(ChatContext);
  const [complete, setComplete] = useState(false);
  return (
    <div>
      <ConversationTyping
        text={`The data you provided consists of a shape of <b>(${df.shape})</b> with ${df.shape[0]} rows and ${df.shape[1]} columns. If I find that 
      there are any discripancies in the data, I am highlighting them.`}
        callback={() => setComplete(true)}
      />
      {complete && <Table data={df} key={new Date().getTime()} />}
    </div>
  );
});

DisplayDf.displayName = 'DisplayDf';
