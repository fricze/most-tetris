import {
  moduleSize
} from 'data/dimensions';

const calc90DegreesTurn = rotation => rotation === 270 ? 0 : rotation + 90;
const rotateBy90 = matrix => Array(matrix[0].length).fill(null).map(
  (_, idx) => matrix.map(a => a[idx]).reverse()
);

export const moveLeft = block => ({ ...block, x: block.x - moduleSize });
export const moveRight = block => ({ ...block, x: block.x + moduleSize });
export const moveDown = block => ({ ...block, y: block.y + moduleSize });
export const turnBy90Degrees = block => ({
  ...block,
  shape: rotateBy90(block.shape),
  rotation: calc90DegreesTurn(block.rotation)
});
