import React, { memo } from 'react';
import { DropNa } from './DropNa';
import { ConditionalDisplay, ConversationTyping, SelectionPrompt } from '../Reusables'
import { Chat } from '../Components/Chat';
import { consumeContextInterface } from '../interface';
import { withContext } from '../HOC';
const DropNaPromptComponent: React.FC<consumeContextInterface> = memo(({ appendChatComponent }) => {
    return (
        <>
            <ConversationTyping text='Do you want to drop undefined values' />
            <ConditionalDisplay>
                <SelectionPrompt onYes={() => appendChatComponent(<Chat gerneratedBy='user'><DropNaPromptAck /></Chat>)} onNo={() => console.log('No')} />
            </ConditionalDisplay>
        </>
    )
})

DropNaPromptComponent.displayName = 'DropNaPromptComponent'

export const DropNaPrompt = withContext(DropNaPromptComponent, ['appendChatComponent'])


const DropNaPromptAckComponent: React.FC<consumeContextInterface> = memo(({ appendChatComponent }) => {
    return <ConversationTyping text='I would like to go with dropna.' callback={() => appendChatComponent(<Chat gerneratedBy='system'><DropNa /></Chat>)} />
})


const DropNaPromptAck = withContext(DropNaPromptAckComponent, ['appendChatComponent'])