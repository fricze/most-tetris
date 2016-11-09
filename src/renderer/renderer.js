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
import {
  activeBlock$
} from 'tick';
import {
  moduleSize,
  boardSize,
  bottomPositionBound
} from 'data/dimensions';
import {
  combine
} from 'most';
import {
  reduceObj,
  mapObj
} from 'toolbox/object';
import remountSpriteByID from 'remount_sprite_by_id';
import drawGrid from 'draw_grid';
import getStackedBlocksStream from 'get_stacked_blocks_stream';
import mergePositionWithSprites from 'renderer/merge_position_with_sprites';

const assetsPath = '../assets/';

const pointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

const mountActiveBlockSpriteById = remountSpriteByID();

const animate = ({
  activeBlockContainer,
  renderer,
  stage,
  stackedBlocksContainer
}, {
  x, y,
  rotation,
  sprites
}, stackedBlocks) => () => {
  const activeSprite = sprites[rotation];

  mountActiveBlockSpriteById(rotation, activeSprite, activeBlockContainer);

  activeBlockContainer.y = y;
  activeBlockContainer.x = x;

  stackedBlocks.forEach(block => {
    const sprite = block.sprites[block.rotation];
    sprite.x = block.x;
    sprite.y = block.y;
    stage.addChild(sprite);
  });

  renderer.render(stage);
};

// 'start' takes environment and passes it on to
// 'animate' function, so all drawing elements are
// just function parameters, and we avoid globals
const start = env => {
  const blockPositionWithSprite$ = activeBlock$.map(
    mergePositionWithSprites(env.imagesForBlocks)
  );

  const stackedBlocks$ = getStackedBlocksStream(activeBlock$)(
    moduleSize, bottomPositionBound,
    env.imagesForBlocks
  );

  const activeBlockWithStackedBlocks$ = combine(
    (activeBlock, stackedBlocks) => ({ activeBlock, stackedBlocks }),
    blockPositionWithSprite$,
    stackedBlocks$
  );

  activeBlockWithStackedBlocks$.observe(
    ({ activeBlock, stackedBlocks }) => requestAnimationFrame(
      animate(env, activeBlock, stackedBlocks)
    )
  );
};

const getImagesForBlocks = (blocks, resources) => blocks.map(
  block => mapObj(
    block.imgSrcObj,
    (_, rotationKey) => resources[block.name.concat('_').concat(rotationKey)]
  )
);

const onImagesLoad = (loader, resources) => {
  const renderer = new autoDetectRenderer(boardSize.width, boardSize.height);
  document.body.appendChild(renderer.view);
  const stage = new Container();

  const stackedBlocks = new Container();

  const imagesForBlocks = getImagesForBlocks(blocks, resources);
  const activeBlockContainer = new Container();

  stage.addChild(activeBlockContainer);
  stage.addChild(stackedBlocks);
  stage.addChild(drawGrid());

  start({
    stackedBlocks,
    activeBlockContainer,
    imagesForBlocks,
    renderer,
    stage
  });
}

blocks.reduce(
  // load every shape with proper image and return loader
  // to handle 'load' event
  (loader, { name, imgSrcObj }) => reduceObj(
    imgSrcObj,
    (loader, { key: imgRotation, value: imgSrc }) => loader.add(
      name.concat('_').concat(imgRotation), assetsPath.concat(imgSrc)
    ),
    loader
  ),
  loader
  // reduce goes through all images, loads them
  // and returns loader, so one can subscribe to
  // 'load' event on it
).load(onImagesLoad);
