// import { nt, NDArray } from './numts';

type data = (string | number)[][];
type column = string[];

/**
 * DataFrame class represents a 2D data structure similar to a table.
 * It contains methods to load and process data from a file.
 * The data is stored in a 2D array, and the class also keeps track of the column names,
 */
export class DataFrame {
  public data: data;
  public columns: column;
  public shape: [number, number];
  public dtypes: string[];
  public isNan: boolean[]; // This can be used to test if the column has NaN ('undefined') and can be dropped.

  constructor(
    data: data,
    column: column,
    shape: [number, number],
    dtypes: string[],
    isNan: boolean[]
  ) {
    this.data = data;
    this.columns = column;
    this.shape = shape;
    this.dtypes = dtypes;
    this.isNan = isNan;
  }
}

/**
 * Process class handles the loading and processing of data files.
 * It reads the file, processes the data, and returns a DataFrame object.
 */
class Process {
  /**
   * loadFile method reads a file and returns its content as a 2D array.
   * It also extracts the column names and shape of the data.
   *
   * @param {File} file - The file to be read.
   * @param {boolean} header - Indicates if the first row contains headers.
   * @param {string} delimiter - The delimiter used in the file (default is comma).
   * @returns {Promise<{ data: data; index: column; shape: [number, number] }>} - A promise that resolves to an object containing the data, index, and shape.
   */
  loadFile(
    file: File,
    header: boolean = true,
    delimiter: string = ','
  ): Promise<{ data: data; index: column; shape: [number, number] }> {
    // This will return a promise as the file reading is asynchronous.
    // The promise will resolve with the data, index, and shape of the file.
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const data: data = [];
      const index: column = [];
      const shape: [number, number] = [0, 0];

      // The onload event is triggered when the file is read successfully.
      reader.onload = async ({ target }) => {
        try {
          // The file is read as text.
          if (target && typeof target.result === 'string') {
            // Split the file content by new line to get rows.
            const fileRead = target.result.trim().split('\n');
            shape[0] = fileRead.length;
            const columns = fileRead[0].trim().split(delimiter);
            shape[1] = columns.length;

            // If header is true, the first row is treated as column names.
            // Otherwise, the columns are numbered from 0 to shape[1] - 1.
            if (header) {
              shape[0] = fileRead.length - 1;
              for (let column of columns) index.push(column);
            } else {
              for (let i = 0; i < shape[1]; i++) {
                index.push(String(i));
              }
            }

            // Take sure from which row to start reading the data.
            // If header is true, start from the second row.
            // Otherwise, start from the first row.
            let row = header ? 1 : 0;
            for (row; row < fileRead.length; row++) {
              // console.log(fileRead[row]);
              // break;
              const row_data = fileRead[row].trim().split(delimiter); // Fix for jokes.csv
              // .split(new RegExp(`(?<!\\s)${delimiter}(?!\\s)`));
              data.push(row_data);
            }

            // The resovle method is called to resolve the promise with the data, index, and shape.
            resolve({ data, index, shape });
          }
        } catch (error) {
          reject(error);
        }
      };

      // The onerror event is triggered when there is an error reading the file.
      reader.onerror = (error) => reject(error);

      // The readAsText method is used to read the file as text.
      reader.readAsText(file);
    });
  }

  /**
   *
   * @param data - 2D array of data that is read fromt he file.
   * @param columns - Column names or indices.
   * @param shape - Shape of the data.
   * @returns
   */
  process(data: data, columns: column, shape: [number, number]): DataFrame {
    const dtypes: string[] = [];
    const isNan: boolean[] = [];
    // Initially all the datatypes are string, as the readFile returns list[strings]
    for (let i = 0; i < columns.length; i++) {
      dtypes.push('string');
      isNan.push(false);
    }

    // Iterate each column assuming that the column has numbers.
    for (let column = 0; column < shape[1]; column++) {
      // set a flag that is used later. By default set to true
      let dtype_number = true;

      // Iterate all the rows in the dataframe, for each column.
      for (let row = 0; row < shape[0]; row++) {
        // Convert the value to string, as empty string will have length 0.
        let value = data[row][column].toString();

        // If there exist an entry which is empty, then the column
        // is not made of numbers, even though it could be.
        if (value.length === 0) {
          dtype_number = false;
          data[row][column] = 'undefined';
          isNan[column] = true;
        }
        // This will test if the value is string or number, ex: 'Male' or '45'
        let new_value = parseInt(value) || parseFloat(value);
        if (isNaN(new_value)) {
          dtype_number = false;
        }
      }
      // If all the values in the column is tested and dtype_number = true,
      // then the column is made up of numbers.
      if (dtype_number) {
        dtypes[column] = 'number';
      }
    }

    // We tested whether a column is number or not in the above loop.
    // Now we will convert them into numbers.
    // We did not do this in the previous loop as we weren't sure
    // if there were undefined values.
    for (let column = 0; column < shape[1]; column++) {
      if (dtypes[column] === 'number') {
        for (let row = 0; row < shape[0]; row++) {
          // Convert values to number.
          let value = data[row][column].toString();
          data[row][column] = parseFloat(value);
        }
      }
    }
    return new DataFrame(data, columns, shape, dtypes, isNan);
  }

  /**
   *
   * @param file File which will be read.
   * @param header If the file has header to consider or not.
   * @param delimiter To split each row, ex: ',', '|' etc.
   * @returns
   */
  async read(
    file: File,
    header: boolean = true,
    delimiter: string = ','
  ): Promise<DataFrame> {
    try {
      // First read the file and get data, index(columns) and shape
      const { data, index, shape } = await this.loadFile(
        file,
        header,
        delimiter
      );
      // Process the data to convert data types if any.
      return this.process(data, index, shape);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  filterCols(df: DataFrame, columns: string[]): DataFrame {
    let new_data: data = [];
    let new_cols: column = [];
    let filteredCols: number[] = [];
    let new_dtypes: string[] = [];
    let new_isNan: boolean[] = [];

    // loop through the filteredCols to store its information.
    for (let column in columns) {
      // for each column present, loop through all the df columns to find a match.
      for (let iter = 0; iter < df.columns.length; iter++) {
        if (columns[column] === df.columns[iter]) {
          filteredCols.push(iter);
          new_cols.push(df.columns[iter]);
          new_dtypes.push(df.dtypes[iter]);
          new_isNan.push(df.isNan[iter]);
          break;
        }
      }
    }
    let new_shape: [number, number] = [df.shape[0], filteredCols.length];
    for (let i = 0; i < df.shape[0]; i++) {
      let row = [];
      for (let filteredCol in filteredCols) {
        const j = filteredCols[filteredCol];
        row.push(df.data[i][j]);
      }
      new_data.push(row);
    }
    return new DataFrame(new_data, new_cols, new_shape, new_dtypes, new_isNan);
  }

  /**
   * This method is used to return the info of the dataframe that is
   * passed. similar to `DataFrame.info()` in pandas.
   * @param df The Dataframe instance for which the info will be returned
   * @returns New Dataframe that consists of info of the requested dataframe
   */
  info(df: DataFrame): DataFrame {
    // Name the columns as 'columns', 'data type', 'non-null values' as they are fixed.
    let columns: column = [
      'columns',
      'data type',
      'non-null values',
      'null values',
    ];
    console.log(df);
    let info: data = [];
    // Loop through each column
    for (let column = 0; column < df.shape[1]; column++) {
      // To count the non-null values in a column
      let count = 0;
      // Loop through each row in a column
      for (let row = 0; row < df.shape[0]; row++) {
        // Skip the undefined values
        if (df.data[row][column] === 'undefined') continue;
        count++;
      }
      // We push the column name, its dtype and unique count.
      info.push([
        df.columns[column],
        df.dtypes[column],
        count,
        String(df.isNan[column]),
      ]);
    }
    return new DataFrame(
      info,
      columns,
      [info.length, info[0].length],
      ['string', 'string', 'number'],
      [false, false, false]
    );
  }
}

/**
 * Frame class is a wrapper around the Process class.
 * It provides a method to read a file and return a DataFrame object.
 */
class Frame {
  private process: Process;
  constructor() {
    this.process = new Process();
  }
  filterCols(df: DataFrame, columns: string[]): DataFrame {
    return this.process.filterCols(df, columns);
  }
  getInfo(df: DataFrame): DataFrame {
    return this.process.info(df);
  }

  /**
   * Entry point to read a file and return a DataFrame object.
   * @param file
   * @param header
   * @param delimiter
   * @returns Promise<DataFame>
   */
  async read(
    file: File,
    header: boolean,
    delimiter: string
  ): Promise<DataFrame> {
    return await this.process.read(file, header, delimiter);
  }
}

export const fr = new Frame();
