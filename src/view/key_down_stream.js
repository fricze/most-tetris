import { fromEvent } from 'most';

const keyDownName$ = fromEvent('keydown', window)
        .map(event => event.key);

export default keyDownName$;
