import { from } from 'most';
import { moveDown } from 'actions/arrows_actions';
import moveBlock$ from 'intent/move_block_stream';
import tick$ from 'intent/tick_stream';

export const transformPosition$ = from([
  tick$.map(() => moveDown),
  moveBlock$.throttle(100)
]).join();
