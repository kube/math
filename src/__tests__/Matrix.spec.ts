import { Assert, IsExactType } from "typebolt";
import { describe, expect, it } from "vitest";
import { Matrix } from "../Matrix";

describe(Matrix.name, () => {
  describe(Matrix.product.name, () => {
    it("returns identity when multiplying two identity matrices", () => {
      const id1 = Matrix.identity(4);
      const id2 = Matrix.identity(4);

      const result = Matrix.product(id1, id2);

      Assert<IsExactType<typeof result, Matrix<4, 4>>>();

      expect(result.toArray()).toEqual(id1.toArray());
    });

    it("can multiply two matrices of different sizes", () => {
      const a = new Matrix(2, 3, [0, 3, 5, 5, 5, 2]);
      const b = new Matrix(3, 1, [3, 4, 3]);

      const result = a.dot(b);

      Assert<IsExactType<typeof result, Matrix<2, 1>>>();

      expect(result.columns).toBe(1);
      expect(result.rows).toBe(2);
      expect(result.toArray()).toEqual([[27], [41]]);
    });
  });

  describe(Matrix.identity.name, () => {
    it("returns a matrix with diagonals of ones", () => {
      const result2 = Matrix.identity(2);
      Assert<IsExactType<typeof result2, Matrix<2, 2>>>();
      expect(result2.toArray()).toEqual([
        [1, 0],
        [0, 1],
      ]);

      const result3 = Matrix.identity(3);
      Assert<IsExactType<typeof result3, Matrix<3, 3>>>();
      expect(result3.toArray()).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]);

      const result4 = Matrix.identity(4);
      Assert<IsExactType<typeof result4, Matrix<4, 4>>>();
      expect(result4.toArray()).toEqual([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ]);
    });
  });

  describe(Matrix.translation.name, () => {
    it("should return a matrix which when multiplied, should translate a matrix", () => {
      const translationMatrix = Matrix.translation(1, 2, 3);
      const vector = new Matrix(1, 4, [0, 0, 0, 1]);

      const result = vector.dot(translationMatrix);

      Assert<IsExactType<typeof result, typeof vector>>();
      expect(result.toArray()).toEqual([[1, 2, 3, 1]]);
    });

    it("should create new translation matrices by multiplying two together", () => {
      const t1 = Matrix.translation(1, 2, 3);
      const t2 = Matrix.translation(7, 5, 3);

      const result = t1.dot(t2);
      const expected = Matrix.translation(8, 7, 6);

      Assert<IsExactType<typeof result, typeof expected>>();
      expect(result).toEqual(expected);
    });

    it("should return an identity matrix if multiplying two inverse translations", () => {
      const t1 = Matrix.translation(1, 2, 3);
      const t2 = Matrix.translation(-1, -2, -3);

      const result = t1.dot(t2);
      const expected = Matrix.identity(4);

      Assert<IsExactType<typeof result, typeof expected>>();
      expect(result).toEqual(expected);
    });
  });

  describe(Matrix.prototype.cofactor.name, () => {
    it("should compute the cofactor for a submatrix element", () => {
      const m = Matrix.fromArray([
        [3, 5, 0],
        [2, -1, 7],
        [6, -1, 5],
      ]);
      const cof00 = m.cofactor(0, 0);
      Assert<IsExactType<typeof cof00, number>>();
      expect(cof00).toBe(2);

      const cof01 = m.cofactor(0, 1);
      Assert<IsExactType<typeof cof01, number>>();
      expect(cof01).toBe(32);
    });
  });

  describe(Matrix.prototype.determinant.name, () => {
    it("should compute the determinant of a 2x2 matrix", () => {
      const m2 = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ]);
      const det2 = m2.determinant();
      Assert<IsExactType<typeof det2, number>>();
      expect(det2).toBe(-2);
    });

    it("should compute the determinant of a 3x3 matrix", () => {
      const m3 = Matrix.fromArray([
        [3, 5, 0],
        [2, -1, 7],
        [6, -1, 5],
      ]);
      const det3 = m3.determinant();
      Assert<IsExactType<typeof det3, number>>();
      expect(det3).toBe(166);
    });

    it("should compute the determinant of a 4x4 matrix", () => {
      const m4 = Matrix.fromArray([
        [1, 0, 2, -1],
        [3, 0, 0, 5],
        [2, 1, 4, -3],
        [1, 0, 5, 0],
      ]);
      const det4 = m4.determinant();
      Assert<IsExactType<typeof det4, number>>();
      expect(det4).toBe(30);
    });

    it("should compute the determinant of a 5x5 matrix", () => {
      const m5 = Matrix.fromArray([
        [1, 2, 3, 4, 5],
        [0, 6, 7, 8, 9],
        [0, 0, 10, 11, 12],
        [0, 0, 0, 13, 14],
        [0, 0, 0, 0, 15],
      ]);
      const det5 = m5.determinant();
      Assert<IsExactType<typeof det5, number>>();
      expect(det5).toBe(11700);
    });

    it("should compute the determinant of a 6x6 matrix", () => {
      const m6 = Matrix.fromArray([
        [1, 2, 3, 4, 5, 6],
        [0, 7, 8, 9, 10, 11],
        [0, 0, 12, 13, 14, 15],
        [0, 0, 0, 16, 17, 18],
        [0, 0, 0, 0, 19, 20],
        [0, 0, 0, 0, 0, 21],
      ]);
      const det6 = m6.determinant();
      Assert<IsExactType<typeof det6, number>>();
      expect(det6).toBe(536256);
    });
  });

  describe(Matrix.prototype.transpose.name, () => {
    it("should transpose a rectangular matrix", () => {
      const m = Matrix.fromArray([
        [1, 2, 3],
        [4, 5, 6],
      ]);
      const t = m.transpose();
      Assert<IsExactType<typeof t, Matrix<number, number>>>();
      expect(t.toArray()).toEqual([
        [1, 4],
        [2, 5],
        [3, 6],
      ]);
    });

    it("should transpose a square matrix", () => {
      const m2 = Matrix.fromArray([
        [1, 2],
        [3, 4],
      ]);
      const t2 = m2.transpose();
      Assert<IsExactType<typeof t2, Matrix<number, number>>>();
      expect(t2.toArray()).toEqual([
        [1, 3],
        [2, 4],
      ]);
    });
  });

  describe(Matrix.prototype.inverse.name, () => {
    it("should invert a 2x2 matrix", () => {
      const m = Matrix.fromArray([
        [4, 7],
        [2, 6],
      ]);
      const inv = m.inverse();
      Assert<IsExactType<typeof inv, Matrix<number, number>>>();
      expect(inv.toArray()).toEqual([
        [0.6, -0.7],
        [-0.2, 0.4],
      ]);
    });

    it("should throw on singular matrix", () => {
      const m = Matrix.fromArray([
        [1, 2],
        [2, 4],
      ]);
      expect(() => m.inverse()).toThrowError(
        "Matrix is singular and cannot be inverted"
      );
    });

    it("should invert a 3x3 matrix", () => {
      const m3 = Matrix.fromArray([
        [1, 2, 3],
        [0, 1, 4],
        [5, 6, 0],
      ]);
      const inv3 = m3.inverse();
      Assert<IsExactType<typeof inv3, Matrix<number, number>>>();
      expect(inv3.toArray()).toEqual([
        [-24, 18, 5],
        [20, -15, -4],
        [-5, 4, 1],
      ]);
    });

    it("should invert a 4x4 scale matrix", () => {
      const m = Matrix.scale(2);
      const inv = m.inverse();
      Assert<IsExactType<typeof inv, Matrix<4, 4>>>();
      const expected = Matrix.scale(0.5);
      expect(inv.toPrettyString()).toEqual(expected.toPrettyString());
    });
  });
});
