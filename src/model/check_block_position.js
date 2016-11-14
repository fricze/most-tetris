import { curry } from 'fn';

export const blockReachedBottom = curry(
  (bottomPositionBound, { modulesPositions }) =>
    modulesPositions.some(({ y }) => y >= bottomPositionBound)
);
export const blockDidntReachBottom = curry(
  (bottomPositionBound, { modulesPositions }) =>
    modulesPositions.every(({ y }) => y <= bottomPositionBound)
);
