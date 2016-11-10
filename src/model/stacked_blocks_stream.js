import { share } from 'toolbox/stream';
import spawnActiveBlock$ from 'model/active_block_stream';
import {
  moduleSize,
  bottomPositionBound
} from 'data/dimensions';

const activeBlock$ = spawnActiveBlock$();

// Maps each square in tetris block to its position on stage
const getEachModulePosition = (
  { block: { shape, x, y }, moduleSize }
) => shape.map((row, rowIdx) => row.map(
  (module, moduleIdx) => ({
    x: x + moduleSize * moduleIdx,
    y: y + moduleSize * rowIdx,
    active: module
  })
)).reduce(
  (allModules, row) => allModules.concat(row)
).filter(
  ({ active }) => active
).map(
  // used to pass only required data
  // here: only x, y coordinates
  ({ x, y }) => ({ x, y })
);

const blockReachedBottom = bottomPositionBound =>
        ({ modulesPositions }) => modulesPositions.some(({ y }) => y >= bottomPositionBound);

// Counter is used to identify currently active block.
// Therefore using skipRepeatsWith with compareCounters
// makes sure that stackedBlocks$ stream emits each block
// only once.
const compareCounters = (block1, block2) => block1.counter === block2.counter;

const stackedBlocks$ = activeBlock$.map(block => ({
  ...block,
  modulesPositions: getEachModulePosition({
    block,
    moduleSize
  })
})).filter(
  blockReachedBottom(bottomPositionBound)
).skipRepeatsWith(
  compareCounters
);

export default share(stackedBlocks$);
