import {
  from,
  join
} from 'most';
import { compose } from 'fn';

export const joinMany = compose(join, from);
