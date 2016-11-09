import { share } from 'toolbox/stream';
import keyDown$ from 'view/key_down_stream';
import {
  arrowsActions,
  arrowsActionsNames,
  moveDown
} from 'actions/arrows_actions';

const moveBlock$ = keyDown$
        .map(event => event.key)
        .filter(keyName => arrowsActionsNames.includes(keyName))
        .map(keyName => arrowsActions[keyName])

export default share(moveBlock$);
