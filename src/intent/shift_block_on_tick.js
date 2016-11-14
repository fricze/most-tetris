import { map } from 'most-curry';
import { moveDown } from 'actions/block_actions';

const shiftBlockOnTick = map(() => moveDown);

export default shiftBlockOnTick;
