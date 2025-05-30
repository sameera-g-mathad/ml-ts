import React, { memo, useContext } from 'react';
import { ChatContext } from '../Context';
import { ConversationTyping, SelectionPrompt } from '../Reusables'
import { Chat } from '../Chat';
export const DropNaPrompt: React.FC = memo(() => {
    const { appendChatComponent } = useContext(ChatContext)
    return (
        <>
            <ConversationTyping text='Do you want to drop undefined values' />
            <SelectionPrompt onYes={() => appendChatComponent(<Chat gerneratedBy='user'><DropNaPromptAck /></Chat>)} onNo={() => console.log('No')} />
        </>
    )
})

DropNaPrompt.displayName = 'DropNaPrompt'


const DropNaPromptAck: React.FC = memo(() => {
    return <ConversationTyping text='I would like to go with dropna.' />
})