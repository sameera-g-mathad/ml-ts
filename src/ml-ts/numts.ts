type arrayType = number[][];
type size = [number, number];

class NDArray {
  shape: size = [0, 0];
  array: arrayType;
  /**
   * @constructor  Pass an array of n-dimensions.
   * @param {arrayType} arr Array needs to be either Number or strings for now.
   */
  constructor(arr: arrayType) {
    /**
     * @type {arrayType}
     */
    this.array = arr;
    this.shape[0] = this.array.length;
    this.shape[1] = this.array[0].length;
  }

  /**
   *
   * @description - This method is u
   * @param size Array of Numbers
   * @returns instance of Numts with an array filled with specified values
   */
  createAndFill(size: size = [1, 1], fillValue: number = 0): NDArray {
    const [row, col] = size;
    const newArray: arrayType = [];
    for (let i = 0; i < row; i++) {
      newArray.push([]);
      for (let j = 0; j < col; j++) {
        newArray[i].push(fillValue);
      }
    }
    return new NDArray(newArray);
  }

  /**
   * @returns Transpose of a matrix
   * @example a = [
   * [1, 2, 3],
   * [4, 5, 6],
   * [7, 8, 9]
   * ]
   * output:
   *  a = [
   * [1, 4, 7],
   * [2, 5, 8],
   * [3, 6, 9]
   * ]
   */
  get T(): NDArray {
    const [row, col] = this.shape;
    const newArray = this.createAndFill([col, row]);
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        newArray.array[j][i] = this.array[i][j];
      }
    }
    return newArray;
  }
}

class Operations {
  dotArrayWithArray(ndarray: NDArray, ndarray2: NDArray): number {
    let [row, col] = ndarray.shape;
    let [row2, col2] = ndarray2.shape;
    if (row !== col2 || col !== row2)
      throw new Error('Dimensions do not match');

    let result = 0;
    for (let i = 0; i < ndarray.array.length; i++) {
      for (let j = 0; j < ndarray.array[i].length; j++) {
        result += ndarray.array[i][j] * ndarray2.array[j][i];
      }
    }
    return result;
  }
  dotArrayWithNumber(ndarray: NDArray, num: number): NDArray {
    let newObj: NDArray = ndarray.createAndFill();
    for (let i = 0; i < ndarray.array.length; i++) {
      for (let j = 0; j < ndarray.array[i].length; j++) {
        newObj.array[i][j] = ndarray.array[i][j] * num;
      }
    }
    return newObj;
  }
}

class Numts {
  private ndarray: NDArray;
  private operations: Operations;

  constructor() {
    this.ndarray = new NDArray([[]]);
    this.operations = new Operations();
  }

  // Array Creation
  array(arr: arrayType): NDArray {
    let columns = arr[0].length;
    for (let i = 1; i < arr.length; i++) {
      if (columns !== arr[i].length) {
        throw Error(
          'The values in the column does not match the overall dimensions'
        );
      }
    }
    this.ndarray = new NDArray(arr);
    return this.ndarray;
  }

  // Array Creation
  /**
   *
   * @description - This method is u
   * @param size Array of Numbers
   * @returns instance of Numts with an array filled with specified values
   */
  zeros(size: size = [1, 1]): NDArray {
    return this.ndarray.createAndFill(size);
  }

  // Array Manipulation

  // Method Overloading Declarations
  dot(a: NDArray, b: NDArray): number;
  dot(a: NDArray, b: number): NDArray;
  dot(a: number, b: NDArray): NDArray;

  dot(a: NDArray | number, b: NDArray | number): NDArray | number {
    if (a instanceof NDArray && b instanceof NDArray) {
      return this.operations.dotArrayWithArray(a, b);
    } else if (a instanceof NDArray && typeof b === 'number') {
      this.ndarray = this.operations.dotArrayWithNumber(a, b);
    } else if (typeof a === 'number' && b instanceof NDArray) {
      this.ndarray = this.operations.dotArrayWithNumber(b, a);
    }
    return this.ndarray;
  }
}

export const nt = new Numts();
