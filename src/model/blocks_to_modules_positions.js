const blocksToModulesPositions = blocks => blocks.map(
  ({ modulesPositions }) => modulesPositions
).reduce((acc, el) => acc.concat(el), []);

export default blocksToModulesPositions;
