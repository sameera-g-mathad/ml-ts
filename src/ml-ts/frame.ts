// import { nt, NDArray } from './numts';

type data = (string | number)[][];
type column = (number | string)[];

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

  constructor(
    data: data,
    column: column,
    shape: [number, number],
    dtypes: string[]
  ) {
    this.data = data;
    this.columns = column;
    this.shape = shape;
    this.dtypes = dtypes;
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
                index.push(i);
              }
            }

            // Take sure from which row to start reading the data.
            // If header is true, start from the second row.
            // Otherwise, start from the first row.
            let row = header ? 1 : 0;
            for (row; row < fileRead.length; row++) {
              const row_data = fileRead[row].trim().split(delimiter);
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
  process(
    data: data,
    columns: column,
    shape: [number, number]
  ): DataFrame {
    const dtypes = [];
    for (let i = 0; i < columns.length; i++) {
      dtypes.push('string');
    }
    for (let column = 0; column < shape[1]; column++) {
      let dtype_number = true;
      for (let row = 0; row < shape[0]; row++) {
        let value = data[row][column].toString();
        if (value.length === 0) {
          dtype_number = false;
          data[row][column] = 'undefined';
        }
        let new_value = parseInt(value) || parseFloat(value);
        if (isNaN(new_value)) {
          dtype_number = false;
        }
      }
      if (dtype_number) {
        dtypes[column] = 'number';
      }
    }

    for (let column = 0; column < shape[1]; column++) {
      if (dtypes[column] === 'number') {
        for (let row = 0; row < shape[0]; row++) {
          let value = data[row][column].toString();
          data[row][column] = parseFloat(value);
        }
      }
    }
    return new DataFrame(data, columns, shape, dtypes);
  }
  async read(
    file: File,
    header: boolean = true,
    delimiter: string = ','
  ): Promise<DataFrame> {
    try {
      const { data, index, shape } = await this.loadFile(
        file,
        header,
        delimiter
      );
      return this.process(data, index, shape);
    } catch (error) {
      console.log(error);
      throw error;
    }
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
