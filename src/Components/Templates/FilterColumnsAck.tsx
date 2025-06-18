import React, { memo, useEffect } from "react";
import { fr } from "../../ml-ts";
import { Chat } from "../Chat";
import { DisplayDf } from "./DisplayDf";
import { ConversationTyping } from "../Reusables";
import { DropNaPrompt } from "./index";
import { withContext } from "../HOC";
import { consumeContextInterface } from "../../interface";

export interface filterColumnsAckInterface {
    filteredCols: string[]
}

const FilterColumnsAckComponent: React.FC<filterColumnsAckInterface & consumeContextInterface> = memo(({ addDataframe, appendChatComponent, df, filteredCols }) => {
    useEffect(() => {
        addDataframe(fr.filterCols(df, filteredCols));
        // eslint-disable-next-line
    }, [])
    return <ConversationTyping text={`<p className='flex w-full overflow-hidden flex-wrap'>Please filter the dataset and keep the columns: <span >[${filteredCols}]</span></p>`}
        callback={() =>
            appendChatComponent(
                <Chat gerneratedBy="system" widthFull={true}>
                    <DisplayDf componentAfterInfo={<DropNaPrompt />} />
                </Chat>
            )
        }
    />;
});


FilterColumnsAckComponent.displayName = 'FilterColumnsAckComponent'

export const FilterColumnsAck = withContext(FilterColumnsAckComponent, ['addDataframe', 'appendChatComponent', 'df'])