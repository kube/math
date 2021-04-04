import { Vector } from '../Vector'

describe(Vector.name, () => {
  it('works', () => {
    const a = new Vector([1, 0, 0]);
    const b = new Vector([0, 1, 0]);

    const c = Vector.add(a, b)
    expect(c).toBe([1, 1, 0])
  })
})
