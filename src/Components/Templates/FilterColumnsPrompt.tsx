import React, { memo, useContext, useState } from 'react'
import { ChatContext } from '../Context';
import { Button, ConversationTyping, HorizontalRule } from '../Reusables'
import { FilterColumnsPromptAck } from './index';
import { Chat } from '../Chat';
export const FilterColumnsPrompt: React.FC = memo(() => {
    const { appendChatComponent } = useContext(ChatContext);
    const [displayButtons, setDisplayButtons] = useState(true);
    return (
        <>
            <ConversationTyping text='<p>Do you want to filter or select some columns to continue with?</p>' />
            {
                displayButtons && <span><HorizontalRule />
                    <span>
                        <Button name='Yes' callback={() => { appendChatComponent(<Chat gerneratedBy='user'><FilterColumnsPromptAck decision='yes' /></Chat>); setDisplayButtons(false) }} />
                        <Button name='no' callback={() => { appendChatComponent(<Chat gerneratedBy='user'><FilterColumnsPromptAck decision='no' /></Chat>); setDisplayButtons(false) }} />
                    </span>
                </span>
            }
        </>
    )
});

FilterColumnsPrompt.displayName = 'FilterColumnsPrompt'