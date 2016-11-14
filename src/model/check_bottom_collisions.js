import { curry } from 'fn';
import { blockReachedBottom } from 'model/check_block_position';
import {
  bottomPositionBound
} from 'data/dimensions';
import {
  Just,
  Const
} from 'const_value';

const checkBottomCollisions = (stackedPositions, moduleSize, stackedBlocks, { activeBlock }) => {
  const collision = activeBlock.modulesPositions
          .some(blockPosition => stackedPositions.some(
            stackedPosition => blockPosition.x === stackedPosition.x &&
              (stackedPosition.y - blockPosition.y) === moduleSize
          ));

  if ((blockReachedBottom(bottomPositionBound, activeBlock) || collision)
      && !stackedBlocks.find(({ counter }) => counter === activeBlock.counter)) {
    return Const({
      activeBlock,
      stackedBlock: activeBlock
    });
  }

  return Just({ activeBlock });
};

export default curry(checkBottomCollisions);
