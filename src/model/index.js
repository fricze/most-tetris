import { multicast } from 'most';
import constantActiveBlockPosition$ from './active_block_position';

const observe = ({
  shiftBlock$
}) => ({
  blocks$: multicast(constantActiveBlockPosition$(shiftBlock$))
});

export default observe;
