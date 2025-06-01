import React, { memo, useCallback, useContext, useState } from "react";
import { ChatContext } from "../Context";
import { Button, ConversationTyping, DraggableContainer, HorizontalRule, InputGroup, RadioBtn } from "../Reusables";
import { fr } from "../../ml-ts";
import { DisplayDf, DropNaPrompt } from "./index";
import { Chat } from "../Chat";


export const DropNa: React.FC = memo(() => {
    const { df, appendChatComponent, addDataframe } = useContext(ChatContext);
    const getNanColumns = fr.getNanColumns(df)
    const [nanColumns, setNanColumns] = useState<string[]>(getNanColumns);
    const [subsetColumns, setSubsetColumns] = useState<string[]>([]);
    const [how, setHow] = useState<'all' | 'any' | 'subset'>('all')

    const onDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, item: string) => {
        e.dataTransfer.setData('subset', item);
        // eslint-disable-next-line 
    }, [])

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        const item = e.dataTransfer.getData('subset');
        setNanColumns(prevCols => prevCols.filter(el => el !== item))
        setSubsetColumns(prevCols => [...prevCols, item])
        // eslint-disable-next-line 
    }, [])

    const resetAll = useCallback(() => {
        setNanColumns([...getNanColumns])
        setSubsetColumns([]);
        // eslint-disable-next-line 
    }, []);

    return <>
        <ConversationTyping text='Will drop the values as requested.' />
        <HorizontalRule />
        <span className='flex gap-3'>
            <InputGroup label='Drop All'>
                <RadioBtn id='all' name='drop' callback={() => setHow('all')} selected={true} />
            </InputGroup>
            <InputGroup label='Drop Any'>
                <RadioBtn id='any' name='drop' callback={() => setHow('any')} />
            </InputGroup>
            <InputGroup label='Subset'>
                <RadioBtn id='subset' name='drop' callback={() => setHow('subset')} />
            </InputGroup>
        </span>
        {how === 'subset' ?
            <span className="flex sm:flex-nowrap py-3 flex-wrap gap-5">
                <DraggableContainer draggable={true} data={nanColumns} onDragStart={onDragStart} />
                <span className='flex flex-col justify-center gap-2'>
                    <Button name='Reset' callback={resetAll} />
                </span>
                <DraggableContainer draggable={false} data={subsetColumns} onDrop={onDrop} />
            </span> : ''}
        <Button name='Drop' callback={() => {
            addDataframe(fr.dropna(df, how, subsetColumns))
            appendChatComponent(<Chat gerneratedBy="system" widthFull={true}>
                <DisplayDf componentAfterInfo={<DropNaPrompt />} />
            </Chat>)
        }} />
    </>;
})

