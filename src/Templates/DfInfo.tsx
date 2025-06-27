import React, { memo, useRef } from 'react'
import { ConversationTyping, HorizontalRule, TableGroup } from '../Reusables';
import { fr } from '../ml-ts'
import { Chat } from '../Components/Chat';
import { consumeContextInterface } from '../interface';
import { displayDfInterface } from './interface'
import { withContext } from '../HOC';
import { TabSelector } from '../Components/TabSelector';


const DfInfoComponent: React.FC<displayDfInterface & consumeContextInterface> = memo(({ appendChatComponent, componentAfterInfo, df }) => {
    const info = useRef(fr.getInfo(df));
    const describe = useRef(fr.describe(df))
    if (!df || !info || !describe) return null;
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
            {describe.current ?
                <TabSelector
                    name='info-descrbe'
                    tabs={['info', 'describe']}
                    renderComponents={
                        [
                            <TableGroup df={info.current} requireRowFilter={true} />,
                            <TableGroup df={describe.current} requireRowFilter={false} />
                        ]} />
                : <TableGroup df={info.current} requireRowFilter={true} />

            }
        </>
    )
});


DfInfoComponent.displayName = 'DfInfoComponent';

export const DfInfo = withContext(DfInfoComponent, ['appendChatComponent', 'df'])