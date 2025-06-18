import React, { useContext } from 'react'
import { ChatContext } from '../Context'
import { consumeContextInterface } from '../../interface';


export const withContext = <P extends object>(Component: React.ComponentType<P & consumeContextInterface>, require: Partial<keyof consumeContextInterface>[]) => {
    return (props: P) => {
        const { appendChatComponent, df, addDataframe, updateTaskAndAppendChat } = useContext(ChatContext);
        const context: consumeContextInterface = { appendChatComponent, df, addDataframe, updateTaskAndAppendChat }
        const filteredProps: Partial<consumeContextInterface> = {}
        require.forEach(key => {
            (filteredProps as any)[key] = context[key]
        }
        )
        return <Component {...props} {...filteredProps as any} />
    }
}
