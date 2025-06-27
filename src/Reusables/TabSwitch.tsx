import React, { memo } from "react";
import { withTheme } from "../HOC";
import { themeInterface } from "../interface";

interface tabSwitchInterface {
    tabs: string[];
    name: string;
    callback: (index: number) => void;
}
const TabSwitchComponent: React.FC<tabSwitchInterface & themeInterface> = memo(({ name, tabs, callback, secondaryColor }) => {
    return <div className="inline-flex border py-1">
        {tabs.map((tab, index) =>
            <div key={index}>
                <input className="radio-input hidden" type='radio' id={tab} name={name} onClick={() => callback && callback(index)} defaultChecked={index === 0 ? true : false} />
                <label className="radio-label p-3 rounded capitalize" htmlFor={tab} style={{ ...({ "--color": secondaryColor } as React.CSSProperties) }}>{tab}</label >
            </div>
        )}
    </div>;
});

TabSwitchComponent.displayName = 'TabSwitchComponent'

export const TabSwitch = withTheme(TabSwitchComponent, ['secondaryColor'])
