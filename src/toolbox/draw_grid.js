import {
  Graphics
} from 'pixi.js';
import {
  moduleSize
} from 'data/dimensions';

const drawGrid = () => {
  const grid = new Graphics();
  Array(40).fill(null).map((x, i) => i * moduleSize)
    .forEach(pos => grid.lineStyle(1, 0xFFF, 1)
             .moveTo(0, pos)
             .lineTo(moduleSize * 20, pos));

  Array(20).fill(null).map((x, i) => i * moduleSize)
    .forEach(pos => grid.lineStyle(1, 0xFFF, 1)
             .moveTo(pos, 0)
             .lineTo(pos, moduleSize * 40));

  grid.lineStyle(1, 0x000, 1)
    .moveTo(moduleSize * 10, 0)
    .lineTo(moduleSize * 10, moduleSize * 40)

  return grid;
};

export default drawGrid;
