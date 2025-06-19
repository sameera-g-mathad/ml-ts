import React, { memo, useRef } from 'react'
import { ConversationTyping, HorizontalRule, TableGroup } from '../Reusables';
import { fr } from '../ml-ts'
import { Chat } from '../Components/Chat';
import { consumeContextInterface } from '../interface';
import { withContext } from '../HOC';

export interface displayDfInterface {
    componentAfterInfo: React.ReactNode
}

const DfInfoComponent: React.FC<displayDfInterface & consumeContextInterface> = memo(({ appendChatComponent, componentAfterInfo, df }) => {
    const info = useRef(fr.getInfo(df));
    if (!df || !info) return null;
    return (
        <>
            <ConversationTyping text={`
            <p>
            Here the info of the dataset provided.
            </p>
            `} callback={() => appendChatComponent(<Chat gerneratedBy='system'>
                {/* <FilterColumnsPrompt />
                 */}
                {componentAfterInfo}
            </Chat>)} />
            <HorizontalRule />
            <TableGroup df={info.current} requireRowFilter={true} />
        </>
    )
});


DfInfoComponent.displayName = 'DfInfoComponent';

export const DfInfo = withContext(DfInfoComponent, ['appendChatComponent', 'df'])