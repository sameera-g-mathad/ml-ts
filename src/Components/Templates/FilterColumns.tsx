import React, { memo, useCallback, useContext, useState } from 'react'
import { ChatContext } from '../Context';
import { Button, ConversationTyping, DraggableContainer, HorizontalRule } from '../Reusables';
import { Chat } from '../Chat';
import { FilterColumnsAck } from './FilterColumnsAck';


export const FilterColumns: React.FC = memo(() => {
    const { df, appendChatComponent } = useContext(ChatContext)
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
            <HorizontalRule />
            <span className='flex justify-center gap-5'>
                <DraggableContainer data={initialCols} draggable={true} onDragStart={dragFromSource} />
                <span className='flex flex-col justify-center gap-2'>
                    <Button name='Reset' callback={resetAll} />
                    <Button name='move all' callback={moveAll} />
                </span>
                <DraggableContainer data={filteredCols} draggable={false} onDrop={dropFromSource} />
            </span>
            <HorizontalRule />
            <Button name='filter' callback={() => appendChatComponent(<Chat gerneratedBy='user'><FilterColumnsAck filteredCols={filteredCols} /></Chat>)} />
        </div >
    )
})

FilterColumns.displayName = 'FilterColumns'
