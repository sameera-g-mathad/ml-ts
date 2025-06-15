import React, { createContext, memo, PropsWithChildren, useCallback, useState } from 'react';

export const ConditionalContext = createContext({
    conditionalDisplay: true,
    setConditionalDisplay: (value: boolean) => { }
});


export const ConditionalProvider: React.FC<PropsWithChildren> = memo(({ children }) => {
    const [conditionalDisplay, setDisplay] = useState(true);
    const setConditionalDisplay = useCallback((value: boolean) => {
        return setDisplay(value)
    }, [])
    return <ConditionalContext.Provider value={{ conditionalDisplay, setConditionalDisplay }}>
        {children}
    </ConditionalContext.Provider>

})
