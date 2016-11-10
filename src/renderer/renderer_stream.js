import { just } from 'most';
import { autoDetectRenderer } from 'pixi.js';
import {
  moduleSize,
  boardSize,
  bottomPositionBound
} from 'data/dimensions';

const renderer$ = just(new autoDetectRenderer(boardSize.width, boardSize.height));
renderer$.observe(
  renderer => document.body.appendChild(renderer.view)
);

export default renderer$;
