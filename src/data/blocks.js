const Line = {
  name: 'line',
  shape: [[1, 1, 1, 1]],
  imgSrcObj: {
    0: 'I_1-3.png',
    90: 'I_2-4.png',
    180: 'I_1-3.png',
    270: 'I_2-4.png'
  }
};

const Square = {
  name: 'square',
  shape: [[1, 1],
          [1, 1]
         ],
  imgSrcObj: {
    0: 'O_1-2-3-4.png',
    90: 'O_1-2-3-4.png',
    180: 'O_1-2-3-4.png',
    270: 'O_1-2-3-4.png'
  }
};

const Pointer = {
  name: 'pointer',
  shape: [[0, 1, 0],
          [1, 1, 1]
         ],
  imgSrcObj: {
    0: 'T_1.png',
    90: 'T_2.png',
    180: 'T_3.png',
    270: 'T_4.png'
  }
};

export const blocks = [
  Line, Square, Pointer
];
