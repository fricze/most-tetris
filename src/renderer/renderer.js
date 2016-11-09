import {
  autoDetectRenderer,
  loader,
  Sprite,
  Container,
  Graphics
} from 'pixi.js';
import {
  blocks
} from 'data/blocks';
import { activeBlock$ } from 'model/active_block_stream';
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
import stackedBlocks$ from 'model/get_stacked_blocks_stream';
import mergePositionWithSprites from 'renderer/merge_position_with_sprites';

const assetsPath = '../assets/';

const pointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

const mountActiveBlockSpriteById = remountSpriteByID();

const pixiLoader = loader;

blocks.reduce(
  // load every shape with proper image and return pixiLoader
  // to handle 'load' event
  (pixiLoader, { name, imgSrcObj }) => reduceObj(
    imgSrcObj,
    (pixiLoader, { key: imgRotation, value: imgSrc }) => pixiLoader.add(
      name.concat('_').concat(imgRotation), assetsPath.concat(imgSrc)
    ),
    pixiLoader
  ),
  pixiLoader
  // reduce goes through all images, loads them
  // and returns pixiLoader, so one can subscribe to
  // 'load' event on it
);

const getImagesForBlocks = (blocks, resources) => blocks.map(
  block => mapObj(
    block.imgSrcObj,
    (_, rotationKey) => resources[block.name.concat('_').concat(rotationKey)]
  )
);

const onImagesLoad = resources => getImagesForBlocks(blocks, resources)

const resources$ = fromPromise(
  new Promise(
    (resolve, reject) =>
      pixiLoader.load((pixiLoader, resources) => resolve(resources))
  )
).map(resources => onImagesLoad(resources));

const renderStage = ({
  stageContainer, activeBlockContainer, stackedBlocksContainer, renderer
}) => {
  stageContainer.addChild(activeBlockContainer);
  stageContainer.addChild(stackedBlocksContainer);
  stageContainer.addChild(drawGrid());
  renderer.render(stageContainer);
};

const animate = (
  { x, y,
    rotation,
    sprites
  },
  stackedBlocks,
  renderer,
  containers
) => () => {
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

const renderer$ = just(new autoDetectRenderer(boardSize.width, boardSize.height));
renderer$.observe(
  renderer => document.body.appendChild(renderer.view)
);

const containers$ = just({
  stageContainer: new Container(),
  stackedBlocksContainer: new Container(),
  activeBlockContainer: new Container()
});

const activeBlockWithSprite$ = combine(
  (block, imagesForBlocks) => mergePositionWithSprites(imagesForBlocks)(block),
  activeBlock$,
  resources$
);

const stackedBlocksWithSprites$ = combine(
  (block, imagesForBlocks) => mergePositionWithSprites(imagesForBlocks)(block),
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
