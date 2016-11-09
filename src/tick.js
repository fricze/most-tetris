import {
  from
} from 'most';
import {
  moveDown
} from 'actions/arrows_actions';
import moveBlock$ from 'intent/move_block_stream';
import {
  getStartPosition
} from 'data/state';
import tick$ from 'intent/tick_stream';

const transformPosition$ = from([
  tick$.map(() => moveDown),
  moveBlock$.throttle(100)
]).join();

export const activeBlock$ = transformPosition$
  .scan((currentPosition, transform) => transform(currentPosition), getStartPosition());
