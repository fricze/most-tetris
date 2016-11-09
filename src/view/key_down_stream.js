import {
  fromEvent
} from 'most';

const keyDown$ = fromEvent('keydown', window);

export default keyDown$;
