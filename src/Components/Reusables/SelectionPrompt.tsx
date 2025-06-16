import React, { memo } from "react";
import { Button } from "./index";

export interface selectionPromptInterface {
    onYes: () => void;
    onNo: () => void;
}
export const SelectionPrompt: React.FC<selectionPromptInterface> = memo(({ onNo, onYes }) => {
    // const [displayButtons, setDisplayButtons] = useState(true);
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