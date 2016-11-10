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

export default getEachModulePosition;
