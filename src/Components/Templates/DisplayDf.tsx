import React, { memo, useContext, useMemo, useRef, useState } from 'react';
import { ChatContext } from '../Context';
import { ConversationTyping, HorizontalRule, TableGroup } from '../Reusables';
import { Chat } from '../Chat';
import { DfInfo } from './index';

export const DisplayDf: React.FC = memo(() => {
  const { df, appendChatComponent } = useContext(ChatContext);
  const [complete, setComplete] = useState(false)

  const memoisedDf = useRef(df).current;
  const memoisedConversation = useMemo(() => <ConversationTyping
    text={`The data you provided consists of a shape of <b>(${memoisedDf.shape})</b> with ${memoisedDf.shape[0]} rows and ${memoisedDf.shape[1]} columns. If I find that 
      there are any discripancies in the data, I am highlighting them.`}
    callback={() => {
      setComplete(true)
      appendChatComponent(
        <Chat gerneratedBy="system">
          <DfInfo />
        </Chat>
      );
    }}
  />, [])
  return (
    <div>
      {memoisedConversation}
      {complete &&
        <div>
          <HorizontalRule />
          <TableGroup df={memoisedDf} requireColumnFilter={true} requireRowFilter={true} />
        </div>
      }
    </div>
  );
});

DisplayDf.displayName = 'DisplayDf';
