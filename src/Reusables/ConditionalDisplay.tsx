import React, { PropsWithChildren, memo, useContext, useMemo } from "react";
import { HorizontalRule } from "./HorizontalRule";
import { ConditionalProvider, ConditionalContext } from "../Context";
export const ConditionalDisplay: React.FC<PropsWithChildren> = memo(({ children }) => {

    const memoisedPlaceholder = useMemo(() => <ConditionalDisplayPlaceHolder>
        {children}
    </ConditionalDisplayPlaceHolder>,
        // eslint-disable-next-line 
        [])
    return <ConditionalProvider>
        <ConditionalDisplayPlaceHolder>
            {children}
        </ConditionalDisplayPlaceHolder>
    </ConditionalProvider>;
});


const ConditionalDisplayPlaceHolder: React.FC<PropsWithChildren> = memo(({ children }) => {
    const { conditionalDisplay } = useContext(ConditionalContext)
    return (
        <>
            {
                conditionalDisplay
                &&
                <>
                    <HorizontalRule />
                    {children}
                </>
            }
        </>
    )
})
