import React, { memo } from 'react'
import { ConversationTyping } from '../Reusables'
import { FilterColumns } from './FilterColumns'
import { Chat } from '../Chat'
import { DropNaPrompt } from './DropNaPrompt'
import { consumeContextInterface } from '../../interface'
import { withContext } from '../HOC'
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

export const FilterColumnsPromptAck = withContext(FilterColumnsPromptAckComponent, ['appendChatComponent'])