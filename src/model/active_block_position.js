import { getStartPosition } from 'data/state';
import { moduleSize } from 'data/dimensions';
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
  boardSize
} from 'data/dimensions';
import collectStackedBlocks from 'model/collect_stacked_blocks';

const blockWithModulesPositions$ = map(block => ({
  ...block,
  modulesPositions: getEachModulePosition({
    block,
    moduleSize
  })
}));

const transformingPosition$ = startPosition => scan(
  (currentPosition, transform) => {
    const newBlock = transform(currentPosition);
    const blockWidth = newBlock.shape[0].length * moduleSize;

    if (newBlock.x < 0) {
      newBlock.x = 0;
    }

    if (newBlock.x + blockWidth > boardSize.width) {
      newBlock.x = boardSize.width - blockWidth;
    }

    return newBlock;
  }, startPosition
);

const activeBlockPosition$ = startPosition => pipe(
  transformingPosition$(startPosition),
  blockWithModulesPositions$
);

const constantActiveBlockPosition$ = (source, stackedBlocks = []) => pipe(
  activeBlockPosition$(getStartPosition()),
  scan(collectStackedBlocks, { activeBlock: null, stackedBlocks }),
  filter(({ activeBlock }) => !!activeBlock),
  takeWhile(
    ({ trashBlock }) => !trashBlock
  ),
  continueWith(({ stackedBlocks }) => constantActiveBlockPosition$(source, stackedBlocks))
)(source);

export default constantActiveBlockPosition$;
