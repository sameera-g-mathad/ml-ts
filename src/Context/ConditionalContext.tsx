import React, { createContext, memo, PropsWithChildren, useCallback, useState } from 'react';



/**
 * This context is used to make the portion of the application that is conditionally displayed
 * based on the `conditionalDisplay` state.
 * Once the `conditionalDisplay` is set to false, the components that are wrapped in this context
 * will not be displayed.
 * This is useful for scenarios where you want to conditionally render components based on some state.
 */
export const ConditionalContext = createContext({
    conditionalDisplay: true,
    setConditionalDisplay: (value: boolean) => { }
});

/**
 * This is the context provider for the conditional display.
 * It provides the `conditionalDisplay` state and a function to update it to the rest of the application.
 * The initial state is set to true, meaning that the components wrapped in this context
 * will be displayed by default.   
 * * @param children - children
 * @returns JSX.Element
 */
export const ConditionalProvider: React.FC<PropsWithChildren> = memo(({ children }) => {
    const [conditionalDisplay, setDisplay] = useState(true);
    const setConditionalDisplay = useCallback((value: boolean) => {
        return setDisplay(value)
    }, [])
    return <ConditionalContext.Provider value={{ conditionalDisplay, setConditionalDisplay }}>
        {children}
    </ConditionalContext.Provider>

})
