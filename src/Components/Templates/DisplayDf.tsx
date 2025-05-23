import React, { memo, useCallback, useContext, useState } from 'react';
import { ChatContext } from '../Context';
import { Alert, ConversationTyping, HorizontalRule, Input, InputGroup, Table } from '../Reusables';
import { Chat } from '../Chat';
import { DfInfo } from './index';


export const DisplayDf: React.FC = memo(() => {


  const { df, appendChatComponent } = useContext(ChatContext);
  const [complete, setComplete] = useState(false);
  const [displayFrom, setDisplayFrom] = useState<number>(0);
  const [displayTo, setDisplayTo] = useState<number>(20);

  const handleDisplayFrom = useCallback((value: string) => {
    if (value === '')
      return setDisplayFrom(0);
    let newValue = parseInt(value);
    setDisplayFrom(newValue);
  }, [])

  const handleDisplayTo = useCallback((value: string) => {
    if (value === '')
      return setDisplayTo(0);
    let newValue = parseInt(value);
    setDisplayTo(newValue);
  }, [])

  // Check if df is empty
  if (!df) {
    return null;
  }
  return (
    <div>
      <ConversationTyping
        text={`The data you provided consists of a shape of <b>(${df.shape})</b> with ${df.shape[0]} rows and ${df.shape[1]} columns. If I find that 
      there are any discripancies in the data, I am highlighting them.`}
        callback={() => {
          setComplete(true);
          appendChatComponent(
            <Chat gerneratedBy="system">
              <DfInfo />
            </Chat>
          );
        }}
      />
      {complete &&
        <div>
          <HorizontalRule />
          <Alert type='note'>
            <span>You can use the below input fields to view your data within a range of 100 data points.</span>
          </Alert>
          <span className='flex gap-5 my-2'>
            <InputGroup label='from'>
              <Input defaultValue={displayFrom} size='medium' callback={handleDisplayFrom} />
            </InputGroup>
            <InputGroup label='to'>
              <Input defaultValue={displayTo} size='medium' callback={handleDisplayTo} />
            </InputGroup>
          </span>
          <Table columns={df.columns} data={df.data} displayFrom={displayFrom} displayTo={(displayTo - displayFrom) > 100 ? displayFrom + 100 : displayTo} key={new Date().getTime()} />
        </div>
      }
    </div>
  );
});

DisplayDf.displayName = 'DisplayDf';
