import React, { memo, useCallback, useEffect, useState } from 'react'
import { Button, ConditionalDisplay, ConversationTyping, DraggableContainer, HorizontalRule } from '../Reusables';
import { Chat } from '../Components/Chat';
import { fr } from "../ml-ts";
import { consumeContextInterface } from '../interface';
import { DisplayDf, DropNaPrompt } from './index';
import { withContext } from '../HOC';

/**
 * Template - 8
 * FilterColumns component is responsible for allowing the user to filter the columns of the DataFrame.
 * It includes a drag and drop interface for selecting the columns to keep or remove, as well as buttons to reset or retain all columns.
 * 
 */
const FilterColumnsComponent: React.FC<consumeContextInterface> = memo(({ appendChatComponent, df }) => {
    const [initialCols, setInititalCols] = useState<string[]>(df.columns)
    const [filteredCols, setFilteredCols] = useState<string[]>([]);


    const dragFromSource = useCallback((e: React.DragEvent<HTMLDivElement>, column: string | number) => {
        e.dataTransfer?.setData('column', String(column))
        // eslint-disable-next-line 
    }, []);
    const dropFromSource = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let column = e.dataTransfer.getData('column');
        setFilteredCols(prevFilteredCols => [...prevFilteredCols, column])
        setInititalCols(prevInitialCols => prevInitialCols.filter(el => el !== column))
        // eslint-disable-next-line 
    }, []);

    const resetAll = useCallback(() => {
        setInititalCols([...df.columns])
        setFilteredCols([]);
        // eslint-disable-next-line 
    }, []);

    const moveAll = useCallback(() => {
        setInititalCols([])
        setFilteredCols([...df.columns]);
        // eslint-disable-next-line 
    }, []);

    return (
        <div>
            <ConversationTyping text='<p>You can filter the columns by selecting them as needed.</p>' />

            <ConditionalDisplay>
                <span className='flex sm:flex-nowrap flex-wrap justify-between gap-5'>
                    <DraggableContainer data={initialCols} draggable={true} onDragStart={dragFromSource} />
                    <span className='flex flex-col justify-center gap-2'>
                        <Button name='Reset' callback={resetAll} conditionalDisplay={false} />
                        <Button name='Retain' callback={moveAll} conditionalDisplay={false} />
                    </span>
                    <DraggableContainer data={filteredCols} draggable={false} onDrop={dropFromSource} />
                </span>
                <HorizontalRule />
                <Button name='filter' callback={() => { appendChatComponent(<Chat gerneratedBy='user'><FilterColumnsAck filteredCols={filteredCols.length > 0 ? filteredCols : initialCols} /></Chat>); }} />
            </ConditionalDisplay>

        </div >
    )
})

FilterColumnsComponent.displayName = 'FilterColumnsComponent'

export const FilterColumns = withContext(FilterColumnsComponent, ['appendChatComponent', 'df'])




interface filterColumnsAckInterface {
    filteredCols: string[]
}

const FilterColumnsAckComponent: React.FC<filterColumnsAckInterface & consumeContextInterface> = memo(({ addDataframe, appendChatComponent, df, filteredCols }) => {
    useEffect(() => {
        addDataframe(fr.filterCols(df, filteredCols));
        // eslint-disable-next-line
    }, [])
    return <ConversationTyping text={`<p className='flex max-w-full overflow-x-hidden flex-wrap'>Please filter the dataset and keep the columns: <span className="max-w-64 overflow-x-hidden truncate">[${filteredCols}]</></p>`}
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

const FilterColumnsAck = withContext(FilterColumnsAckComponent, ['addDataframe', 'appendChatComponent', 'df'])