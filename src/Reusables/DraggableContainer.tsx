import React, { memo, useContext } from "react";
import { ThemeContext } from "../Context";
import { themeInterface } from "../interface";
import { withTheme } from "../HOC";

export interface draggableContainerInterface {
    data: string[];
    draggable: boolean;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>, item: string) => void;
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}
const DraggableContainerComponent: React.FC<draggableContainerInterface & themeInterface> = memo(({ data, draggable, onDragStart, onDrop, secondaryColor }) => {
    return (
        <div
            className='border-2 border-dashed rounded-lg w-full h-64 overflow-y-scroll p-2'
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop && onDrop(e)}
            style={{ borderColor: secondaryColor }}
        >
            {
                data.map(
                    (el, index) =>
                        <div
                            style={{ borderColor: secondaryColor }}
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

DraggableContainerComponent.displayName = 'DraggableContainerComponent';

export const DraggableContainer = withTheme(DraggableContainerComponent, ['secondaryColor'])