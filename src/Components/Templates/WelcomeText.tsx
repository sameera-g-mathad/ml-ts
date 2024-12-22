import React, { useContext, useState } from 'react';
import {
  Alert,
  Button,
  ConversationTyping,
  HorizontalRule,
} from '../Reusables';
import { ChatContext } from '../Context';
import { TaskEntry } from './TaskEntry';
import { Chat } from '../Chat';
import { RegressionSvg, ClassificationSvg } from '../Svgs';
export const WelcomeText: React.FC = React.memo(() => {
  const [complete, setComplete] = useState(false);
  const { appendChatComponent } = useContext(ChatContext);
  return (
    <div className="flex-col leading-7 text-sm sm:text-md">
      <ConversationTyping
        text={`
            <span class='font-bold text-md sm:text-lg'>Welcome to chat(ML)! 🤖💬</span>
            <br>
            <p>
              We're thrilled to have you here! At chatML, you can dive into machine learning directly in your browser, 
              no backend required. Our platform uses <b>Numts</b>, a 2D NumPy variant for TypeScript, 
              to bring powerful machine learning tools to the frontend. This means all computations and models run client-side,
              allowing you to experiment, learn, and build without needing a separate server.
            </p>
            <p>
            Whether you're just starting with machine learning or you're a seasoned pro, ML-Chat makes it easy to 
            interact with models, run experiments, and explore the fascinating world of AI—all in a conversational format.
            </p>

            <ul class='list-inside list-disc'><b>What can you do here?</b>
              <li>Build and train machine learning models directly in TypeScript.</li>
              <li>Use interactive conversations to query and experiment with your models.</li>
              <li>Explore built-in tools and algorithms to get hands-on experience.</li>
            </ul>
            <p>
            Let’s get started! Type your question or request, and we'll help you navigate through the world of machine learning. 
            Feel free to ask about anything—from basic concepts to complex models. ✨
            </p>          
`}
        speed={1.5}
        callback={() => setComplete(true)}
      />
      {complete && (
        <div>
          <Alert type="note">Everything here is manually generated.</Alert>
          <HorizontalRule />
          <span className="font-medium my-1">
            {' '}
            What are you here for today?{' '}
          </span>
          <span className="flex">
            <Button
              name="Classification"
              icon={true}
              iconComponent={() => <ClassificationSvg />}
              callback={() =>
                appendChatComponent(
                  <Chat gerneratedBy="user">
                    <TaskEntry task="Classification" />
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
