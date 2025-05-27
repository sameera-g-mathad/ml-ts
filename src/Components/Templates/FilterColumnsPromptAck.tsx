import React, { memo, useContext } from 'react'
import { ChatContext } from '../Context'
import { ConversationTyping } from '../Reusables'
import { FilterColumns } from './FilterColumns'
import { Chat } from '../Chat'
import { DropNaPrompt } from './DropNaPrompt'
interface filterColumnsPromptAckInterface {
    decision: 'yes' | 'no'
}
export const FilterColumnsPromptAck: React.FC<filterColumnsPromptAckInterface> = memo(({ decision }) => {
    const { appendChatComponent } = useContext(ChatContext)
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

FilterColumnsPromptAck.displayName = 'FilterColumnsPromptAck'