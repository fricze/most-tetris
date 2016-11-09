import { from } from 'most';
import { moveDown } from 'actions/arrows_actions';
import spawnShiftBlockOnUserAction$ from 'intent/shift_block_on_user_action_stream';
import tick$ from 'intent/tick_stream';

const shiftBlockOnTick$ = tick$.map(() => moveDown);
const shiftBlockOnUserAction$ = spawnShiftBlockOnUserAction$();

const shiftBlock$ = from([
  shiftBlockOnTick$,
  shiftBlockOnUserAction$
]).join();

export default shiftBlock$;
