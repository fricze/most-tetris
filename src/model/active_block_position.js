import { getStartPosition } from 'data/state';
import getEachModulePosition from 'model/get_each_module_position';
import { pipe } from 'fn';
import {
  scan,
  map,
  filter,
  takeWhile,
  continueWith
} from 'most-curry';
import {
  blockDidntReachBottom,
  blockReachedBottom
} from 'model/check_block_position';
import {
  bottomPositionBound,
  boardSize,
  moduleSize
} from 'data/dimensions';
import collectStackedBlocks from 'model/collect_stacked_blocks';

const blocksPosition$ = (source, stackedBlocks = []) => pipe(
  scan(collectStackedBlocks, {
    activeBlock: getStartPosition(),
    stackedBlocks,
    trashBlock: false
  }),
  takeWhile(({ trashBlock }) => !trashBlock),
  continueWith(({ stackedBlocks }) => blocksPosition$(source, stackedBlocks))
)(source);

export default blocksPosition$;
