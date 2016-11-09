import shiftBlock$ from 'intent/shift_block_stream';
import { getStartPosition } from 'data/state';

export const activeBlock$ = shiftBlock$
  .scan((currentPosition, transform) => transform(currentPosition), getStartPosition());
