import React, { memo, useMemo, useRef, useState } from 'react';
import { ConversationTyping, HorizontalRule, TableGroup } from '../Reusables';
import { Chat } from '../Components/Chat';
import { DfInfo } from './index';
import { withContext } from '../HOC';
import { consumeContextInterface } from '../interface';
import { displayDfInfoInterface } from './interface'

/**
 * Template - 6
 * DisplayDf component is responsible for displaying the shape of the DataFrame and rendering a table with the data.
 * It also includes a typing animation that describes the shape of the DataFrame.
 */
const DisplayDfComponent: React.FC<displayDfInfoInterface & consumeContextInterface> = memo(({ appendChatComponent, componentAfterInfo, df }) => {
  const [complete, setComplete] = useState(false);
  const memoisedDf = useRef(df).current;
  const memoisedConversation = useMemo(() => <ConversationTyping
    text={`The data you provided consists of a shape of <b>(${memoisedDf.shape})</b> with ${memoisedDf.shape[0]} rows and ${memoisedDf.shape[1]} columns. If I find that 
      there are any discripancies in the data, I am highlighting them.`}
    callback={() => {
      setComplete(true)
      appendChatComponent(
        <Chat gerneratedBy="system" widthFull={true}>
          <DfInfo componentAfterInfo={componentAfterInfo} />
        </Chat>
      );
    }}
  //eslint-disable-next-line
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

DisplayDfComponent.displayName = 'DisplayDfComponent';
export const DisplayDf = withContext(DisplayDfComponent, ['appendChatComponent', 'df'])
