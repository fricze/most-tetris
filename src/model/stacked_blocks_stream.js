import { share } from 'toolbox/stream';
import spawnActiveBlock$ from 'model/active_block_stream';
import {
  moduleSize,
  bottomPositionBound
} from 'data/dimensions';
import { blockReachedBottom } from 'model/check_block_position';
import getEachModulePosition from 'model/get_each_module_position';

const activeBlock$ = spawnActiveBlock$();

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
