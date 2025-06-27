import React, { memo, useState } from "react";
import { TabSwitch } from "../Reusables";

interface tabSelecterInterface {
    name: string;
    tabs: string[];
    renderComponents: React.ReactNode[];
}
export const TabSelector: React.FC<tabSelecterInterface> = memo(({ name, tabs, renderComponents }) => {
    const [tab, setTab] = useState(0)
    return <div>
        <span className="flex justify-center">
            <TabSwitch name={name} tabs={tabs} callback={(index) => setTab(index)} />
        </span>
        <span>
            {renderComponents[tab]}
        </span>
    </div>;
});

TabSelector.displayName = 'TabSelector'