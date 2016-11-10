import {
  mapObj
} from 'toolbox/object';
import {
  Sprite
} from 'pixi.js';

// getSpritesForBlock gets all required sprites in each
// required rotation for a block
const getSpritesForBlock = (blockID, imagesForBlocks) => mapObj(
  imagesForBlocks[blockID],
  ({ texture }) => new Sprite(texture)
);

const mergeBlockPositionWithSprites = imagesForBlocks => position => ({
  ...position,
  sprites: getSpritesForBlock(position.blockID, imagesForBlocks)
});

export default mergeBlockPositionWithSprites;
