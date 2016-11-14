import {
  turnBy90Degrees,
  moveDown,
  moveLeft,
  moveRight
} from 'actions/block_actions';

export const arrowsToActions = {
  ArrowUp: turnBy90Degrees,
  ArrowDown: moveDown,
  ArrowLeft: moveLeft,
  ArrowRight: moveRight
};

export const arrowsNames = Object.keys(arrowsToActions);
