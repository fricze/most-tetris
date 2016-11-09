import mergePositionWithSprites from 'renderer/merge_position_with_sprites';

const getEachModulePosition = (
  { block: { shape, x, y }, moduleSize }
) => shape.map((row, rowIdx) => row.map(
  (module, moduleIdx) => ({
    x: x + moduleSize * moduleIdx,
    y: y + moduleSize * rowIdx,
    active: module
  })
)).reduce(
  (allModules, row) => allModules.concat(row), []
).filter(
  ({ active }) => active
).map(
  // used to pass only required data
  // here: only x, y coordinates
  ({ x, y }) => ({ x, y })
);

const blockReachedBottom = bottomPositionBound =>
        ({ modulesPositions }) => modulesPositions.some(({ y }) => y >= bottomPositionBound);

const compareCounters = (block1, block2) => block1.counter === block2.counter;

const getStackedBlocksStream = (
  blockPosition$
) => (
  moduleSize, bottomPositionBound, imagesForBlocks
) => blockPosition$.map(block => ({
  ...block,
  modulesPositions: getEachModulePosition({
    block,
    moduleSize
  })
})).filter(
  blockReachedBottom(bottomPositionBound)
).skipRepeatsWith(
  compareCounters
).map(
  mergePositionWithSprites(imagesForBlocks)
).scan(
  (allBlocks, positionWithSprite) => allBlocks.concat([
    positionWithSprite
  ]), []
);

export default getStackedBlocksStream;
