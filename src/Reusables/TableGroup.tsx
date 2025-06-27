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

const displayReducer = (state: STATE, payload: PAYLOAD) => {
    switch (payload.action) {
        case 'setcolFrom': return { ...state, colFrom: payload.value };
        case 'setcolTo': return { ...state, colTo: payload.value };
        case 'setrowFrom': return { ...state, rowFrom: payload.value };
        case 'setrowTo': return { ...state, rowTo: payload.value };
        default: return state;
    }
}


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
                    <InputGroup label='Filter rows (upto 100)'>
                        <span className='flex  gap-3'>
                            <InputGroup label='from:'>
                                <Input defaultValue={rowFrom} size='medium' callback={handleRowFrom} />
                            </InputGroup>
                            <InputGroup label='to:'>
                                <Input defaultValue={rowTo} size='medium' callback={handleRowTo} />
                            </InputGroup>
                        </span>
                    </InputGroup>
                }
                {requireColumnFilter &&
                    <InputGroup label='Filter columns (upto 20)'>
                        <span className='flex flex-wrap gap-3'>
                            <InputGroup label='from:'>
                                <Input defaultValue={colFrom} size='medium' callback={handleColFrom} />
                            </InputGroup>
                            <InputGroup label='to:'>
                                <Input defaultValue={colTo} size='medium' callback={handleColTo} />
                            </InputGroup>
                        </span>
                    </InputGroup>
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

TableGroup.displayName = 'TableGroup'