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
   * @description This method is for creating an array filled with specified values. Equivalent to zeros and ones in numpy.
   * @param size Array of Numbers
   * @param fillValue Number to fill the array.
   * @returns instance of Numts.
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
   * @description To transpose the array persent in the instance referred.
   * @note  This is a property.
   * @returns Transpose of a matrix
   * @example
   * a = [
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
  /**
   *
   * @description If the inner dimensions are matched, i.e (col_of_first_vector === row_of_second_vector), then start three pointers,
   * - First for iterating rows in the first array/vector/matrix.
   * - Second for iterating the columns first array/vector/matrix and rows of second array/vector/matrix.
   * - Third for iterating the columns of second array/vector/matrix.
   * @param vectorA
   * @param vectorB
   * @returns
   * - Throws error if the col of first array/vector/matrix and row of second array/vector/matrix are not equal.
   * - Returns new NDArray, of size (col_of_first_vector, row_of_second_vector).
   *
   */
  dotArrayWithArray(vectorA: NDArray, vectorB: NDArray): NDArray {
    let [rowDimA, colDimA] = vectorA.shape;
    let [rowDimB, colDimB] = vectorB.shape;
    if (colDimA !== rowDimB)
      throw new Error(
        `Dimensions (${rowDimA}, ${colDimA}), (${rowDimB}, ${colDimB})  do not match`
      );
    let dotArray = nt.zeros([rowDimA, colDimB]);
    for (let i = 0; i < rowDimA; i++) {
      for (let j = 0; j < colDimA; j++) {
        for (let k = 0; k < colDimB; k++) {
          dotArray.array[i][k] += vectorA.array[i][j] * vectorB.array[j][k];
        }
      }
    }
    return dotArray;
  }
  /**
   * @description This is an overload for dot product method. This method is call if any one of the parameters is a number.
   * @param ndarray
   * @param num
   * @returns  New array which is broadcasted by the num parameter on the ndarray parameter.
   */
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
  /**
   *
   * @param arr - pass an array of numbers.
   * @throws Error if each row is of different length.
   * @returns Instance of **NDArray**
   */
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
   * @description  This method is u
   * @param size Array of Numbers
   * @returns instance of Numts with an array filled with specified values
   */
  zeros(size: size = [1, 1]): NDArray {
    return this.ndarray.createAndFill(size);
  }

  // Array Manipulation

  // Method Overloading Declarations
  /**
   * @description This method is for performing dot product between two vectors or matrices.
   * @param a - Can be a number or a instance of NDArray.
   * @param b - Can be a number or a instance of NDArray.
   * @returns
   * - Returns new array with dot product if both parameters **a** and **b** are of ***NDArray***.
   * - If any one of the parameters is a number, then broadcasting is performed on the vector.
   */
  dot(a: NDArray, b: NDArray): NDArray;
  dot(a: NDArray, b: number): NDArray;
  dot(a: number, b: NDArray): NDArray;

  dot(a: NDArray | number, b: NDArray | number): NDArray | number {
    // Handles if both the vectors are of type NDArray
    if (a instanceof NDArray && b instanceof NDArray) {
      return this.operations.dotArrayWithArray(a, b);
    }
    // If one of the parameters (@param b here)is a number, then all that a dot product will perform is forecasting
    else if (a instanceof NDArray && typeof b === 'number') {
      this.ndarray = this.operations.dotArrayWithNumber(a, b);
    }
    // If one of the parameters (@param a here)is a number, then all that a dot product will perform is forecasting
    else if (typeof a === 'number' && b instanceof NDArray) {
      this.ndarray = this.operations.dotArrayWithNumber(b, a);
    }
    return this.ndarray;
  }
}

export const nt = new Numts();
