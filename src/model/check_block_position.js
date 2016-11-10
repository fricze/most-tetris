export const blockReachedBottom = bottomPositionBound =>
  ({ modulesPositions }) => modulesPositions.some(({ y }) => y >= bottomPositionBound);

export const blockDidntReachBottom = bottomPositionBound =>
  ({ modulesPositions }) => modulesPositions.every(({ y }) => y <= bottomPositionBound);
