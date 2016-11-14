import { curry } from 'fn';

const pointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

const checkNeighborsClash = (neighborsModulesPositions, oldBlock, block) => {
  const { modulesPositions } = block;

  const collision = modulesPositions
          .some(activePosition => neighborsModulesPositions.some(
            neighborPosition => pointsEqual(activePosition, neighborPosition)
          ));

  if (collision) {
    return {
      block: {
        ...block,
        x: oldBlock.x
      },
      clash: true
    };
  }

  return {
    block,
    clash: false
  };
};

export default curry(checkNeighborsClash);
