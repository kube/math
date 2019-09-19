
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

export class Vector extends Float64Array {
  constructor(lengthOrArray: number | Float64Array | Array<number>) {
    if (typeof lengthOrArray === 'number') {
      super(lengthOrArray);
    } else {
      super(lengthOrArray);
    }
  }

  static crossProduct(a: Vector, b: Vector) {
    return new Vector(
      [a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]]
    );
  }

  static dot(a: Vector, b: Vector) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i];
    }
    return sum;
  }

  static add(a: Vector, b: Vector) {
    const result = new Vector(a.length);

    for (let i = 0; i < a.length; i++) {
      result[i] = a[i] + b[i];
    }
    return result;
  }

  static subtract(a: Vector, b: Vector) {
    const result = new Vector(a.length);

    for (let i = 0; i < a.length; i++) {
      result[i] = a[i] - b[i];
    }
    return result;
  }

  crossProduct(b: Vector) {
    return Vector.crossProduct(this, b);
  }

  dot(b: Vector) {
    return Vector.dot(this, b);
  }

  add(b: Vector) {
    return Vector.add(this, b);
  }

  subtract(b: Vector) {
    return Vector.subtract(this, b);
  }
}
