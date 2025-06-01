import React, { memo } from 'react';
import withTheme from '../HOC/withTheme';
import { tableInterface, themeInterface } from '../../interface';
const TableComponent: React.FC<tableInterface & themeInterface> = memo(
  ({ columns, color, data, colFrom, colTo, rowFrom, rowTo }) => {
    return (
      <div className='overflow-x-scroll'>
        <table className="w-full border border-separate rounded-lg">
          <thead>
            <tr className='table table-fixed w-full font-light !text-white' >
              {columns.slice(colFrom, colTo).map((el, index) => (
                <th className="border rounded capitalize w-32 truncate hover:text-xs" key={index} style={{ backgroundColor: color }}>
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block max-h-96 overflow-y-scroll">
            {data.slice(rowFrom, rowTo).map((row, row_index) => (
              <tr className='table table-fixed w-full' key={row_index}>
                {row.slice(colFrom, colTo).map((el, col_index) => (
                  <td className="border w-full truncate hover:text-base text-sm" key={col_index}>
                    <span
                      className={`w-full flex justify-center ${el === 'undefined' ? 'text-red-500' : ''
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

export const Table = withTheme(TableComponent);
