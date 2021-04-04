import { Range } from './utils';

export class Matrix extends Float64Array {
  private readonly rows: number;
  private readonly columns: number;

  constructor(
    rows: number,
    columns: number,
    buffer?: Float64Array | Array<number>,
  ) {
    if (buffer) {
      super(buffer);
    } else {
      super(rows * columns);
    }
    this.rows = rows;
    this.columns = columns;
  }

  static identity(width: number) {
    const buffer = new Float64Array(width * width);
    const gap = width + 1;

    for (let i = 0; i < width; i++) {
      buffer[i * gap] = 1;
    }
    return new Matrix(width, width, buffer);
  }

  static fromArray(data: number[][]) {
    return new Matrix(
      data.length,
      data[0].length,
      data.reduce((a, b) => a.concat(b)),
    );
  }

  static product(a: Matrix, b: Matrix) {
    const rows = a.rows;
    const columns = b.columns;
    const commonSide = b.rows;
    const result = new Matrix(rows, columns);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let value = 0;
        for (let k = 0; k < commonSide; k++) {
          value += a.getAt(i, k) * b.getAt(k, j);
        }
        result.setAt(i, j, value);
      }
    }
    return result;
  }

  setAt(i: number, j: number, value: number) {
    this[i * this.columns + j] = value;
  }

  getAt(i: number, j: number) {
    return this[i * this.columns + j];
  }

  dot(b: Matrix) {
    return Matrix.product(this, b);
  }

  toArray() {
    return Range(this.rows).map(i =>
      Range(this.columns).map(j => this[i * this.columns + j]),
    );
  }
}
