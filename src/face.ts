
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { Vector, subtract, crossProduct, dotProduct } from './vector';

export type Face = Vector[];

export const normal = ([a, b, c, d]: Face) =>
  crossProduct(subtract(c, a), subtract(d, b));

export const isFaceFacingCamera = (shape: Face) => {
  const visionVector = [0, 0, -1];
  return dotProduct(normal(shape), visionVector) > 0;
};

export const facePath = (face: Face) =>
  face
    .map(([x, y], index) => [index ? 'L' : 'M', x, y].join(' '))
    .concat('Z')
    .join(' ');
