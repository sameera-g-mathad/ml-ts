import React from 'react';
import { ConversationTyping } from './Reusables';
import { Chat } from './Chat';

export const Content: React.FC = () => {
  return (
    <div className="web-content bg-fuchsia-300 w-full overflow-y-scroll">
      <Chat>
        <ConversationTyping
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

\n\t- Nulla facilisi. 
- Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
- Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
- Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. 
- Vestibulum lacinia arcu eget nulla. 

Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. 

- Vivamus cursus risus non dui convallis, vel tincidunt arcu blandit. 
- Nulla facilisi. Etiam vel felis sit amet erat lacinia auctor. 
- Fusce aliquet nec purus non venenatis. 

Donec lectus augue, dapibus a vehicula non, porttitor eu ante. Sed tempor massa vitae enim consequat, ac sodales metus ultricies.
`}
          speed={10}
        />
      </Chat>
    </div>
  );
};

Content.displayName = 'Content';
