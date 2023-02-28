import { Assert, IsExactType } from "typebolt";
import { describe, it, expect } from "vitest";
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
});
