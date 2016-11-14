import shiftBlock$ from './shift_block';

const observe = ({
  keyDownName$,
  tick$
}) => ({
  shiftBlock$: shiftBlock$({ tick$, userAction$: keyDownName$ })
});

export default observe;
