import React, { memo, useContext, useRef } from 'react';
import { ChatContext } from '../Context';
import { ConversationTyping } from '../Reusables';
import { Chat } from '../Chat';
import { TaskSelection } from './index';
import { taskInterface } from '../../interface';

export const TaskEntry: React.FC<taskInterface> = memo(({ task }) => {
  const { updateTaskAndAppendChat } = useContext(ChatContext);
  const replies = [
    'Can you run a [classification/regression] task for me?',
    'I want to try out a [classification/regression] model. Can you help me run it?',
    'Can you execute a [classification/regression] model for a new task?',
    'Please run a [classification/regression] model and show me the results.',
    'I’d like to test a [classification/regression] model. Can you run it for me?',
    'Can you execute the [classification/regression] process and show the predictions?',
    'Please run the [classification/regression] model and tell me what the outcome is.',
    'Can you perform a [classification/regression] analysis and display the results?',
  ];
  const reply = useRef(
    replies[Math.floor(Math.random() * replies.length)].replace(
      '[classification/regression]',
      `<b>${task}</b>`
    )
  );
  return (
    <ConversationTyping
      text={reply.current}
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
