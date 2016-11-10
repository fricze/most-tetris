import { share } from 'toolbox/stream';
import spawnStackedBlocks$ from 'model/stacked_blocks_stream';

const stackedBlocks$ = spawnStackedBlocks$();

export default share(stackedBlocks$);
