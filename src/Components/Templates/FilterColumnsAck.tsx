import React, { memo, useContext, useEffect } from "react";
import { fr } from "../../ml-ts";
import { ChatContext } from '../Context';
import { Chat } from "../Chat";
import { DisplayDf } from "./DisplayDf";
import { ConversationTyping } from "../Reusables";

export interface filterColumnsAckInterface {
    filteredCols: string[]
}

export const FilterColumnsAck: React.FC<filterColumnsAckInterface> = memo(({ filteredCols }) => {
    const { df, addDataframe, appendChatComponent } = useContext(ChatContext);
    useEffect(() => {
        addDataframe(fr.filterCols(df, filteredCols));
    }, [])
    return <ConversationTyping text={`<p className='flex w-full overflow-hidden flex-wrap'>Please filter the dataset and keep the columns: <span >[${filteredCols}]</span></p>`}
        callback={() =>
            appendChatComponent(
                <Chat gerneratedBy="system" widthFull={true}>
                    <DisplayDf />
                </Chat>
            )
        }
    />;
});


FilterColumnsAck.displayName = 'FilterColumnsAck'