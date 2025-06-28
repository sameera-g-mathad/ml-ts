import React, { memo } from "react";
import { Button } from "./Button";

export interface selectionPromptInterface {
    onYes: () => void;
    onNo: () => void;
}
export const SelectionPrompt: React.FC<selectionPromptInterface> = memo(({ onNo, onYes }) => {
    return <>
        {
            <span>
                <Button name='Yes' callback={() => { onYes() }} />
                <Button name='no' callback={() => { onNo() }} />
            </span>
        }
    </>
});

SelectionPrompt.displayName = 'SelectionPrompt'