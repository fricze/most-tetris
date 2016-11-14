import {
  arrowsToActions,
  arrowsNames,
  moveDown
} from 'actions/arrows_actions';
import { pipe } from 'fn';
import {
  map,
  filter,
  throttle
} from 'most-curry';

const shiftBlockOnUserAction = pipe(
  filter(keyName => arrowsNames.includes(keyName)),
  map(keyName => arrowsToActions[keyName]),
  throttle(100)
);

export default shiftBlockOnUserAction;
