import { fillNaType } from '../Templates/interface';
import { nt } from './index';

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

  getIndex(column: string): number {
    for (let index = 0; index < this.shape[1]; index++) {
      if (this.columns[index] === column) return index;
    }
    return -1;
  }
}

/**
 * Process class handles the loading and processing of data files.
 * It reads the file, processes the data, and returns a DataFrame object.
 */
class Process {
  /**
   * This method is used to fill the isNan array with false values for each column.
   * @param isNan - Array to be filled with false values.
   * @param columns - Number of columns in the DataFrame.
   * @returns Filled isNan array.
   */
  private fillNan(isNan: boolean[], columns: number): boolean[] {
    for (let i = 0; i < columns; i++) {
      isNan.push(false);
    }
    return isNan;
  }
  /**
   * This method checks if there are any NaN values in the data.
   * It returns an array of booleans indicating whether each column has NaN values.
   * @param data - The data to be checked for NaN values.
   * @returns An array of booleans indicating whether each column has NaN values.
   */
  private checkNan(data: data): boolean[] {
    let isNan: boolean[] = this.fillNan([], data[0].length);
    for (let row = 0; row < data.length; row++) {
      for (let column = 0; column < data[0].length; column++) {
        if (data[row][column] === 'undefined') {
          isNan[column] = true;
          break;
        }
      }
    }
    return isNan;
  }
  /**
   * This method is used to describe the DataFrame.
   * It returns a new DataFrame with the statistics of the original DataFrame.
   * @param df The DataFrame instance to be described.
   * @returns New DataFrame with the statistics of the original DataFrame.
   */
  describe(df: DataFrame): DataFrame | null {
    const numericColumns = [];
    const newColumns: column = ['stats'];
    const newDtypes: string[] = ['string'];
    const newIsNans: boolean[] = [];
    const data: number[][] = [];
    // Loop through each column in the DataFrame to find numeric columns.
    for (let i = 0; i < df.shape[1]; i++) {
      if (df.dtypes[i] === 'number') {
        numericColumns.push(i);
        newColumns.push(df.columns[i]); // Add the column name to newColumns.
        newDtypes.push(df.dtypes[i]); // Add the dtype of the column to newDtypes.
        newIsNans.push(false); // Add false to newIsNans as we are not checking for NaN values in this method.
      }
    }
    if (numericColumns.length === 0) return null;
    // Loop through each row in the DataFrame to collect data for numeric columns.
    for (let i = 0; i < df.shape[0]; i++) {
      const row: number[] = [];
      for (let j = 0; j < numericColumns.length; j++) {
        let col = numericColumns[j]; // Get the index of the numeric column.
        row.push(df.data[i][col] as number);
      }
      data.push(row);
    }
    // Create a new NDArray from the collected data.
    const ndArray = nt.array(data);
    // Calculate the statistics for the numeric columns.
    const quantileStats = nt.quantileStats(ndArray);
    // Calculate the range (min, max) for the numeric columns.
    const rangeStats = nt.range(ndArray);
    const newData = [
      ['count', ...nt.count(ndArray).array[0]],
      ['mean', ...nt.mean(ndArray).array[0]],
      ['std', ...nt.std(ndArray, false).array[0]],
      ['min', ...rangeStats.array[0]],
      ['25%', ...quantileStats.array[0]],
      ['50%', ...quantileStats.array[1]],
      ['75%', ...quantileStats.array[2]],
      ['max', ...rangeStats.array[1]],
    ];

    return new DataFrame(
      newData,
      newColumns,
      [newData.length, newData[0].length],
      newDtypes,
      newIsNans
    );
  }
  /**
   * This method is used to drop rows with NaN values based on the specified criteria.
   * @param df The DataFrame instance from which rows will be dropped.
   * @param how The criteria for dropping rows: 'all', 'any', or 'subset'.
   * @param subset An array of column names to consider when dropping rows (only used if how is 'subset').
   * @returns A new DataFrame with the specified rows dropped.
   */
  dropAll(df: DataFrame): DataFrame {
    // New variable to hold new Data.
    let newData: data = [];

    // This array is to track the rows that has an entry of 'undefined'. No matter of 'any' or 'all'.
    for (let row = 0; row < df.shape[0]; row++) {
      // Variable to count the number of NaN values in a row.
      let nanCount = 0;
      // Variable to hold the instance of a row.
      let instance = [];
      // Loop through each column in the row.
      for (let column = 0; column < df.shape[1]; column++) {
        // Get the data point at the current row and column.
        const dataPoint = df.data[row][column];
        // Push the data point to the instance.
        instance.push(dataPoint);
        // If the data point is 'undefined', increment the nanCount.
        if (dataPoint === 'undefined') {
          nanCount++;
        }
      }
      // If the nanCount is equal to the number of columns, it means all values are NaN.
      // In that case, we skip the row and do not add it to the newData.
      if (nanCount === df.shape[1]) {
        continue;
      }
      // If the row has at least one non-NaN value, we add it to the newData.
      newData.push(instance);
    }

    // return a new DataFrame with the filtered data.
    return new DataFrame(
      newData,
      df.columns,
      [newData.length, newData[0].length],
      df.dtypes,
      this.checkNan(newData)
    );
  }
  /**
   * This method is used to drop rows with NaN values based on the 'any' criteria.
   * It returns a new DataFrame with rows that have at least one non-NaN value.
   * @param df The DataFrame instance from which rows will be dropped.
   * @returns A new DataFrame with rows that have at least one non-NaN value.
   */
  dropAny(df: DataFrame): DataFrame {
    let newData: data = [];
    // Loop through each row in the DataFrame.
    for (let row = 0; row < df.shape[0]; row++) {
      // Variable to hold the instance of a row.
      let instance: (string | number)[] | null = [];
      for (let column = 0; column < df.shape[1]; column++) {
        // Get the data point at the current row and column.
        const dataPoint = df.data[row][column];
        // If the data point is not 'undefined', break.
        if (dataPoint === 'undefined') {
          instance = null; // If any value is NaN, we will not add this row.
          break;
        }
        // Push the data point to the instance.
        instance.push(dataPoint);
      }
      // If the instance is not empty, it means there is at least one non-NaN value.
      if (instance !== null) {
        // Add the instance to the newData.
        newData.push(instance);
      }
    }
    // return a new DataFrame with the filtered data.
    const dfShape: [number, number] = [newData.length, newData[0].length];
    return new DataFrame(
      newData,
      df.columns,
      dfShape,
      df.dtypes,
      this.fillNan([], dfShape[1])
    );
  }
  /**
   * This method is used to drop rows with NaN values based on the 'subset' criteria.
   * It returns a new DataFrame with rows that have NaN values in the specified subset of columns.
   * @param df The DataFrame instance from which rows will be dropped.
   * @param subset An array of column names to consider when dropping rows.
   * @returns A new DataFrame with rows that have NaN values in the specified subset of columns.
   */
  dropSubset(df: DataFrame, subset: string[]): DataFrame {
    // variable to hold the columns that are to be dropped.
    let columns: number[] = [];
    // store the length of the subset array.
    let subsetLength = subset.length;
    // Go through each column in the subset
    for (let i = 0; i < subsetLength; i++) {
      // For each column in the dataframe, check if it matches the subset column.
      for (let j = 0; j < df.shape[1]; j++) {
        if (subset[i] === df.columns[j]) {
          columns.push(j); // Store only the index of the column to be dropped.
        }
      }
      // If the columns length is equal to the subset length, break the loop.
      // This is to avoid unnecessary iterations if all columns are found.
      if (columns.length === subsetLength) break;
    }
    let removeRows = [];
    // Iterate through each row in the DataFrame.
    for (let row = 0; row < df.shape[0]; row++) {
      // Variable to count the number of columns that are 'undefined' in the current row
      // that match the subset.
      let columnCount = 0;
      // Loop through each column in the columns array.
      for (let column = 0; column < columns.length; column++) {
        // Get the column index from the columns array.
        let dropColumn = columns[column];
        // If the value in the current row and column is 'undefined', increment the columnCount.
        if (df.data[row][dropColumn] === 'undefined') columnCount++;
      }
      // If the columnCount is equal to the subset length, it means all columns in the subset
      // are 'undefined' in the current row, so we add the row index to removeRows.
      // This means that the row will be dropped from the DataFrame.
      if (columnCount === subsetLength) removeRows.push(row);
    }

    // variable to hold the new data after filtering.
    let newData: data = [];
    // variable to iterate through the removeRows array.
    let removeRowsIter = 0;
    // Loop through each row in the DataFrame.
    for (let row = 0; row < df.shape[0]; row++) {
      // instance variable to hold the data of the current row.
      let instance = [];
      // If the current row index is in the removeRows array, skip this row.
      if (row === removeRows[removeRowsIter]) {
        // If the current row is to be removed, increment the removeRowsIter.
        // This is because all the indeces in removeRows are sorted.
        // Hence we can just increment the removeRowsIter.
        removeRowsIter++;
        continue;
      }
      // Loop through each column in the DataFrame if the row is not to be removed.
      for (let column = 0; column < df.shape[1]; column++) {
        // push the data point at the current row and column to the instance.
        instance.push(df.data[row][column]);
      }
      // After looping through all the columns, push the instance to the newData.
      newData.push(instance);
    }
    // return a new DataFrame with the filtered data.
    const dfShape: [number, number] = [newData.length, newData[0].length];
    return new DataFrame(
      newData,
      df.columns,
      dfShape,
      df.dtypes,
      this.checkNan(newData)
    );
  }

  fillString(df: DataFrame, fillValue: fillNaType): DataFrame {
    const column = fillValue['column'];
    const columnIndex = df.getIndex(column);
    for (let i = 0; i < df.shape[0]; i++) {
      if (df.data[i][columnIndex] === 'undefined')
        df.data[i][columnIndex] = fillValue['value'];
    }
    df.isNan[columnIndex] = false;
    return df;
  }

  fillNa(df: DataFrame, fillValues: fillNaType[]): DataFrame {
    for (let fillColumn in fillValues) {
      const fillValue = fillValues[fillColumn];
      console.log(fillValue);
      switch (fillValue['dtype']) {
        case 'string':
          this.fillString(df, fillValue);
      }
    }
    return df;
  }

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
    const df = new DataFrame(data, columns, shape, dtypes, isNan);
    return df;
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

  /**
   * This method is used to filter the columns of a DataFrame.
   *
   * @param df Dataframe that needs filtering.
   * @param columns New column list to retain.
   * @returns New Dataframe with the updated columns
   */
  filterCols(df: DataFrame, columns: string[]): DataFrame {
    // If no columns are passed, return the original dataframe.
    if (columns.length === 0) {
      return df;
    }

    // If the columns are not present in the dataframe, throw an error.
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
          filteredCols.push(iter); // Store the index of the column to be filtered.
          new_cols.push(df.columns[iter]); // Store the column name.
          new_dtypes.push(df.dtypes[iter]); // Store the dtype of the column.
          new_isNan.push(df.isNan[iter]); // Store the isNan value of the column.
        }
      }
    }
    // If no columns are filtered, return the original dataframe.
    let new_shape: [number, number] = [df.shape[0], filteredCols.length];

    // Loop through all the rows of the dataframe and push the filtered columns.
    for (let i = 0; i < df.shape[0]; i++) {
      let row = [];
      // Loop through the filtered columns and push the values to the row.
      for (let filteredCol in filteredCols) {
        const j = filteredCols[filteredCol];
        row.push(df.data[i][j]);
      }
      // Push the row to the new data.
      new_data.push(row);
    }
    // Return the new DataFrame with the filtered columns.
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
  /**
   *
   */
  getNanColumns(df: DataFrame): string[] {
    let result: string[] = [];
    for (let i = 0; i < df.shape[1]; i++) {
      if (df.isNan[i]) {
        result.push(df.columns[i]);
      }
    }
    return result;
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
   * This method is used to describe the DataFrame.
   * It returns a new DataFrame with the statistics of the original DataFrame.
   * @param df The DataFrame instance to be described.
   * @returns New DataFrame with the statistics of the original DataFrame.
   */
  describe(df: DataFrame): DataFrame | null {
    return this.process.describe(df);
  }

  /**
   * This method is used to drop rows with NaN values based on the specified criteria.
   * @param df The DataFrame instance from which rows will be dropped.
   * @param how The criteria for dropping rows: 'all', 'any', or 'subset'.
   * @param subset An array of column names to consider when dropping rows (only used if how is 'subset').
   * @returns A new DataFrame with the specified rows dropped.
   */
  dropna(
    df: DataFrame,
    how: 'all' | 'any' | 'subset',
    subset: string[] = []
  ): DataFrame {
    switch (how) {
      case 'all':
        return this.process.dropAll(df);
      case 'any':
        return this.process.dropAny(df);
      case 'subset':
        return this.process.dropSubset(df, subset);
    }
  }

  fillna(df: DataFrame, fillValues: fillNaType[]): DataFrame {
    return this.process.fillNa(df, fillValues);
  }
  /**
   * This method is used to filter the columns of a DataFrame.
   * @param df The DataFrame instance to be filtered.
   * @param columns The columns to retain in the new DataFrame.
   * @returns A new DataFrame with only the specified columns.
   */
  filterCols(df: DataFrame, columns: string[]): DataFrame {
    return this.process.filterCols(df, columns);
  }
  /**
   * This method is used to get the info of the DataFrame.
   * It returns a new DataFrame with the info of the original DataFrame.
   * @param df The DataFrame instance for which the info will be returned.
   * @returns New DataFrame that consists of info of the requested DataFrame.
   */
  getInfo(df: DataFrame): DataFrame {
    return this.process.info(df);
  }
  /**
   * This method is used to get the columns that have NaN values in the DataFrame.
   * @param df The DataFrame instance from which NaN columns will be retrieved.
   * @returns An array of column names that contain NaN values.
   */
  getNanColumns(df: DataFrame): string[] {
    return this.process.getNanColumns(df);
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
