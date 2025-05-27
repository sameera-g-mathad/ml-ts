import React, { memo, useContext, useMemo, useRef } from 'react';
import { ChatContext } from '../Context';
import { ConversationTyping } from '../Reusables';
import { Chat } from '../Chat';
import { TaskSelection } from './index';
import { taskInterface } from '../../interface';

/**
 * TaskEntry component is responsible for displaying a typing animation
 * and then rendering the TaskSelection component based on the task provided.
 * 
 * @param {taskInterface} task - The task to be executed.
 * @returns {JSX.Element} - The rendered component.
 */
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
  // Randomly select a reply from the list of replies.
  const reply = useRef(
    replies[Math.floor(Math.random() * replies.length)].replace(
      '[classification/regression]',
      `<b>${task}</b>`
    )
  );

  const taskEntry = useMemo(() =>
    <ConversationTyping
      text={reply.current}
      speed={3}
      callback={() =>
        updateTaskAndAppendChat(
          task,
          <Chat gerneratedBy="system">
            <TaskSelection task={task} />
          </Chat>
        )
      }
    />, [])

  return taskEntry;
});

TaskEntry.displayName = 'TaskEntry';
