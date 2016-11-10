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
import remountSpriteByID from 'toolbox/remount_sprite_by_id';
import drawGrid from 'toolbox/draw_grid';
import mergeBlockPositionWithSprites from 'renderer/merge_block_position_with_sprites';
import mergeBlockWithResources from 'renderer/merge_block_with_resources';
import loadResources from 'renderer/load_resources'
import renderer$ from 'renderer/renderer_stream';
import containers$, { addContainersToBaseContainer } from 'renderer/containers_stream';

const mountActiveBlockSpriteById = remountSpriteByID();

const resources$ = fromPromise(loadResources())
        .map(resources => mergeBlockWithResources(blocks, resources));

const activeBlock$ = spawnActiveBlock$();

const grid = drawGrid();

const renderStage = ({
  stageContainer, activeBlockContainer, stackedBlocksContainer, renderer
}) => {
  addContainersToBaseContainer([
    activeBlockContainer, stackedBlocksContainer, grid
  ], stageContainer);

  renderer.render(stageContainer);
};

const animate = (
  activeBlock,
  stackedBlocks,
  renderer,
  containers
) => () => {
  const {
    x, y,
    rotation,
    sprites
  } = activeBlock;

  const activeSprite = sprites[rotation];

  mountActiveBlockSpriteById(rotation, activeSprite, containers.activeBlockContainer);

  containers.activeBlockContainer.y = y;
  containers.activeBlockContainer.x = x;

  stackedBlocks.forEach(block => {
    const sprite = block.sprites[block.rotation];
    sprite.x = block.x;
    sprite.y = block.y;
    containers.stageContainer.addChild(sprite);
  });

  renderStage({
    ...containers, renderer
  });
};

const activeBlockWithSprite$ = combine(
  (block, imagesForBlocks) => mergeBlockPositionWithSprites(imagesForBlocks)(block),
  activeBlock$,
  resources$
);

const stackedBlocks$ = spawnStackedBlocks$();

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
    animate(activeBlock, stackedBlocks, renderer, containers)
  )
);
