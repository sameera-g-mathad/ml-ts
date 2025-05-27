import React, { memo, useCallback, useState } from 'react'
import { Button, DraggableContainer } from '../Reusables';

interface filterColumnsInterface {
    columns: string[];
}
export const FilterColumns: React.FC<filterColumnsInterface> = memo(({ columns }) => {
    const [initialCols, setInititalCols] = useState<string[]>(columns)
    const [filteredCols, setFilteredCols] = useState<string[]>([]);


    const dragFromSource = useCallback((e: React.DragEvent<HTMLDivElement>, column: string | number) => {
        e.dataTransfer?.setData('column', String(column))
    }, []);
    const dropFromSource = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let column = e.dataTransfer.getData('column');
        setFilteredCols(prevFilteredCols => [...prevFilteredCols, column])
        setInititalCols(prevInitialCols => prevInitialCols.filter(el => el !== column))
    }, []);

    const resetAll = useCallback(() => {
        setInititalCols([...columns])
        setFilteredCols([]);
    }, []);

    const moveAll = useCallback(() => {
        setInititalCols([])
        setFilteredCols([...columns]);
    }, []);

    return (
        <div className='flex justify-center gap-5'>
            <DraggableContainer data={initialCols} draggable={true} onDragStart={dragFromSource} />
            <span className='flex flex-col justify-center gap-2'>
                <Button name='Reset' callback={resetAll} />
                <Button name='move all' callback={moveAll} />
            </span>
            <DraggableContainer data={filteredCols} draggable={false} onDrop={dropFromSource} />
        </div >
    )
})

FilterColumns.displayName = 'FilterColumns'
