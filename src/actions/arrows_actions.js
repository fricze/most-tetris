import {
  moduleSize
} from '../data/dimensions';

const calc90DegreesTurn = rotation => rotation === 270 ? 0 : rotation + 90;
const transpose = matrix => matrix[0].map((x,i) => matrix.map(x => x[i]));

export const moveLeft = block => ({ ...block, x: block.x - moduleSize });
export const moveRight = block => ({ ...block, x: block.x + moduleSize });
export const moveDown = block => ({ ...block, y: block.y + moduleSize });
export const turnBy90Degrees = block => ({
  ...block,
  shape: transpose(block.shape),
  rotation: calc90DegreesTurn(block.rotation)
});

export const arrowsActions = {
  ArrowUp: turnBy90Degrees,
  ArrowDown: moveDown,
  ArrowLeft: moveLeft,
  ArrowRight: moveRight
};

export const arrowsActionsNames = Object.keys(arrowsActions);
