import React, { memo, useContext } from 'react';
import { ChatContext } from './Context';
// import { Button } from './Reusables';
// import { Chat } from './Chat';
// import { WelcomeText } from './Templates';
// import { GeneratedBy } from '../interface';
export const Content: React.FC = memo(() => {
  const { chatComponents } = useContext(ChatContext);
  return (
    <div className="web-content w-full overflow-y-scroll">
      {/* <Button
        name="System"
        callback={() =>
          appendChatComponent(
            <Chat gerneratedBy={GeneratedBy.system}>
              <WelcomeText />
            </Chat>
          )
        }
      />
      <Button
        name="User"
        callback={() =>
          appendChatComponent(
            <Chat gerneratedBy={GeneratedBy.user}>
              <WelcomeText />
            </Chat>
          )
        }
      /> */}
      <div>{chatComponents}</div>
    </div>
  );
});

Content.displayName = 'Content';
