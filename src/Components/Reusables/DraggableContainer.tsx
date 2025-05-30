import React, { memo, useContext } from "react";
import { ThemeContext } from "../Context";

export interface draggableContainerInterface {
    data: string[];
    draggable: boolean;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>, item: string) => void;
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}
export const DraggableContainer: React.FC<draggableContainerInterface> = memo(({ data, draggable, onDragStart, onDrop }) => {
    const { useColor } = useContext(ThemeContext)
    return (
        <div
            className='border-2 border-dashed rounded-lg w-full h-64 overflow-y-scroll p-2'
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop && onDrop(e)}
            style={{ borderColor: useColor }}
        >
            {
                data.map(
                    (el, index) =>
                        <div
                            style={{ borderColor: useColor }}
                            className={`border border-l-4 rounded-md p-2 m-1 ${draggable ? 'cursor-grab' : 'cursor-auto'}`}
                            draggable={draggable}
                            onDragStart={(e) => onDragStart && onDragStart(e, el)}

                            key={index}>
                            {el}
                        </div>
                )
            }
        </div>
    );
});

DraggableContainer.displayName = 'DraggableContainer';