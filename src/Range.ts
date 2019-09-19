
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

export function Range(start: number, end?: number, step = 1) {
  const _start = end === undefined ? 0 : start;
  const _end = end === undefined ? start : end;
  const _length = Math.ceil((_end - _start) / step) || 1;

  return Array(_length)
    .fill(0)
    .map((_, i) => _start + i * step);
}
