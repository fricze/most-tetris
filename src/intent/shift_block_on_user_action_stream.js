import { share } from 'toolbox/stream';
import keyDown$ from 'view/key_down_stream';
import {
  arrowsActions,
  arrowsActionsNames,
  moveDown
} from 'actions/arrows_actions';

const shiftBlockOnUserAction$ = keyDown$
        .map(event => event.key)
        .filter(keyName => arrowsActionsNames.includes(keyName))
        .map(keyName => arrowsActions[keyName])
        .throttle(100);

const spawnShiftBlockOnUserAction$ = share(shiftBlockOnUserAction$);

export default spawnShiftBlockOnUserAction$;
