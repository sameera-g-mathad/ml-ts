import React, { memo, useContext, useMemo, useRef } from 'react'
import { ChatContext } from '../Context';
import { ConversationTyping, HorizontalRule, TableGroup } from '../Reusables';
import { fr, DataFrame } from './../../ml-ts'
import { Chat } from '../Chat';
import { FilterColumnsPrompt } from './FilterColumnsPrompt';
// import { DataFrame } from '../../ml-ts/frame';

export interface displayDfInterface {
    componentAfterInfo: React.ReactNode
}

export const DfInfo: React.FC<displayDfInterface> = memo(({ componentAfterInfo }) => {
    const { df, appendChatComponent } = useContext(ChatContext)

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


DfInfo.displayName = 'DfInfo';