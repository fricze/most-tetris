export const moduleSize = 16;

const horizontalBlocks = 20;
const verticalBlocks = 10;

export const boardSize = {
  width: moduleSize * horizontalBlocks,
  height: moduleSize * verticalBlocks
};

export const bottomPositionBound = (verticalBlocks - 1) * moduleSize;
