import React, { useContext, useState } from 'react';
import { Button, ConversationTyping, HorizontalRule } from '../Reusables';
import { ChatContext } from '../Context';
import { TaskEntry } from './TaskEntry';
import { Chat } from '../Chat';
import { RegressionSvg, ClassificationSvg } from '../Svgs';

/**
 * This is the WelcomeText component of the application.
 * It contains the welcome message and the options for the user to choose from.
 * It uses the ChatContext to manage the chat components.
 * The chat components are displayed in a scrollable container.
 */
export const WelcomeText: React.FC = React.memo(() => {
  const [complete, setComplete] = useState(false);
  const { appendChatComponent } = useContext(ChatContext);
  return (
    <div className="flex-col leading-7 text-sm sm:text-md">
      {/* Conversational Typing prints the sentences in conversation style mimicing llms */}
      <ConversationTyping
        text={`
            <span class='font-bold text-md sm:text-lg'>Welcome to chat(ML)! 🤖💬</span>
            <br>
            <p>
             Let’s get started! Type your question or request, and we'll help you navigate through the world of machine learning.
            Feel free to ask about anything—from basic concepts to complex models. ✨
            </p>          
`}
        speed={1.5}
        callback={() => setComplete(true)}
      />
      {/*Once the conversation is complete display the next block */}
      {complete && (
        <div>
          {/* <Alert type="note">Everything here is manually generated.</Alert> */}
          <HorizontalRule />
          <span className="font-medium my-1">
            {' '}
            What are you here for today?{' '}
          </span>
          {/* This block below displays two buttons that allows user to select either "classification" or "regression" */}
          <span className="flex">
            <Button
              name="Classification"
              icon={true}
              iconComponent={() => <ClassificationSvg />}
              callback={() =>
                appendChatComponent(
                  <Chat gerneratedBy="user">
                    <TaskEntry
                      task="Classification"
                      key={new Date().getTime()}
                    />
                  </Chat>
                )
              }
            />
            <Button
              name="Regression"
              icon={true}
              iconComponent={() => <RegressionSvg />}
              callback={() =>
                appendChatComponent(
                  <Chat gerneratedBy="user">
                    <TaskEntry task="Regression" />
                  </Chat>
                )
              }
            />
          </span>
        </div>
      )}
    </div>
  );
});

WelcomeText.displayName = 'WelcomeText';
