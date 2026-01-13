import React from 'react'
import { childrenProp, inputGroupInterface } from '../interface'

/**
 * InputGroup component is responsible for rendering a group of input elements with a label.
 * It takes in children elements and a label as props and renders them in a flex container.
 */
export const InputGroup: React.FC<childrenProp & inputGroupInterface> = ({ children, label }) => {
    return (
        <div className="flex items-center">
            <span className="mr-2">{label}</span>
            {children}
        </div>
    )
}


InputGroup.displayName = "InputGroup"