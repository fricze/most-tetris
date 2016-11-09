import { transformPosition$ } from 'intent/tick';
import { getStartPosition } from 'data/state';

export const activeBlock$ = transformPosition$
  .scan((currentPosition, transform) => transform(currentPosition), getStartPosition());
