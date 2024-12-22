type dataframe = (string | number)[][];
type column = (number | string)[];

export class DataFrame {
  public data: dataframe;
  public columns: column;
  public shape: [number, number];
  public dtypes: string[];

  constructor(
    data: dataframe,
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

class Process {
  loadFile(
    file: File,
    header: boolean = true,
    delimiter: string = ','
  ): Promise<{ data: dataframe; index: column; shape: [number, number] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const data: dataframe = [];
      const index: column = [];
      const shape: [number, number] = [0, 0];
      reader.onload = async ({ target }) => {
        try {
          if (target && typeof target.result === 'string') {
            const fileRead = target.result.trim().split('\n');
            shape[0] = fileRead.length;
            const columns = fileRead[0].trim().split(delimiter);
            shape[1] = columns.length;
            if (header) {
              shape[0] = fileRead.length - 1;
              for (let column of columns) index.push(column);
            } else {
              for (let i = 0; i < shape[1]; i++) {
                index.push(i);
              }
            }
            let row = header ? 1 : 0;
            for (row; row < fileRead.length; row++) {
              const row_data = fileRead[row].trim().split(delimiter);
              data.push(row_data);
            }
            resolve({ data, index, shape });
          }
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }
  // loadFile(
  //   file: File,
  //   header: boolean = true,
  //   delimiter: string = ','
  // ): { data: dataframe; index: column; shape: [number, number] } {
  //   const reader = new FileReader();
  //   const data: dataframe = [];
  //   const index: column = [];
  //   const shape: [number, number] = [0, 0];
  //   let ready = false;
  //   const checker = () => {
  //     if (ready) {
  //       return
  //     }
  //     setTimeout(checker, 1000);
  //   };
  //   reader.onloadend = async ({ target }) => {
  //     try {
  //       if (target && typeof target.result === 'string') {
  //         const fileRead = target.result.trim().split('\n');
  //         shape[0] = fileRead.length;
  //         const columns = fileRead[0].trim().split(delimiter);
  //         shape[1] = columns.length;
  //         if (header) {
  //           shape[0] = fileRead.length - 1;
  //           for (let column of columns) index.push(column);
  //         } else {
  //           for (let i = 0; i < shape[1]; i++) {
  //             index.push(i);
  //           }
  //         }
  //         let row = header ? 1 : 0;
  //         for (row; row < fileRead.length; row++) {
  //           const row_data = fileRead[row].trim().split(delimiter);
  //           data.push(row_data);
  //         }
  //       }
  //       ready = true;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     reader.readAsText(file);
  //     checker();
  //   };
  // }
  process(
    data: dataframe,
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
        let new_value = parseInt(value) || parseFloat(value);
        if (isNaN(new_value)) {
          dtype_number = false;
          console.log(row, column, parseInt(value), parseFloat(value));
          break;
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

class Frame {
  private process: Process;
  constructor() {
    this.process = new Process();
  }
  async read(
    file: File,
    header: boolean,
    delimiter: string
  ): Promise<DataFrame> {
    return await this.process.read(file, header, delimiter);
  }
}

export const fr = new Frame();
