import React, { memo, useContext } from 'react'
import { ChatContext } from '../Context';
import { ConversationTyping, SelectionPrompt } from '../Reusables'
import { FilterColumnsPromptAck } from './index';
import { Chat } from '../Chat';
export const FilterColumnsPrompt: React.FC = memo(() => {
    const { appendChatComponent } = useContext(ChatContext);
    return (
        <>
            <ConversationTyping text='<p>Do you want to filter or select some columns to continue with?</p>' />
            <SelectionPrompt
                onYes={() => appendChatComponent(<Chat gerneratedBy='user'><FilterColumnsPromptAck decision='yes' /></Chat>)}
                onNo={() => appendChatComponent(<Chat gerneratedBy='user'><FilterColumnsPromptAck decision='no' /></Chat>)}
            />

        </>
    )
});

FilterColumnsPrompt.displayName = 'FilterColumnsPrompt'