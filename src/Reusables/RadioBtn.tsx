import React, { memo } from "react";
import { themeInterface } from "../interface";
import withTheme from "../HOC/withTheme";
interface radioInterface {
    id: string;
    name: string;
    selected?: boolean;
    callback: () => void;
}
const RadioBtnComponent: React.FC<themeInterface & radioInterface> = memo(({ color, callback, id, name, selected }) => {
    return <>
        <input className="radio-input hidden" type='radio' id={id} name={name} onClick={() => callback && callback()} defaultChecked={selected} />
        <label className="radio-label relative w-5 h-5 border rounded-full cursor-pointer" htmlFor={id} style={{ borderColor: color, ...({ "--color": color } as React.CSSProperties) }}></label >
    </>;
});

RadioBtnComponent.displayName = 'RadioBtn'

export const RadioBtn = withTheme(RadioBtnComponent);