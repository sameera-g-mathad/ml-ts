// import React, { memo } from 'react';
// import { DropNa, FillNaPrompt } from './index';
// import { ConditionalDisplay, ConversationTyping, SelectionPrompt } from '../Reusables'
// import { Chat } from '../Components/Chat';
// import { consumeContextInterface } from '../interface';
// import { withContext } from '../HOC';
// const DropNaPromptComponent: React.FC<consumeContextInterface> = memo(({ appendChatComponent }) => {
//     return (
//         <>
//             <ConversationTyping text='Do you want to drop undefined values' />
//             <ConditionalDisplay>
//                 <SelectionPrompt onYes={() => appendChatComponent(<Chat gerneratedBy='user'><DropNaPromptAck /></Chat>)} onNo={() => appendChatComponent(<Chat gerneratedBy='user'><FillNaPrompt /></Chat>)} />
//             </ConditionalDisplay>
//         </>
//     )
// })

// DropNaPromptComponent.displayName = 'DropNaPromptComponent'

// export const DropNaPrompt = withContext(DropNaPromptComponent, ['appendChatComponent'])


// const DropNaPromptAckComponent: React.FC<consumeContextInterface> = memo(({ appendChatComponent }) => {
//     return <ConversationTyping text='I would like to go with dropna.' callback={() => appendChatComponent(<Chat gerneratedBy='system'><DropNa /></Chat>)} />
// })


// const DropNaPromptAck = withContext(DropNaPromptAckComponent, ['appendChatComponent'])

import React from "react";
import { SystemPrompt } from "./SystemPrompt";
import { DropNa, FillNaPrompt } from './index'
import { systemPromptRenderType } from "./interface";
export const DropNaPrompt = () => {
    const systemMessage = 'Do you want to drop undefined values'
    const renderUI: systemPromptRenderType = {
        'yes': {
            'message': 'I would like to go with dropna.',
            'renderComponent': <DropNa />
        },
        'no': {
            'message': "No, I don't want to drop any values, I want to proceed",
            'renderComponent': <FillNaPrompt />
        }
    }
    return <SystemPrompt systemMessage={systemMessage} renderInterface={renderUI} />;
};
