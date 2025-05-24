import React from 'react'
import { childrenProp, inputGroupInterface } from '../../interface'
export const InputGroup: React.FC<childrenProp & inputGroupInterface> = ({ children, label }) => {
    return (
        <div className="flex items-center">
            <span className="mr-2">{label}</span>
            {children}
        </div>
    )
}


InputGroup.displayName = "InputGroup"