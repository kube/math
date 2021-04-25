import { Range } from "./utils";

const { cos, sin } = Math;

function repeatChar(n: number, char = " ") {
  if (n)
    return Range(n)
      .map(() => char)
      .join("");
  else return "";
}

export class Matrix<R extends number, C extends number> extends Float64Array {
  public readonly rows: R;
  public readonly columns: C;

  constructor(rows: R, columns: C, buffer?: Float64Array | Array<number>) {
    if (buffer) {
      super(buffer);
    } else {
      super(rows * columns);
    }
    this.rows = rows;
    this.columns = columns;
  }

  static identity<W extends number>(width: W) {
    const buffer = new Float64Array(width * width);
    const gap = width + 1;

    for (let i = 0; i < width; i++) {
      buffer[i * gap] = 1;
    }
    return new Matrix(width, width, buffer);
  }

  static scale(scale: number) {
    const width = 4;
    const buffer = new Float64Array(width * width);
    const gap = width + 1;

    let i = 0;
    while (i < width - 1) {
      buffer[i * gap] = scale;
      i++;
    }
    buffer[i * gap] = 1;
    return new Matrix(width, width, buffer);
  }

  static fromArray(data: number[][]) {
    return new Matrix(
      data.length,
      data[0].length,
      data.reduce((a, b) => a.concat(b))
    );
  }

  static rotationX(t: number) {
    const c = cos(t);
    const s = sin(t);
    return new Matrix(4, 4, [1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
  }

  static rotationY(t: number) {
    const c = cos(t);
    const s = sin(t);
    return new Matrix(4, 4, [c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
  }

  static rotationZ(t: number) {
    const c = cos(t);
    const s = sin(t);
    return new Matrix(4, 4, [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  static translationX(x: number) {
    return Matrix.identity(4).setAt(3, 0, x);
  }

  static translationY(y: number) {
    return Matrix.identity(4).setAt(3, 1, y);
  }

  static translationZ(z: number) {
    return Matrix.identity(4).setAt(3, 2, z);
  }

  static translation(x: number, y: number, z: number) {
    return Matrix.identity(4).setAt(3, 0, x).setAt(3, 1, y).setAt(3, 2, z);
  }

  static product<R extends number, C extends number, X extends number>(
    a: Matrix<R, X>,
    b: Matrix<X, C>
  ) {
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
    return this;
  }

  getAt(i: number, j: number) {
    return this[i * this.columns + j];
  }

  dot<R2 extends C, C2 extends number>(b: Matrix<R2, C2>): Matrix<R, C2> {
    return Matrix.product(this, b);
  }

  toPrettyString() {
    function round(x: number) {
      return Math.floor(x * 100) / 100;
    }

    const stringRoundedCells = Array.from(this).map((cell) =>
      round(cell).toString()
    );

    const largestLength = stringRoundedCells.reduce(
      (acc, current) => Math.max(acc, current.length),
      0
    );

    function rightAlign(text: string) {
      return repeatChar(largestLength - text.length, " ") + text;
    }

    return stringRoundedCells
      .map(rightAlign)
      .map((_, i) => _ + (i % this.columns === this.columns - 1 ? "\n" : ", "))
      .join("");
  }

  toArray() {
    return Range(this.rows).map((i) =>
      Range(this.columns).map((j) => this[i * this.columns + j])
    );
  }
}
