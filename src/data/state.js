import {
  blocks
} from './blocks';
import {
  moduleSize
} from './dimensions';

const getRandomId = ({ length }) => (Math.ceil(Math.random() * length)) - 1;

let counter = 0;

export const getStartPosition = () => {
  const blockID = getRandomId(blocks);
  counter = counter + 1;

  return {
    x: moduleSize * 10,
    y: 0,
    rotation: 0,
    blockID,
    shape: blocks[blockID].shape,
    counter
  }
};
