import {
  autoDetectRenderer,
  Sprite,
  Container,
  Graphics
} from 'pixi.js';
import { blocks } from 'data/blocks';
import spawnActiveBlock$ from 'view/active_block_stream';
import spawnStackedBlocks$ from 'view/stacked_blocks_stream';
import {
  moduleSize,
  boardSize,
  bottomPositionBound
} from 'data/dimensions';
import {
  combine,
  just,
  fromPromise
} from 'most';
import {
  reduceObj,
  mapObj
} from 'toolbox/object';
import mergeBlockPositionWithSprites from 'renderer/merge_block_position_with_sprites';
import mergeBlockWithResources from 'renderer/merge_block_with_resources';
import loadResources from 'renderer/load_resources'
import animateFrame from 'renderer/animate_frame';
import renderer$ from 'renderer/renderer_stream';
import containers$ from 'renderer/containers_stream';

const activeBlock$ = spawnActiveBlock$();
const stackedBlocks$ = spawnStackedBlocks$();

const resources$ = fromPromise(loadResources())
        .map(resources => mergeBlockWithResources(blocks, resources));

const activeBlockWithSprite$ = combine(
  (block, imagesForBlocks) => mergeBlockPositionWithSprites(imagesForBlocks)(block),
  activeBlock$,
  resources$
);

const stackedBlocksWithSprites$ = combine(
  (block, imagesForBlocks) => mergeBlockPositionWithSprites(imagesForBlocks)(block),
  stackedBlocks$,
  resources$
).scan(
  (allBlocks, positionWithSprite) => allBlocks.concat([
    positionWithSprite
  ]), []
);

const activeBlockWithStackedBlocks$ = combine(
  (activeBlock, stackedBlocks, renderer, containers) => ({
    activeBlock, stackedBlocks, renderer, containers
  }),
  activeBlockWithSprite$,
  stackedBlocksWithSprites$,
  renderer$,
  containers$
);

activeBlockWithStackedBlocks$.observe(
  ({ activeBlock, stackedBlocks, renderer, containers }) => requestAnimationFrame(
    animateFrame(activeBlock, stackedBlocks, renderer, containers)
  )
);
