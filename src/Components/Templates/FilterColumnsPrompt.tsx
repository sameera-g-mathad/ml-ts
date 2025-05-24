import React from 'react'
import { ConversationTyping } from '../Reusables'
export const FilterColumnsPrompt: React.FC = () => {
    return (
        <><ConversationTyping text='<p>Do you want to filter or select some columns to continue with?</p>' /></>
    )
}

FilterColumnsPrompt.displayName = 'FilterColumnsPrompt'