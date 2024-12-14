import React from 'react';
import { ConversationTyping } from '../Reusables';
export const WelcomeText: React.FC = React.memo(() => {
  return (
    <ConversationTyping
      text={`<b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
<ol class="list-disc list-inside"> Sameer
<li> <i>Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</i></li>
<li> Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.</li>
<li> Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.</li>
<li> Vestibulum lacinia arcu eget nulla.</li>
</ol>
<h2> Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. <u>Maecenas tempus</u>  , tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</h2> 

<ul>
<li> Vivamus cursus risus non dui convallis, vel tincidunt arcu blandit.</li>
<li> Nulla facilisi. Etiam vel felis sit amet erat lacinia auctor.</li>
<li> Fusce aliquet nec purus non venenatis. This is good </li>
</ul>

Donec sonme when or lectus augue, dapibus a vehicula non, porttitor  this is good eu ante. Sed tempor massa vitae enim consequat, ac sodales metus ultricies.
`}
      speed={2}
    />
  );
});

WelcomeText.displayName = 'WelcomeText';
