import React, { memo, useCallback, useReducer } from 'react'
import { Input, InputGroup, Table } from './index'
import { tableGroupInterface } from '../interface'

type STATE = {
    colFrom: number,
    colTo: number,
    rowFrom: number,
    rowTo: number
}

type PAYLOAD =
    | { action: 'setcolFrom', value: number }
    | { action: 'setcolTo', value: number }
    | { action: 'setrowFrom', value: number }
    | { action: 'setrowTo', value: number }

// Reducer function to manage the state of the filters and update the displayed data accordingly.
const displayReducer = (state: STATE, payload: PAYLOAD) => {
    switch (payload.action) {
        case 'setcolFrom': return { ...state, colFrom: payload.value };
        case 'setcolTo': return { ...state, colTo: payload.value };
        case 'setrowFrom': return { ...state, rowFrom: payload.value };
        case 'setrowTo': return { ...state, rowTo: payload.value };
        default: return state;
    }
}

/**
 * TableGroup component is responsible for rendering a table with the data and providing input fields to filter the rows and columns.
 * It uses a reducer to manage the state of the filters and updates the displayed data accordingly.
 */
export const TableGroup: React.FC<tableGroupInterface> = memo(({ df, requireColumnFilter, requireRowFilter }) => {
    console.log(df)
    const [state, dispatch] = useReducer(displayReducer, {
        colFrom: 0,
        colTo: 20,
        rowFrom: 0,
        rowTo: 20
    })
    const handleColFrom = useCallback((value: string) => {
        if (value === '')
            return dispatch({ action: 'setcolFrom', value: 0 });
        let newValue = parseInt(value);
        dispatch({ action: 'setcolFrom', value: newValue });
    }, [])

    const handleColTo = useCallback((value: string) => {
        if (value === '')
            return dispatch({ action: 'setcolTo', value: 0 });
        let newValue = parseInt(value);
        dispatch({ action: 'setcolTo', value: newValue });
    }, [])

    const handleRowFrom = useCallback((value: string) => {
        if (value === '')
            return dispatch({ action: 'setrowFrom', value: 0 });
        let newValue = parseInt(value);
        dispatch({ action: 'setrowFrom', value: newValue });
    }, [])

    const handleRowTo = useCallback((value: string) => {
        if (value === '')
            return dispatch({ action: 'setrowTo', value: 0 });
        let newValue = parseInt(value);
        dispatch({ action: 'setrowTo', value: newValue });
    }, [])
    const { colFrom, colTo, rowFrom, rowTo } = state
    return (
        <div>
            <span className='flex flex-col gap-4 my-2'>
                {requireRowFilter &&
                    <FilterTableData heading='Rows' axisFrom={rowFrom} axisTo={rowTo} handleFrom={handleRowFrom} handleTo={handleRowTo} />
                }
                {requireColumnFilter &&
                    <FilterTableData heading='Columns' axisFrom={colFrom} axisTo={colTo} handleFrom={handleColFrom} handleTo={handleColTo} />
                }
            </span>
            <Table
                columns={df.columns}
                data={df.data}
                colFrom={colFrom}
                colTo={(colTo - colFrom) > 20 ? colFrom + 20 : colTo}
                key={new Date().getTime()}
                rowFrom={rowFrom}
                rowTo={(rowTo - rowFrom) > 100 ? rowFrom + 100 : rowTo}
            />
        </div >
    )
});

/**
 * FilterTableData component is responsible for rendering the input fields for filtering the rows and columns of the table.
 * It takes in the heading, axisFrom, axisTo, and callback functions to handle changes to the input values.
 */
const FilterTableData: React.FC<{ heading: string, axisFrom: number, axisTo: number, handleFrom: (value: string) => void, handleTo: (value: string) => void }> = ({ heading, axisFrom, axisTo, handleFrom, handleTo }) => {
    return <InputGroup label={heading}>
        <span className='flex gap-3'>
            <Input defaultValue={axisFrom} size='medium' callback={handleFrom} />
            <Input defaultValue={axisTo} size='medium' callback={handleTo} />
        </span>
    </InputGroup>
}

TableGroup.displayName = 'TableGroup'