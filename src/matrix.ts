
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Vector } from './vector';

const { cos, sin } = Math;
export type Matrix = Vector[];

export const product = (matrixA: Matrix, matrixB: Matrix) => {
  const resultMatrix: Matrix = [];
  const lines = matrixA.length;
  const cols = matrixB[0].length;
  const commonSide = matrixB.length;

  for (let i = 0; i < lines; i++) {
    resultMatrix[i] = [];

    for (let j = 0; j < cols; j++) {
      let value = 0;

      for (let k = 0; k < commonSide; k++) {
        // For translation matrices, we need a 4th coordinate set to 1
        const aik = matrixA[i][k] === undefined ? 1 : matrixA[i][k];
        value += aik * matrixB[k][j];
      }
      resultMatrix[i][j] = value;
    }
  }
  return resultMatrix;
};

export const applyTransform = (matrices: Matrix[]) => {
  const matrix = matrices.reduce(product);
  return (vector: Vector) => product([vector], matrix)[0];
};

export const rotate = {
  X: (t: number) => [
    [1, 0, 0, 0],
    [0, cos(t), -sin(t), 0],
    [0, sin(t), cos(t), 0],
    [0, 0, 0, 1],
  ],

  Y: (t: number) => [
    [cos(t), 0, sin(t), 0],
    [0, 1, 0, 0],
    [-sin(t), 0, cos(t), 0],
    [0, 0, 0, 1],
  ],

  Z: (t: number) => [
    [cos(t), sin(t), 0, 0],
    [-sin(t), cos(t), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ],
};

export const scale = (s: number) => [
  [s, 0, 0, 0],
  [0, s, 0, 0],
  [0, 0, s, 0],
  [0, 0, 0, 1],
];

export const translate = ([x, y, z]: Vector) => [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [x, y, z, 1],
];
