import React, { memo, useState } from 'react'
import { Button } from '../Reusables';

interface filterColumnsInterface {
    columns: string[];
}
export const FilterColumns: React.FC<filterColumnsInterface> = memo(({ columns }) => {
    const [initialCols, setInititalCols] = useState<string[]>(columns)
    const [filteredCols, setFilteredCols] = useState<string[]>([]);


    const dragFromSource = (e: React.DragEvent<HTMLDivElement>, column: string | number) => {
        e.dataTransfer?.setData('column', String(column))
    }
    const dropFromSource = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let column = e.dataTransfer.getData('column');
        setFilteredCols(prevFilteredCols => [...prevFilteredCols, column])
        setInititalCols(prevInitialCols => prevInitialCols.filter(el => el !== column))
    }

    const resetAll = () => {
        setInititalCols([...columns])
        setFilteredCols([]);
    }

    const moveAll = () => {
        setInititalCols([])
        setFilteredCols([...columns]);
    }

    return (
        <div className='flex justify-between'>
            <div className='border rounded w-64'>
                {
                    initialCols.map(
                        (el, index) =>
                            <div
                                className='border-b p-1'
                                draggable onDragStart={(e) => dragFromSource(e, el)}
                                key={index}>{el}
                            </div>
                    )
                }
            </div>
            <span className='flex flex-col justify-center gap-2'>
                <Button name='Reset' callback={resetAll} />
                <Button name='move all' callback={moveAll} />
            </span>
            <div className='border rounded w-64' onDragOver={(e) => e.preventDefault()} onDrop={(e) => dropFromSource(e)}>
                {
                    filteredCols.map((el, index) => <div className='border-b p-1' key={index}>{el}</div>)
                }
            </div>
        </div >
    )
})

FilterColumns.displayName = 'FilterColumns'
