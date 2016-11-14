import { curry } from 'fn';

const checkBoardBoundaries = (boardSize, moduleSize, block) => {
  const blockWidth = block.shape[0].length * moduleSize;

  if (block.x < 0) {
    return {
      ...block,
      x: 0
    };
  }

  if (block.x + blockWidth > boardSize.width) {
    return {
      ...block,
      x: boardSize.width - blockWidth
    };
  }

  return block;
};

export default curry(checkBoardBoundaries);
