import React, { memo, useState } from 'react';
import { Button, ConditionalDisplay, ConversationTyping } from '../Reusables';
import { withContext } from '../HOC';
import { TaskEntry } from './TaskEntry';
import { Chat } from '../Components/Chat';
import { RegressionSvg, ClassificationSvg } from '../Svgs';
import { consumeContextInterface } from '../interface';

/**
 * Template - 1
 * This is the WelcomeText component of the application.
 * It contains the welcome message and the options for the user to choose from.
 * It uses the ChatContext to manage the chat components.
 * The chat components are displayed in a scrollable container.
 */
const WelcomeTextComponent: React.FC<consumeContextInterface> = memo((props) => {
  const [complete, setComplete] = useState(false);
  // console.log('Inside WelcomeText')
  // console.log(props)
  // return <TabSelecter tabs={['one', 'two', 'three']} name='tabs' callback={() => null} />
  return <div className="flex-col leading-7 text-sm sm:text-md">
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
    {
      complete && (
        <ConditionalDisplay>
          <span>
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
                callback={() => {
                  props.appendChatComponent(
                    <Chat gerneratedBy="user">
                      <TaskEntry
                        task="Classification"
                      />
                    </Chat>
                  )
                  // setDisplayButtons(false);
                }}
              />
              <Button
                name="Regression"
                icon={true}
                iconComponent={() => <RegressionSvg />}
                callback={() => {
                  props.appendChatComponent(
                    <Chat gerneratedBy="user">
                      <TaskEntry task="Regression" />
                    </Chat>
                  )
                  // setDisplayButtons(false);
                }}
              />
            </span>
          </span>
        </ConditionalDisplay>
      )}
    {/* eslint-disable-next-line */}
  </div>
});

WelcomeTextComponent.displayName = 'WelcomeTextComponent';

export const WelcomeText = withContext(WelcomeTextComponent, ['appendChatComponent'])