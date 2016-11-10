import { share } from 'toolbox/stream';
import spawnActiveBlock$ from 'model/active_block_stream';

const activeBlock$ = spawnActiveBlock$();

export default share(activeBlock$);
