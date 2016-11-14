import { curry } from 'fn';
import {
  Just,
  Const
} from 'const_value';

const checkBoardBoundaries = (boardSize, moduleSize, { activeBlock }) => {
  const blockWidth = activeBlock.shape[0].length * moduleSize;

  if (activeBlock.x < 0) {
    return Const({
      activeBlock: {
        ...activeBlock,
        x: 0
      }
    });
  }

  if (activeBlock.x + blockWidth > boardSize.width) {
    return Const({
      activeBlock: {
        ...activeBlock,
        x: boardSize.width - blockWidth
      }
    });
  }

  return Just({ activeBlock });
};

export default curry(checkBoardBoundaries);
