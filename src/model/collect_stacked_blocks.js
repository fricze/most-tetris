import { blockReachedBottom } from 'model/check_block_position';
import {
  bottomPositionBound,
  boardSize,
  moduleSize
} from 'data/dimensions';
import { pipe } from 'fn';
import checkBoardBoundaries from 'model/check_board_boundaries';
import checkNeighborsClash from 'model/check_neighbors_clash';
import blocksToModulesPositions from 'model/blocks_to_modules_positions';
import checkBottomCollisions from 'model/check_bottom_collisions';
import mergeBlockWithModulesPositions from 'model/merge_block_with_modules_positions';
import { identity } from 'fn';

const collectStackedBlocks = ({ stackedBlocks, activeBlock: currentActiveBlock }, transform) => {
  const stackedPositions = blocksToModulesPositions(stackedBlocks);

  const activeBlockStep = pipe(
    transform,
    mergeBlockWithModulesPositions
  );

  const newActiveBlock = activeBlockStep(currentActiveBlock);

  const {
    activeBlock,
    stackedBlock
  } = checkBoardBoundaries(boardSize, moduleSize, { activeBlock: newActiveBlock })
          .map(checkNeighborsClash(stackedPositions, currentActiveBlock))
          .map(checkBottomCollisions(stackedPositions, moduleSize, stackedBlocks))
          .valueOf();

  return {
    stackedBlocks: stackedBlocks.concat([stackedBlock]).filter(identity),
    activeBlock,
    // if stackedBlock exists, current activeBlock should be removed
    // from stream, and new one should be spawned
    trashBlock: !!stackedBlock
  };
};

export default collectStackedBlocks;
