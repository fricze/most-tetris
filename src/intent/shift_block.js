import {
  from,
  join,
  map
} from 'most';
import { joinMany } from 'most-combinators';
import shiftBlockOnUserAction from 'intent/shift_block_on_user_action';
import shiftBlockOnTick from 'intent/shift_block_on_tick';

const shiftBlock$ = ({ tick$, userAction$ }) => joinMany([
  shiftBlockOnTick(tick$),
  shiftBlockOnUserAction(userAction$)
]);

export default shiftBlock$;
