import drawGrid from 'toolbox/draw_grid';
const grid = drawGrid();

import { addContainersToBaseContainer } from 'renderer/containers_stream';
import remountSpriteByID from 'toolbox/remount_sprite_by_id';

const mountActiveBlockSpriteById = remountSpriteByID();

const renderStage = ({
  stageContainer, activeBlockContainer, stackedBlocksContainer, renderer
}) => {
  addContainersToBaseContainer([
    activeBlockContainer, stackedBlocksContainer, grid
  ], stageContainer);

  renderer.render(stageContainer);
};

const animateFrame = (
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

export default animateFrame;
