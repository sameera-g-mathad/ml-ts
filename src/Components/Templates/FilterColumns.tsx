import React, { memo, useCallback, useState } from 'react'
import { Button, ConditionalDisplay, ConversationTyping, DraggableContainer, HorizontalRule } from '../Reusables';
import { Chat } from '../Chat';
import { FilterColumnsAck } from './FilterColumnsAck';
import { consumeContextInterface } from '../../interface';
import { withContext } from '../HOC';


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


