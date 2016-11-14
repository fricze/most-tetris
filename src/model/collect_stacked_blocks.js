import { blockReachedBottom } from 'model/check_block_position';
import { bottomPositionBound } from 'data/dimensions';

const pointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

const collectStackedBlocks = ({ stackedBlocks }, activeBlock) => {
  const stackedPositions = stackedBlocks.map(
    ({ modulesPositions }) => modulesPositions
  ).reduce((acc, el) => acc.concat(el), []);

  const collision = activeBlock.modulesPositions
          .some(activePosition => stackedPositions.some(
            stackedPosition => activePosition.x === stackedPosition.x &&
              (stackedPosition.y - activePosition.y) === 16
          ));

  if ((blockReachedBottom(bottomPositionBound, activeBlock) || collision)
      && !stackedBlocks.find(({ counter }) => counter === activeBlock.counter)) {

    return {
      stackedBlocks: stackedBlocks.concat([activeBlock]),
      activeBlock,
      trashBlock: true
    }
  }

  return {
    stackedBlocks,
    activeBlock
  };
};

export default collectStackedBlocks;
