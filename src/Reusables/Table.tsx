import React, { memo } from 'react';
import { withTheme } from '../HOC';
import { tableInterface, themeInterface } from '../interface';
const TableComponent: React.FC<tableInterface & themeInterface> = memo(
  ({ columns, data, colFrom, colTo, rowFrom, rowTo, secondaryColor }) => {
    return (
      <div className='overflow-x-scroll'>
        <table className="w-full border border-separate rounded-lg">
          <thead>
            <tr className='table table-fixed w-full font-light !text-white' >
              {columns.slice(colFrom, colTo).map((el, index) => (
                <th className="border rounded capitalize w-32 truncate hover:text-xs p-1" key={index} style={{ backgroundColor: secondaryColor }}>
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block max-h-96 overflow-y-scroll">
            {data.slice(rowFrom, rowTo).map((row, row_index) => (
              <tr className='table table-fixed w-full' key={row_index}>
                {row.slice(colFrom, colTo).map((el, col_index) => (
                  <td className="border w-full truncate hover:text-base text-sm p-1" key={col_index}>
                    <span
                      className={`w-full flex justify-center ${el === 'undefined' ? 'font-bold italic text-red-500' : ''
                        } `}
                    >
                      {el}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    );
  }
);

TableComponent.displayName = 'TableComponent';

export const Table = withTheme(TableComponent, ['secondaryColor']);
