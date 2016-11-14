import { curry } from 'fn';

export const blockReachedBottom = curry(
  (bottomPositionBound, { modulesPositions }) =>
    modulesPositions.some(({ y }) => y >= bottomPositionBound)
);
