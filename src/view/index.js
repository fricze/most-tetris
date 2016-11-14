import keyDownName$ from './key_down_stream';
import tick$ from './tick_stream';

const observe = () => ({
  keyDownName$,
  tick$
});

export default observe;
