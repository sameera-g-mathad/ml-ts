import React, { memo } from 'react'
import { ConditionalDisplay, ConversationTyping, SelectionPrompt } from '../Reusables'
import { Chat } from '../Components/Chat';
import { consumeContextInterface } from '../interface';
import { systemPromptInterface, systemPromptAckInterface } from './interface'
import { withContext } from '../HOC';

const SystemPromptComponent: React.FC<consumeContextInterface & systemPromptInterface> = memo(({ appendChatComponent, renderInterface, systemMessage }) => {
    return (
        <>
            <ConversationTyping text={systemMessage} />
            <ConditionalDisplay>
                <SelectionPrompt
                    onYes={
                        () => appendChatComponent(
                            <Chat gerneratedBy='user'>
                                <SystemPromptAck message={renderInterface['yes']['message']} renderComponent={renderInterface['yes']['renderComponent']} />
                            </Chat>)}
                    onNo={
                        () => appendChatComponent(
                            <Chat gerneratedBy='user'>
                                <SystemPromptAck message={renderInterface['no']['message']} renderComponent={renderInterface['no']['renderComponent']} />
                            </Chat>
                        )}
                />
            </ConditionalDisplay>
        </>
    )
});

SystemPromptComponent.displayName = 'SystemPromptComponent'

export const SystemPrompt = withContext(SystemPromptComponent, ['appendChatComponent'])



const SystemPromptAckComponent: React.FC<systemPromptAckInterface & consumeContextInterface> = memo(({ appendChatComponent, message, renderComponent }) => {
    return (
        <ConversationTyping text={message} callback={() => { appendChatComponent(<Chat gerneratedBy='system'>{renderComponent}</Chat>) }} />
    )
})

SystemPromptAckComponent.displayName = 'SystemPromptAckComponent'

const SystemPromptAck = withContext(SystemPromptAckComponent, ['appendChatComponent'])