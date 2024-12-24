import React, { memo } from 'react';
import withTheme from '../HOC/withTheme';
import { tableInterface, themeInterface } from '../../interface';
const TableComponent: React.FC<tableInterface & themeInterface> = memo(
  ({ data, color }) => {
    return (
      <div className="block max-h-96 overflow-y-scroll">
        <table className="w-full border border-separate rounded-lg">
          <thead>
            <tr style={{ backgroundColor: color }}>
              {data.columns.map((el, index) => (
                <th className="border rounded-lg" key={index}>
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, row_index) => (
              <tr key={row_index}>
                {row.map((el, col_index) => (
                  <td className="border" key={col_index}>
                    <span
                      className={`w-full flex justify-center ${
                        el === 'undefined' ? 'text-red-500' : ''
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
