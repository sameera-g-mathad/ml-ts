import React, { memo, useState } from "react";
import { Button, HorizontalRule } from "./index";

export interface selectionPromptInterface {
    onYes: () => void;
    onNo: () => void;
}
export const SelectionPrompt: React.FC<selectionPromptInterface> = memo(({ onNo, onYes }) => {
    const [displayButtons, setDisplayButtons] = useState(true);
    return <>
        {
            displayButtons &&
            <span>
                <HorizontalRule />
                <Button name='Yes' callback={() => { onYes(); setDisplayButtons(false) }} />
                <Button name='no' callback={() => { onNo(); setDisplayButtons(false) }} />
            </span>
        }
    </>
});

SelectionPrompt.displayName = 'SelectionPrompt'