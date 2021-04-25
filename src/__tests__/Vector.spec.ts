import { Assert, IsExactType } from "typebolt";
import { Vector } from "../Vector";

describe(Vector.name, () => {
  describe(Vector.cross.name, () => {
    it("should statically verify that vectors are of length 3", () => {
      // @ts-expect-error
      Vector.cross(new Vector([1]), new Vector([1]));
      // @ts-expect-error
      Vector.cross(new Vector([1, 2]), new Vector([1, 2]));
      // @ts-expect-error
      Vector.cross(new Vector([1, 2, 3, 4]), new Vector([1, 2, 3, 4]));
      // @ts-check It should work with length of 3
      Vector.cross(new Vector([1, 2, 3]), new Vector([1, 2, 3]));
    });

    it("should compute the cross product of two 3-vectors", () => {
      expect(
        Vector.cross(new Vector([1, 0, 0]), new Vector([0, 1, 0])).toArray()
      ).toStrictEqual([0, 0, 1]);
      expect(
        Vector.cross(new Vector([1, 0, 0]), new Vector([0, -1, 0])).toArray()
      ).toStrictEqual([0, 0, -1]);
    });
  });

  describe(Vector.dot.name, () => {
    it("should statically verify that vectors have same length", () => {
      // @ts-expect-error
      Vector.dot(new Vector([1]), new Vector([1, 2]));
      // @ts-expect-error
      Vector.dot(new Vector([1, 2]), new Vector([1, 2, 3]));
      // @ts-expect-error
      Vector.dot(new Vector([1, 2, 3]), new Vector([1, 2, 3, 4]));
    });
  });

  describe(Vector.add.name, () => {
    it("should statically verify that vectors have same length", () => {
      // @ts-expect-error
      Vector.add(new Vector([1]), new Vector([1, 2]));
      // @ts-expect-error
      Vector.add(new Vector([1, 2]), new Vector([1, 2, 3]));
      // @ts-expect-error
      Vector.add(new Vector([1, 2, 3]), new Vector([1, 2, 3, 4]));
    });

    it("adds two vectors", () => {
      const a = Vector.add(new Vector([4]), new Vector([2]));
      expect(a.toArray()).toEqual([6]);

      const b = Vector.add(new Vector([1, 0, 0]), new Vector([0, 1, 0]));
      expect(b.toArray()).toEqual([1, 1, 0]);

      const c = Vector.add(new Vector([1, 0, 0, 1]), new Vector([0, 1, 0, 1]));
      expect(c.toArray()).toEqual([1, 1, 0, 2]);
    });

    describe("Fluent-style", () => {
      describe(Vector.prototype.add, () => {
        it("returns same as static method", () => {
          const a = new Vector([1, 2, 3]);
          const b = new Vector([1, 2, 3]);

          const fluent = a.add(b);
          const classic = Vector.add(a, b);

          Assert<IsExactType<typeof fluent, typeof classic>>();
          expect(fluent).toEqual(classic);
        });
      });

      describe(Vector.prototype.cross, () => {
        it("returns same as static method", () => {
          const a = new Vector([1, 2, 3]);
          const b = new Vector([1, 2, 3]);

          const fluent = a.cross(b);
          const classic = Vector.cross(a, b);

          Assert<IsExactType<typeof fluent, typeof classic>>();
          expect(fluent).toEqual(classic);
        });
      });
    });
  });
});
