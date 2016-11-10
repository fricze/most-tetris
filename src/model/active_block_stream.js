import { share } from 'toolbox/stream';
import shiftBlock$ from 'intent/shift_block_stream';
import { getStartPosition } from 'data/state';

const activeBlock$ = shiftBlock$
        .scan((currentPosition, transform) => transform(currentPosition), getStartPosition());

export default share(activeBlock$);
