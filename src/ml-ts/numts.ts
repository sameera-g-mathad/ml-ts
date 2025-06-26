type arrayType = number[][];
type size = [number, number];

export class NDArray {
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
  copy(): NDArray {
    let newArray = this.createAndFill(this.shape);
    for (let i = 0; i < this.shape[0]; i++) {
      for (let j = 0; j < this.shape[1]; j++) {
        newArray.array[i][j] = this.array[i][j];
      }
    }
    return newArray;
  }
}

class Operations {
  operate(a: number, b: number, operation: string): number {
    switch (operation) {
      case 'add':
        return a + b;
      case 'subtract':
        return a - b;
      case 'multiply':
        return a * b;
      case 'divide':
        return a / b;
      default:
        return a * b;
    }
  }
  /**
   *
   * @description If the dimensions are matched, i.e (row_of_first_vector = row_of_second_vector && col_of_first_vector === col_of_second_vector), then
   * element wise math operations (add, subtract, multipy, divide) takes place.
   * @param {NDArray} vectorA
   * @param {NDArray} vectorB
   * @param {string} operation Is a crucial parameter. Based on this parameter, element wise math operations (add, subtract, multipy, divide) takes place.
   * @returns
   * - Throws error if the dimensions of both **NDArray** are not equal.
   * - Returns new NDArray, of size (col_of_first_vector, row_of_second_vector).
   *
   */
  operateArrayWithArray(
    vectorA: NDArray,
    vectorB: NDArray,
    operation: string
  ): NDArray {
    let [rowDimA, colDimA] = vectorA.shape;
    let [rowDimB, colDimB] = vectorB.shape;
    if (rowDimA !== rowDimB || colDimA !== colDimB)
      throw new Error(
        `Dimensions (${rowDimA}, ${colDimA}), (${rowDimB}, ${colDimB})  do not match`
      );
    let operatedArray = nt.zeros([rowDimA, colDimB]);
    for (let i = 0; i < rowDimA; i++) {
      for (let j = 0; j < colDimA; j++) {
        operatedArray.array[i][j] = this.operate(
          vectorA.array[i][j],
          vectorB.array[i][j],
          operation
        );
      }
    }
    return operatedArray;
  }
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
   * @param ndArray
   * @param num
   * @returns  New array which is broadcasted by the num parameter on the ndArray parameter.
   */
  operateArrayWithNumber(
    ndArray: NDArray,
    num: number,
    operation: string = 'dot'
  ): NDArray {
    let newObj: NDArray = nt.zeros(ndArray.shape);
    for (let i = 0; i < ndArray.array.length; i++) {
      for (let j = 0; j < ndArray.array[i].length; j++) {
        newObj.array[i][j] = this.operate(ndArray.array[i][j], num, operation);
      }
    }
    return newObj;
  }

  absOfNumber(num: number): number {
    if (num < 0) return num * -1;
    return num;
  }
  absOfArray(ndArray: NDArray): NDArray {
    let [m, n] = ndArray.shape;
    let newArray = nt.zeros([m, n]);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        newArray.array[i][j] = this.absOfNumber(ndArray.array[i][j]);
      }
    }
    return newArray;
  }
}

class Exponent {
  /**
   * @description - This method is used to calculate the value of a base given a power value.
   * @param base - Must be a number whose value will be raised to the power value provided
   * @param exponent - Must be a number.
   * @returns - base ^ exponent
   */
  powerOfNumber(base: number, exponent: number): number {
    const powFunc = (base: number, exponent: number): number => {
      if (exponent === 0) return 1;
      if (exponent % 2 === 0) return powFunc(base * base, exponent / 2);
      else return powFunc(base * base, (exponent - 1) / 2) * base;
    };
    if (exponent < 0) return 1 / powFunc(base, exponent);
    return powFunc(base, exponent);
  }
  /**
   * @description - This method is used to calculate the ndarray of a base given a power value.
   * @param ndArray
   * @param exponent - Must be a number.
   * @returns - [ndarray] ^ exponent
   */
  powerOArray(ndArray: NDArray, exponent: number): NDArray {
    let [m, n] = ndArray.shape;
    let newArray = nt.zeros([m, n]);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        newArray.array[i][j] = this.powerOfNumber(
          ndArray.array[i][j],
          exponent
        );
      }
    }
    return newArray;
  }

  /**
   * @description - This method is used to calculate the exponent of the value x provided. This method uses Tayler series for computing exponents.
   * exp(x) = 1 + x + (x^2/ 2!) + (x^3/ 3!) + (x^4/ 4!) + ..... iterations provided
   * @param x
   * @param iterations - Must be a number. Default set to 50
   * @returns - e ^ x
   */

  expOfNumber(x: number, n: number = 1, iterations: number = 50): number {
    if (iterations === 0) return 1;
    return 1 + (x / n) * this.expOfNumber(x, n + 1, iterations - 1);
  }

  /**
   * @description - This method is used to calculate the exponent of the value x provided. This method uses Tayler series for computing exponents.
   * exp(x) = 1 + x + (x^2/ 2!) + (x^3/ 3!) + (x^4/ 4!) + ..... iterations provided
   * @param ndArray
   * @param iterations - Must be a number. Default set to 50
   * @returns - e ^ [ndarray]
   */
  expOfArray(ndArray: NDArray, iterations: number = 50): NDArray {
    let [m, n] = ndArray.shape;
    let newArray = nt.zeros([m, n]);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        newArray.array[i][j] = this.expOfNumber(ndArray.array[i][j]);
      }
    }
    return newArray;
  }

  /**
   * @description - This method is used to calculate the log of a x given base
   * @param x
   * @param base - Provide a value greater than 0
   * @returns - log(x, base)
   */
  logOfNumber(x: number, base: number = 2.718281828459045): number {
    if (x === 1) return 0;
    if (x <= 0) throw Error('Values for logarithms should be greater than 0');
    switch (base) {
      case 2:
        return Math.log2(x);
      case 10:
        return Math.log10(x);
      case nt.E:
        return Math.log(x);
      default:
        return Math.log(x) / Math.log(base);
    }
  }
  /**
   * @description - This method is used to calculate the log of a x given base for ndarray
   * @param ndArray
   * @param base
   * @returns - log(ndarry, base)
   */
  logOfArray(ndArray: NDArray, base: number): NDArray {
    let [m, n] = ndArray.shape;
    let newArray = nt.zeros([m, n]);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        newArray.array[i][j] = this.logOfNumber(ndArray.array[i][j], base);
      }
    }
    return newArray;
  }
  // Logarithms using Newton's method (Expensive) as it internally uses exp method
  // naturalLogOfNumber(
  //   x: number,
  //   iterations: number = 25,
  //   tolerance: number = 0.0001
  // ): number {
  //   let initialGuess = 1;
  //   for (let i = 0; i < iterations; i++) {
  //     let initialGuessExp = this.expOfNumber(initialGuess);
  //     let newGuess = initialGuess - (initialGuessExp - x) / initialGuessExp;
  //     if (nt.abs(newGuess - initialGuess) < tolerance) return newGuess;
  //     initialGuess = newGuess;
  //   }
  //   return initialGuess;
  // }

  /**
   * @description - Returns sqaure root of a number
   * @param n - Must be greater than zero
   * @returns - √(n)
   */
  sqrtOfNumber(n: number): number {
    if (n === 0) return 0;
    if (n < 0) throw Error('Invalid value encountered ');
    let l = 0,
      h = n;
    let sqrtGuess = 0;
    while (l <= h) {
      let mid = Math.floor(l + h) / 2;
      let guess = mid * mid;
      if (guess === n) {
        sqrtGuess = guess;
        break;
      } else if (guess > n) h = mid - 1;
      else l = mid + 1;
    }
    sqrtGuess = h;
    while (nt.abs(sqrtGuess * sqrtGuess - n) > 0.0000001) {
      sqrtGuess = (sqrtGuess + n / sqrtGuess) / 2;
    }
    return sqrtGuess;
  }
  /**
   * @description - Returns sqaure root of ndarray
   * @param ndArray - Must be greater than zero
   * @returns - √(ndarry)
   */
  sqrtOfArray(ndArray: NDArray): NDArray {
    let [m, n] = ndArray.shape;
    let newArray = nt.zeros([m, n]);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        newArray.array[i][j] = this.sqrtOfNumber(ndArray.array[i][j]);
      }
    }
    return newArray;
  }
}

class Statistics {
  sum(ndArray: NDArray): NDArray {
    const result = nt.zeros([1, ndArray.shape[1]]);
    for (let i = 0; i < ndArray.shape[0]; i++) {
      for (let j = 0; j < ndArray.shape[1]; j++) {
        result.array[0][j] += ndArray.array[i][j];
      }
    }
    return result;
  }
  mean(ndArray: NDArray): NDArray {
    const sumOfArray = this.sum(ndArray);
    const n = ndArray.shape[0];
    for (let i = 0; i < sumOfArray.shape[1]; i++) {
      sumOfArray.array[0][i] /= n;
    }
    return sumOfArray;
  }
  count(ndArray: NDArray): number {
    return ndArray.shape[0];
  }
  variance(ndArray: NDArray, divide_by_n: boolean = true): NDArray {
    const meanOfArray = this.mean(ndArray);
    const varOfArray = nt.zeros([1, ndArray.shape[1]]);
    const n = divide_by_n ? ndArray.shape[0] : ndArray.shape[0] - 1;
    for (let i = 0; i < ndArray.shape[0]; i++) {
      for (let j = 0; j < ndArray.shape[1]; j++) {
        varOfArray.array[0][j] += nt.pow(
          ndArray.array[i][j] - meanOfArray.array[0][j],
          2
        );
      }
    }
    for (let i = 0; i < ndArray.shape[1]; i++) {
      varOfArray.array[0][i] /= n;
    }
    return varOfArray;
  }
  sort(ndArray: NDArray): NDArray {
    for (let row = 0; row < ndArray.shape[0]; row++) {
      ndArray.array[row] = ndArray.array[row].sort((a, b) => a - b);
    }
    return ndArray;
  }
  median(ndArray: NDArray): NDArray {
    const medianOfArray = nt.zeros([1, ndArray.shape[1]]);
    const sortedArray = nt.sort(ndArray.copy().T);
    const even = ndArray.shape[0] % 2 === 0 ? true : false;
    const m = even ? ndArray.shape[0] / 2 - 1 : (ndArray.shape[0] + 1) / 2;
    for (let i = 0; i < ndArray.shape[1]; i++) {
      medianOfArray.array[0][i] = even
        ? (sortedArray.array[i][m] + sortedArray.array[i][m + 1]) / 2
        : sortedArray.array[i][m];
    }
    return medianOfArray;
  }
  // q1(ndArray: NDArray): NDArray {
  //   const q1Array = nt.zeros([1, ndArray.shape[1]]);
  //   const sortedArray = nt.sort(ndArray.copy().T);
  //   const even = ndArray.shape[0] % 2 === 0 ? true : false;
  //   const m = even ? ndArray.shape[0] / 2 - 1 : ndArray.shape[0] / 2;
  //   const q1 = even ? (m + 1) / 2 : (m - 1) / 2 - 1;
  //   for (let i = 0; i < ndArray.shape[1]; i++) {
  //     q1Array.array[0][i] = even
  //       ? sortedArray.array[i][q1]
  //       : (sortedArray.array[i][q1] + sortedArray.array[i][q1 + 1]) / 2;
  //   }
  //   return q1Array;
  // }
  quantiles(ndArray: NDArray, q: 0.25 | 0.5 | 0.75 = 0.5): NDArray {
    switch (q) {
      // case 0.25:
      //   return this.q1(ndArray);
      case 0.5:
        return this.median(ndArray);
      default:
        return this.median(ndArray);
    }
  }
}

class Numts {
  private ndarray: NDArray;
  private operations: Operations;
  private exponent: Exponent;
  private statistics: Statistics;
  E: number = 2.718281828459045;
  constructor() {
    this.ndarray = new NDArray([[]]);
    this.operations = new Operations();
    this.exponent = new Exponent();
    this.statistics = new Statistics();
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

  copy(ndArray: NDArray) {
    return ndArray.copy();
  }

  // Array Manipulation
  // Method Overloading Declarations ----> Addition
  /**
   * @description This method is for performing addition between two vectors or matrices.
   * @param a - Can be a number or a instance of NDArray.
   * @param b - Can be a number or a instance of NDArray.
   * @returns
   * - Returns new array by adding both parameters **a** and **b** are of ***NDArray***.
   * - If any one of the parameters is a number, then broadcasting (elementwise addition) is performed on the vector.
   */
  add(a: NDArray, b: NDArray): NDArray;
  add(a: NDArray, b: number): NDArray;
  add(a: number, b: NDArray): NDArray;

  add(a: NDArray | number, b: NDArray | number): NDArray | number {
    // Handles if both the vectors are of type NDArray
    if (a instanceof NDArray && b instanceof NDArray) {
      return this.operations.operateArrayWithArray(a, b, 'add');
    }
    // If one of the parameters (@param b here)is a number, element wise addition is performed.
    else if (a instanceof NDArray && typeof b === 'number') {
      this.ndarray = this.operations.operateArrayWithNumber(a, b, 'add');
    }
    // If one of the parameters (@param a here)is a number, element wise addition is performed.
    else if (typeof a === 'number' && b instanceof NDArray) {
      this.ndarray = this.operations.operateArrayWithNumber(b, a, 'add');
    }
    return this.ndarray;
  }

  // Method Overloading Declarations ----> Subtraction
  /**
   * @description This method is for performing subtraction between two vectors or matrices.
   * @param a - Can be a number or a instance of NDArray.
   * @param b - Can be a number or a instance of NDArray.
   * @returns
   * - Returns new array by subtracting both parameters **a** and **b** are of ***NDArray***.
   * - If any one of the parameters is a number, then broadcasting (elementwise subtraction) is performed on the vector.
   */
  sub(a: NDArray, b: NDArray): NDArray;
  sub(a: NDArray, b: number): NDArray;
  sub(a: number, b: NDArray): NDArray;

  sub(a: NDArray | number, b: NDArray | number): NDArray | number {
    // Handles if both the vectors are of type NDArray
    if (a instanceof NDArray && b instanceof NDArray) {
      return this.operations.operateArrayWithArray(a, b, 'subtract');
    }
    // If one of the parameters (@param b here)is a number, element wise subtraction is performed.
    else if (a instanceof NDArray && typeof b === 'number') {
      this.ndarray = this.operations.operateArrayWithNumber(a, b, 'subtract');
    }
    // If one of the parameters (@param a here)is a number, element wise subtraction is performed.
    else if (typeof a === 'number' && b instanceof NDArray) {
      this.ndarray = this.operations.operateArrayWithNumber(b, a, 'subtract');
    }
    return this.ndarray;
  }
  // Method Overloading Declarations ----> Multiplication
  /**
   * @description This method is for performing subtraction between two vectors or matrices.
   * @param a - Can be a number or a instance of NDArray.
   * @param b - Can be a number or a instance of NDArray.
   * @returns
   * - Returns new array by subtracting both parameters **a** and **b** are of ***NDArray***.
   * - If any one of the parameters is a number, then broadcasting (elementwise multiplication) is performed on the vector.
   */
  mul(a: NDArray, b: NDArray): NDArray;
  mul(a: NDArray, b: number): NDArray;
  mul(a: number, b: NDArray): NDArray;

  mul(a: NDArray | number, b: NDArray | number): NDArray | number {
    // Handles if both the vectors are of type NDArray
    if (a instanceof NDArray && b instanceof NDArray) {
      return this.operations.operateArrayWithArray(a, b, 'multiply');
    }
    // If one of the parameters (@param b here)is a number, element wise multiplication is performed.
    else if (a instanceof NDArray && typeof b === 'number') {
      this.ndarray = this.operations.operateArrayWithNumber(a, b, 'multiply');
    }
    // If one of the parameters (@param a here)is a number, element wise multiplication is performed.
    else if (typeof a === 'number' && b instanceof NDArray) {
      this.ndarray = this.operations.operateArrayWithNumber(b, a, 'multiply');
    }
    return this.ndarray;
  }

  // Method Overloading Declarations ----> Dot product
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
    // If one of the parameters (@param b here)is a number, element wise multiplication is performed.
    else if (a instanceof NDArray && typeof b === 'number') {
      this.ndarray = this.operations.operateArrayWithNumber(a, b, 'dot');
    }
    // If one of the parameters (@param a here)is a number, element wise multiplication is performed.
    else if (typeof a === 'number' && b instanceof NDArray) {
      this.ndarray = this.operations.operateArrayWithNumber(b, a, 'dot');
    }
    return this.ndarray;
  }

  // Method Overloading Declarations ----> Division
  /**
   * @description This method is for performing subtraction between two vectors or matrices.
   * @param a - Can be a number or a instance of NDArray.
   * @param b - Can be a number or a instance of NDArray.
   * @returns
   * - Returns new array by subtracting both parameters **a** and **b** are of ***NDArray***.
   * - If any one of the parameters is a number, then broadcasting (elementwise division) is performed on the vector.
   */
  by(a: NDArray, b: NDArray): NDArray;
  by(a: NDArray, b: number): NDArray;
  by(a: number, b: NDArray): NDArray;

  by(a: NDArray | number, b: NDArray | number): NDArray | number {
    // Handles if both the vectors are of type NDArray
    if (a instanceof NDArray && b instanceof NDArray) {
      return this.operations.operateArrayWithArray(a, b, 'divide');
    }
    // If one of the parameters (@param b here)is a number, element wise division is performed.
    else if (a instanceof NDArray && typeof b === 'number') {
      this.ndarray = this.operations.operateArrayWithNumber(a, b, 'divide');
    }
    // If one of the parameters (@param a here)is a number, element wise division is performed.
    else if (typeof a === 'number' && b instanceof NDArray) {
      this.ndarray = this.operations.operateArrayWithNumber(b, a, 'divide');
    }
    return this.ndarray;
  }

  /**
   * @description This method is to return the absolute value.
   * @param a - Can be a number or a instance of NDArray.
   * @returns
   * - Returns new array with absolute values if **a** is an instance of ***NDArray***.
   * - By default, returns absolute value of a number
   */
  abs(a: NDArray): NDArray;
  abs(a: number): number;
  abs(a: NDArray | number): NDArray | number {
    if (a instanceof NDArray) return this.operations.absOfArray(a);
    return this.operations.absOfNumber(a);
  }

  /**
   * @description This method is to find square root of a number or matrix.
   * @param a - Can be a number or a instance of NDArray.
   * @returns
   * - Returns new array by square rooting the elements if **a** is an instance of ***NDArray***.
   * - By default, returns square root of a number
   */
  sqrt(a: NDArray): NDArray;
  sqrt(a: number): number;
  sqrt(a: NDArray | number): NDArray | number {
    if (a instanceof NDArray) return this.exponent.sqrtOfArray(a);
    return this.exponent.sqrtOfNumber(a);
  }

  /**
   *@description This method is used to calculate power of a number.
   * @param a - Can be a number or a instance of NDArray.
   * @param b - power to raise the value of a number or values of ndarray
   * @returns
   * - Returns new array of elements raised to the power if **a** is an instance of ***NDArray***.
   * - By default, returns power of a number raised to power
   * @example
   * nt.pow(2, 3) ==== 2^3 = 8
   */
  pow(a: NDArray, b: number): NDArray;
  pow(a: number, b: number): number;
  pow(a: NDArray | number, b: number): NDArray | number {
    if (a instanceof NDArray) return this.exponent.powerOArray(a, b);
    return this.exponent.powerOfNumber(a, b);
  }
  /**
   * @description This method is used to calculate exponent of a number.
   * @param a - Can be a number or a instance of NDArray.
   * @returns
   * - Returns new array of elements that are exponent raised to param a if **a** is an instance of ***NDArray***.
   * - By default, returns exponent raised to param a
   * @example
   * nt.exp(4) =
   */
  exp(a: NDArray): NDArray;
  exp(a: number): number;
  exp(a: NDArray | number): NDArray | number {
    if (a instanceof NDArray) return this.exponent.expOfArray(a);
    return this.exponent.expOfNumber(a);
  }
  /**
   * @description - This method is used to find the natural log of a number. This method uses Math.log() internally.
   * @param a - Can be a number or a instance of NDArray. Values has to be greater than 0.
   * @returns -
   * - Returns new array with natural log of elements if **a** is an instance of ***NDArray***.
   * - By default, returns natural log of a number
   */
  ln(a: NDArray): NDArray;
  ln(a: number): number;
  ln(a: NDArray | number): NDArray | number {
    if (a instanceof NDArray) return this.exponent.logOfArray(a, nt.E);
    return this.exponent.logOfNumber(a, nt.E);
  }
  /**
   * @description - This method is used to find the log base 2 of a number. This method uses Math.log2() internally.
   * @param a - Can be a number or a instance of NDArray. Values has to be greater than 0.
   * @returns -
   * - Returns new array with log base 2 of elements if **a** is an instance of ***NDArray***.
   * - By default, returns log base 2 of a number
   */
  log2(a: NDArray): NDArray;
  log2(a: number): number;
  log2(a: NDArray | number): NDArray | number {
    if (a instanceof NDArray) return this.exponent.logOfArray(a, 2);
    return this.exponent.logOfNumber(a, 2);
  }
  /**
   * @description - This method is used to find the log base 10 of a number. This method uses Math.log10() internally.
   * @param a - Can be a number or a instance of NDArray. Values has to be greater than 0.
   * @returns -
   * - Returns new array with log base 10 of elements if **a** is an instance of ***NDArray***.
   * - By default, returns log base 10 of a number
   */
  log10(a: NDArray): NDArray;
  log10(a: number): number;
  log10(a: NDArray | number): NDArray | number {
    if (a instanceof NDArray) return this.exponent.logOfArray(a, 10);
    return this.exponent.logOfNumber(a, 10);
  }
  /**
   * @description - This method is used to find the log base provided of a number. This method calculates values as Math.log(a) / Math.log(base)  internally.
   * @param a - Can be a number or a instance of NDArray. Values has to be greater than 0.
   * @returns -
   * - Returns new array with log base specified of elements if **a** is an instance of ***NDArray***.
   * - By default, returns log base specified of a number
   */
  log(a: NDArray, base: number): NDArray;
  log(a: number, base: number): number;
  log(a: NDArray | number, base: number): NDArray | number {
    if (a instanceof NDArray) return this.exponent.logOfArray(a, base);
    return this.exponent.logOfNumber(a, base);
  }

  sum(ndArray: NDArray): NDArray {
    return this.statistics.sum(ndArray);
  }

  mean(ndArray: NDArray): NDArray {
    return this.statistics.mean(ndArray);
  }

  count(ndArray: NDArray): number {
    return this.statistics.count(ndArray);
  }

  variance(ndArray: NDArray, divide_by_n: boolean = true): NDArray {
    return this.statistics.variance(ndArray, divide_by_n);
  }
  std(ndArray: NDArray, divide_by_n: boolean = true): NDArray {
    return this.sqrt(this.variance(ndArray, divide_by_n));
  }
  sort(ndArray: NDArray): NDArray {
    return this.statistics.sort(ndArray);
  }
  median(ndArray: NDArray): NDArray {
    return this.statistics.median(ndArray);
  }
  quantile(ndArray: NDArray, q: 0.25 | 0.5 | 0.75 = 0.5) {
    return this.statistics.quantiles(ndArray, q);
  }
}

export const nt = new Numts();
