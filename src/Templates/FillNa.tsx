import React, { useMemo, useReducer, useRef, useState } from "react";
import { withContext } from "../HOC";
import { Button, ConditionalDisplay, ConversationTyping, Input, InputGroup, Switch, TabSwitch } from "../Reusables";
import { Chat } from "../Components";
import { DisplayDf, FillNaPrompt } from './index'
import { consumeContextInterface } from "../interface";
import { fillNaType, fillNaColumnInterface, fillNaReducerType, fillNaReducerActionType } from "./interface";
import { fr } from "../ml-ts";

const FillNaComponent: React.FC<consumeContextInterface> = ({ addDataframe, appendChatComponent, df }) => {
    const fillValues = useRef<fillNaType[]>([])

    const nanColumns: number[] = []
    for (let i = 0; i < df.shape[1]; i++) {
        if (df.isNan[i]) {
            nanColumns.push(i)
            fillValues.current.push({} as fillNaType)
        }
    }
    return <div>
        <ConversationTyping text='Fill the values' />
        <ConditionalDisplay>
            {
                nanColumns.map((col, index) => {
                    const column = df.columns[col]
                    return <FillColumn
                        column={column}
                        key={index}
                        callback={(obj: fillNaReducerType) => fillValues.current[index] = { ...obj, column }} />
                })
            }
            <Button name='Fill Values' callback={() => {
                addDataframe(fr.fillna(df, fillValues.current))
                appendChatComponent(<Chat gerneratedBy="system" widthFull={true}>
                    <DisplayDf componentAfterInfo={<FillNaPrompt />} />
                </Chat>)
            }} />
        </ConditionalDisplay>
    </div>;
};

export const FillNa = withContext(FillNaComponent, ['appendChatComponent', 'addDataframe', 'df'])


const fillNaReducer = (state: fillNaReducerType, payload: fillNaReducerActionType) => {
    switch (payload.action) {
        case 'setDtype': return { ...state, dtype: payload.value };
        case 'setIsFill': return { ...state, isFill: !state.isFill };
        case 'setValue': return { ...state, value: payload.value };
        case 'setImputeType': return { ...state, imputeType: payload.value }
    }
}

const FillColumn: React.FC<fillNaColumnInterface> = ({ column, callback }) => {
    const [state, dispatch] = useReducer<React.Reducer<fillNaReducerType, fillNaReducerActionType>>(fillNaReducer, {
        dtype: 'string',
        isFill: true,
        value: '',
        imputeType: 'max'
    })
    const dtypes = useMemo(() => ['string', 'number'], []);
    const switchNames: [string, string] = useMemo(() => ['fill', 'impute'], []);
    const imputeTypes: ['max', 'min', 'mean', 'median'] = useMemo(() => ['max', 'min', 'mean', 'median'], []);
    return <ConditionalDisplay>
        <div className="flex flex-col gap-2 justify-between border p-1 m-2 rounded-lg">
            <span className="flex justify-center font-semibold">{column}</span>
            <span className="flex flex-col gap-2">
                <InputGroup label="Please select the datatype of choice">
                    <TabSwitch name={`dtype-${column}`} tabs={dtypes} callback={(index: number) => dispatch({ action: 'setDtype', value: dtypes[index] })} />
                </InputGroup>
                {
                    state.dtype === 'string' ?
                        <InputGroup label='Fill Value'>
                            <Input size='medium' defaultValue={state.value} callback={(value: string) => dispatch({ action: 'setValue', value })} />
                        </InputGroup> :
                        <>
                            <InputGroup label="Select whether to fill or impute">
                                <Switch switchName={`switch-${column}`} names={switchNames} callback={() => dispatch({ action: 'setIsFill' })} />
                            </InputGroup>
                            <InputGroup label="Fill value incase of fallback">
                                <Input size='medium' defaultValue={state.value} callback={(value: string) => dispatch({ action: 'setValue', value })} />
                            </InputGroup>
                            {
                                !state.isFill ?
                                    <InputGroup label="Impute type">
                                        <TabSwitch name={`impute-${column}`} tabs={imputeTypes} callback={(index: number) => dispatch({ action: "setImputeType", value: imputeTypes[index] })} />
                                    </InputGroup> :
                                    ''
                            }
                        </>
                }
            </span>
            <span className="flex justify-end">
                <Button name='Save' disabled={state.value.length === 0} callback={() => callback(state)} />
            </span>
        </div>
    </ConditionalDisplay>
}