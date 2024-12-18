import React, { memo, useContext } from 'react';
import { ChatContext } from '../Context';
import { ConversationTyping } from '../Reusables';
import { Chat } from '../Chat';
import { FileUpload } from './FileUpload';
import { taskInterface } from '../../interface';
export const TaskSelection: React.FC<taskInterface> = memo(({ task }) => {
  const { appendChatComponent } = useContext(ChatContext);
  const taskSelected = {
    Regression: [
      'Regression is a statistical technique used to model the relationship between one or more independent variables (also called predictors or features) and a dependent variable (also called the target or response). The goal of regression is to predict the dependent variable based on the values of the independent variables.',
    ],
    Classification: [
      'Classification is a type of supervised machine learning task where the goal is to predict the category or class label of an input based on its features. Unlike regression, which predicts continuous values, classification deals with discrete labels.',
    ],
  };
  return (
    <ConversationTyping
      text={taskSelected[task][0]}
      callback={() =>
        appendChatComponent(
          <Chat gerneratedBy="system">
            <FileUpload />
          </Chat>
        )
      }
    />
  );
});

TaskSelection.displayName = 'TaskSelection';
