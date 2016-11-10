import { share } from 'toolbox/stream';
import shiftBlock$ from 'intent/shift_block_stream';
import { getStartPosition } from 'data/state';
import { blockDidntReachBottom } from 'model/check_block_position';
import {
  moduleSize,
  bottomPositionBound
} from 'data/dimensions';
import getEachModulePosition from 'model/get_each_module_position';

const activeBlock$ = shiftBlock$.scan(
  (currentPosition, transform) => transform(currentPosition), getStartPosition()
).map(block => ({
  ...block,
  modulesPositions: getEachModulePosition({
    block,
    moduleSize
  })
})).filter(
  blockDidntReachBottom(bottomPositionBound)
);

export default share(activeBlock$);
