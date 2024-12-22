import React, { memo } from 'react';
import withTheme from '../HOC/withTheme';
import { tableInterface } from '../../interface';
const TableComponent: React.FC<tableInterface> = memo(({ data }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {data.columns.map((el, index) => (
            <th className="border" key={index}>
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
                <span className="w-full flex justify-center">
                  {data.dtypes[row_index] === 'number' ? el : el}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

TableComponent.displayName = 'TableComponent';

export const Table = withTheme(TableComponent);
