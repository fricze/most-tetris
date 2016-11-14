import { getStartPosition } from 'data/state';
import { pipe } from 'fn';
import {
  scan,
  takeWhile,
  continueWith
} from 'most-curry';
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
