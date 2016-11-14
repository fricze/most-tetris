import {
  autoDetectRenderer,
  Sprite,
  Container,
  Graphics
} from 'pixi.js';
import { blocks } from 'data/blocks';
import {
  spawnActiveBlock$,
  spawnStackedBlocks$
} from 'view';
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

const resources$ = fromPromise(loadResources())
        .map(resources => mergeBlockWithResources(blocks, resources));

const activeBlockWithSprite$ = ({
  resources$,
  blocks$
}) => combine(
  (block, imagesForBlocks) => mergeBlockPositionWithSprites(imagesForBlocks)(block.activeBlock),
  blocks$,
  resources$
);

const stackedBlocksWithSprites$ = ({
  resources$,
  blocks$
}) => combine(
  (blocks, imagesForBlocks) => blocks.stackedBlocks.map(
    mergeBlockPositionWithSprites(imagesForBlocks)
  ),
  blocks$,
  resources$
);

const activeBlockWithStackedBlocks$ = ({
  activeBlockWithSprite$,
  stackedBlocksWithSprites$,
  renderer$,
  containers$
}) => combine(
  (activeBlock, stackedBlocks, renderer, containers) => ({
    activeBlock, stackedBlocks, renderer, containers
  }),
  activeBlockWithSprite$,
  stackedBlocksWithSprites$,
  renderer$,
  containers$
);

const render = ({
  blocks$
}) => {
  const render$ = activeBlockWithStackedBlocks$({
    activeBlockWithSprite$: activeBlockWithSprite$({
      resources$,
      blocks$
    }),
    stackedBlocksWithSprites$: stackedBlocksWithSprites$({
      resources$,
      blocks$
    }),
    renderer$,
    containers$
  });

  render$.observe(
    ({ activeBlock, stackedBlocks, renderer, containers }) => requestAnimationFrame(
      animateFrame(activeBlock, stackedBlocks, renderer, containers)
    )
  );
};

export default {
  render
};
