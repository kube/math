import { Matrix } from "./Matrix.js";

type X1 = [number];
type X2 = [number, number];
type X3 = [number, number, number];
type X4 = [number, number, number, number];

type X<N extends number> = (X1 | X2 | X3 | X4) & { length: N };

type Length = 1 | 2 | 3 | 4;

export class Vector<N extends Length> extends Float64Array {
  declare length: N;

  constructor(lengthOrArray: N | X<N> | Matrix<1, N>) {
    if (typeof lengthOrArray === "number") {
      super(lengthOrArray);
    } else if (lengthOrArray instanceof Matrix) {
      super(lengthOrArray);
    } else {
      super(lengthOrArray);
    }
  }

  static cross(a: Vector<3>, b: Vector<3>): Vector<3>;
  static cross<N extends Length, N2 extends N>(
    a: Vector<N>,
    b: Vector<N2>
  ): Vector<Length> {
    return new Vector([
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ]);
  }

  static dot<N extends Length, N2 extends N>(a: Vector<N>, b: Vector<N2>) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i];
    }
    return sum;
  }

  static add<N extends Length, N2 extends N>(a: Vector<N>, b: Vector<N2>) {
    const result = new Vector(a.length);

    for (let i = 0; i < a.length; i++) {
      result[i] = a[i] + b[i];
    }
    return result;
  }

  static subtract<N extends Length, N2 extends N>(a: Vector<N>, b: Vector<N2>) {
    const result = new Vector(a.length);

    for (let i = 0; i < a.length; i++) {
      result[i] = a[i] - b[i];
    }
    return result;
  }

  // TODO: Should throw if N is not 3
  // Possibly method should not be displayed
  cross(b: Vector<N>) {
    return Vector.cross(this, b);
  }

  // TODO: Move in Math repository
  // TODO: Move in Math repository
  // TODO: Move in Math repository
  multiplyByMatrix<W extends N>(matrix: Matrix<W, W>) {
    return new Vector(Matrix.product(new Matrix(1, this.length, this), matrix));
  }

  dot(b: Vector<N>) {
    return Vector.dot(this, b);
  }

  add(b: Vector<N>) {
    return Vector.add(this, b);
  }

  subtract(b: Vector<N>) {
    return Vector.subtract(this, b);
  }

  rotateX(angle: number) {
    // @ts-expect-error
    return this.multiplyByMatrix(Matrix.rotationX(angle));
  }

  rotateY(angle: number) {
    // @ts-expect-error
    return this.multiplyByMatrix(Matrix.rotationY(angle));
  }

  rotateZ(angle: number) {
    // @ts-expect-error
    return this.multiplyByMatrix(Matrix.rotationZ(angle));
  }

  rotate(axis: Vector<4>, angle: number) {
    // @ts-expect-error
    return this.multiplyByMatrix(Matrix.rotation(axis, angle));
  }

  norm() {
    return Math.sqrt(Vector.dot(this, this));
  }

  normalize() {
    const norm = this.norm();
    const result = new Vector(this.length);

    for (let i = 0; i < this.length; i++) {
      result[i] = this[i] / norm;
    }
    return result;
  }

  toArray() {
    return Array.from(this);
  }
}
