import { curry } from 'fn';
import {
  scan as mscan,
  map as mmap,
  filter as mfilter,
  skipRepeatsWith as mskipRepeatsWith,
  throttle as mthrottle,
  takeWhile as mtakeWhile,
  continueWith as mcontinueWith,
  multicast as mmulticast
} from 'most';

export const scan = curry(mscan);
export const map = curry(mmap);
export const filter = curry(mfilter);
export const skipRepeatsWith = curry(mskipRepeatsWith);
export const throttle = curry(mthrottle);
export const takeWhile = curry(mtakeWhile);
export const continueWith = curry(mcontinueWith);
export const multicast = curry(mmulticast);
