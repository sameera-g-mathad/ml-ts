import React, { PropsWithChildren, memo, useContext } from "react";
import { HorizontalRule } from "./HorizontalRule";
import { ConditionalProvider, ConditionalContext } from "../Context";
/**
 * ConditionalDisplay component is responsible for displaying the children components
 * based on the value of conditionalDisplay in the ConditionalContext.
 * It uses the ConditionalProvider to provide the context to the children components.
 * The children components are wrapped in a HorizontalRule component to separate them from the previous components.
 * 
 * @param {PropsWithChildren} props - The children components to be displayed.
 * @returns {JSX.Element} - The rendered component.
 */
export const ConditionalDisplay: React.FC<PropsWithChildren> = memo(({ children }) => {

    // const memoisedPlaceholder = useMemo(() => <ConditionalDisplayPlaceHolder>
    //     {children}
    // </ConditionalDisplayPlaceHolder>,
    //     // eslint-disable-next-line 
    //     [])
    return <ConditionalProvider>
        <ConditionalDisplayPlaceHolder>
            {children}
        </ConditionalDisplayPlaceHolder>
    </ConditionalProvider>;
});


/**
 * ConditionalDisplayPlaceHolder component is responsible for displaying the children components.
 */
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
