import React, { memo } from 'react';
import withTheme from '../HOC/withTheme';
import { tableInterface, themeInterface } from '../../interface';
const TableComponent: React.FC<tableInterface & themeInterface> = memo(
  ({ columns, color, data, displayFrom, displayTo }) => {
    return (
      <div>
        <table className="w-full border border-separate rounded-lg">
          <thead>
            <tr className='table table-fixed w-full' >
              {columns.map((el, index) => (
                <th className="border rounded capitalize" key={index} style={{ backgroundColor: color }}>
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block max-h-96 overflow-y-scroll">
            {data.slice(displayFrom, displayTo).map((row, row_index) => (
              <tr className='table table-fixed w-full' key={row_index}>
                {row.map((el, col_index) => (
                  <td className="border" key={col_index}>
                    <span
                      className={`w-full flex justify-center ${el === 'undefined' ? 'text-red-500' : ''
                        }`}
                    >
                      {el}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

TableComponent.displayName = 'TableComponent';

export const Table = withTheme(TableComponent);
