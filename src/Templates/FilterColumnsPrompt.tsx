import React, { memo } from 'react'
import { ConditionalDisplay, ConversationTyping, SelectionPrompt } from '../Reusables'
import { DropNaPrompt, FilterColumns } from './index';
import { Chat } from '../Components/Chat';
import { consumeContextInterface } from '../interface';
import { withContext } from '../HOC';
const FilterColumnsPromptComponent: React.FC<consumeContextInterface> = memo(({ appendChatComponent }) => {
    return (
        <>
            <ConversationTyping text='<p>Do you want to filter or select some columns to continue with?</p>' />
            <ConditionalDisplay>
                <SelectionPrompt
                    onYes={() => appendChatComponent(<Chat gerneratedBy='user'><FilterColumnsPromptAck decision='yes' /></Chat>)}
                    onNo={() => appendChatComponent(<Chat gerneratedBy='user'><FilterColumnsPromptAck decision='no' /></Chat>)}
                />
            </ConditionalDisplay>
        </>
    )
});

FilterColumnsPromptComponent.displayName = 'FilterColumnsPromptComponent'

export const FilterColumnsPrompt = withContext(FilterColumnsPromptComponent, ['appendChatComponent'])


interface filterColumnsPromptAckInterface {
    decision: 'yes' | 'no'
}
const FilterColumnsPromptAckComponent: React.FC<filterColumnsPromptAckInterface & consumeContextInterface> = memo(({ appendChatComponent, decision }) => {
    const messages = {
        'yes': 'Yes, help me filter some of the columns.',
        'no': 'No, I am fine with my data, I want to proceed.'
    }
    const systemRender = {
        'yes': <FilterColumns />,
        'no': <DropNaPrompt />
    }
    return (
        <ConversationTyping text={messages[decision]} callback={() => { appendChatComponent(<Chat gerneratedBy='system'>{systemRender[decision]}</Chat>) }} />
    )
})

FilterColumnsPromptAckComponent.displayName = 'FilterColumnsPromptAckComponent'

const FilterColumnsPromptAck = withContext(FilterColumnsPromptAckComponent, ['appendChatComponent'])