import React, { memo } from "react";
import { themeInterface } from "../interface";
import { withTheme } from "../HOC";
import { DragabbleSvg } from "../Svgs";

export interface draggableContainerInterface {
    data: string[];
    draggable: boolean;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>, item: string) => void;
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}
const DraggableContainerComponent: React.FC<draggableContainerInterface & themeInterface> = memo(({ data, draggable, onDragStart, onDrop, secondaryColor }) => {
    return (
        <div
            className='border-2 rounded-lg w-full h-64 overflow-y-scroll p-2'
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop && onDrop(e)}
            style={{ borderColor: secondaryColor }}
        >
            {
                data.map(
                    (el, index) =>
                        <div
                            style={{ borderColor: secondaryColor, fill: secondaryColor }}
                            className={`flex items-center gap-5 border active:border-l-4 p-2 m-1 active:font-bold active:text-lg ${draggable ? 'cursor-grab' : 'cursor-auto'}`}
                            draggable={draggable}
                            onDragStart={(e) => onDragStart && onDragStart(e, el)}

                            key={index}>
                            <DragabbleSvg />
                            <span style={{ color: secondaryColor }}>{el}</span>
                        </div>
                )
            }
        </div>
    );
});

DraggableContainerComponent.displayName = 'DraggableContainerComponent';

export const DraggableContainer = withTheme(DraggableContainerComponent, ['secondaryColor'])