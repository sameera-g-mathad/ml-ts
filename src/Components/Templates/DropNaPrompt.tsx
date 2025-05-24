import React from 'react'
import { ConversationTyping } from '../Reusables'
export const DropNaPrompt: React.FC = () => {
    return (
        <>
            <ConversationTyping text='Do you want to drop undefined values' />
        </>
    )
}

DropNaPrompt.displayName = 'DropNaPrompt'