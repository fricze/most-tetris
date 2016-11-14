import { curry } from 'fn';
import {
  Just,
  Const
} from 'const_value';

const pointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

const checkNeighborsClash = (neighborsModulesPositions, oldBlock, { activeBlock }) => {
  const { modulesPositions } = activeBlock;

  const collision = modulesPositions
          .some(activePosition => neighborsModulesPositions.some(
            neighborPosition => pointsEqual(activePosition, neighborPosition)
          ));

  if (collision) {
    return Const({
      activeBlock: {
        ...activeBlock,
        x: oldBlock.x
      }
    });
  }

  return Just({ activeBlock });
};

export default curry(checkNeighborsClash);
