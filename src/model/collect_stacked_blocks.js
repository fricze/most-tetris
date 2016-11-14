import { blockReachedBottom } from 'model/check_block_position';
import {
  bottomPositionBound,
  boardSize,
  moduleSize
} from 'data/dimensions';
import getEachModulePosition from 'model/get_each_module_position';
import { pipe } from 'fn';
import checkBoardBoundaries from 'model/check_board_boundaries';
import checkNeighborsClash from 'model/check_neighbors_clash';
import blocksToModulesPositions from 'model/blocks_to_modules_positions';

const mergeBlockWithModulesPositions = block => ({
  ...block,
  modulesPositions: getEachModulePosition({
    block,
    moduleSize
  })
});

const collectStackedBlocks = ({ stackedBlocks, activeBlock }, transform) => {
  const stackedPositions = blocksToModulesPositions(stackedBlocks);

  const activeBlockStep = pipe(
    transform,
    mergeBlockWithModulesPositions,
    checkBoardBoundaries(boardSize, moduleSize)
  );

  const _checkNeighborsClash = checkNeighborsClash(stackedPositions, activeBlock);

  activeBlock = activeBlockStep(activeBlock);
  const { block, clash } = _checkNeighborsClash(activeBlock);

  if (clash) {
    return {
      stackedBlocks,
      activeBlock: block,
      trashBlock: false
    };
  }

  const collision = activeBlock.modulesPositions
          .some(activePosition => stackedPositions.some(
            stackedPosition => activePosition.x === stackedPosition.x &&
              (stackedPosition.y - activePosition.y) === moduleSize
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
    activeBlock,
    trashBlock: false
  };
};

export default collectStackedBlocks;
