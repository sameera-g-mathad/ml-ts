import React, { memo } from "react";
import { themeInterface } from "../interface";
import { withTheme } from "../HOC";
interface radioInterface {
    id: string;
    name: string;
    selected?: boolean;
    callback: () => void;
}
const RadioBtnComponent: React.FC<themeInterface & radioInterface> = memo(({ callback, id, name, secondaryColor, selected }) => {
    return <>
        <input className="radio-input hidden" type='radio' id={id} name={name} onClick={() => callback && callback()} defaultChecked={selected} />
        <label className="radio-label rounded-xl px-4 py-2 my-2 cursor-pointer capitalize" htmlFor={id} style={{ ...({ "--color": secondaryColor } as React.CSSProperties) }}>{id}</label >
    </>;
});

RadioBtnComponent.displayName = 'RadioBtn'

export const RadioBtn = withTheme(RadioBtnComponent, ['secondaryColor']);