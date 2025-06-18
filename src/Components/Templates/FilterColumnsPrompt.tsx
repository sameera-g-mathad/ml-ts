import React, { memo } from 'react'
import { ConditionalDisplay, ConversationTyping, SelectionPrompt } from '../Reusables'
import { FilterColumnsPromptAck } from './index';
import { Chat } from '../Chat';
import { consumeContextInterface } from '../../interface';
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