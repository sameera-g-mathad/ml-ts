import React, { memo, useContext } from 'react';
import { ChatContext } from '../Context';
import { ConversationTyping } from '../Reusables';
import { Chat } from '../Chat';
import { TaskSelection } from './index';
import { taskInterface } from '../../interface';

export const TaskEntry: React.FC<taskInterface> = memo(({ task }) => {
  const { updateTaskAndAppendChat } = useContext(ChatContext);
  return (
    <ConversationTyping
      text={`I am asking for ${task}`}
      speed={3}
      callback={() =>
        updateTaskAndAppendChat(
          task,
          <Chat gerneratedBy="system">
            <TaskSelection task={task} key={new Date().getTime()} />
          </Chat>
        )
      }
    />
  );
});

TaskEntry.displayName = 'TaskEntry';
