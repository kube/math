
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

export type Vector = number[];

export const subtract = (a: Vector, b: Vector) => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];

export const crossProduct = (a: Vector, b: Vector) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

export const dotProduct = (a: Vector, b: Vector) =>
  a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
