import React, { memo, useContext, useMemo } from 'react'
import { ChatContext } from '../Context';
import { ConversationTyping, HorizontalRule, Table } from '../Reusables';
import { fr, DataFrame } from './../../ml-ts'
// import { DataFrame } from '../../ml-ts/frame';

export const DfInfo: React.FC = memo(() => {
    const { df } = useContext(ChatContext)

    const info = useMemo(() => { if (df instanceof (DataFrame)) return fr.getInfo(df) }, [df])
    if (!df || !info) return null;
    return (
        <>
            <ConversationTyping text={`
            <p>
            Here the info of the dataset provided.
            </p>
            `} />
            <HorizontalRule />
            <Table data={info.data} columns={info.columns} />
        </>
    )
});


DfInfo.displayName = 'DfInfo';