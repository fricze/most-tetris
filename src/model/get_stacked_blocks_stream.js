import { activeBlock$ } from 'model/active_block_stream';
import mergePositionWithSprites from 'renderer/merge_position_with_sprites';
import {
  moduleSize,
  bottomPositionBound
} from 'data/dimensions';

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
  // used to pass only required data
  // here: only x, y coordinates
).map(
  ({ x, y }) => ({ x, y })
);

const blockReachedBottom = bottomPositionBound =>
        ({ modulesPositions }) => modulesPositions.some(({ y }) => y >= bottomPositionBound);

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

const getStackedBlocksStream = (
  imagesForBlocks
) => stackedBlocks$.map(
  mergePositionWithSprites(imagesForBlocks)
).scan(
  (allBlocks, positionWithSprite) => allBlocks.concat([
    positionWithSprite
  ]), []
);

export default getStackedBlocksStream;
