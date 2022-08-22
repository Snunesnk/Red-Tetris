const STATUS = {
  WAITING_ROOM: 0,
  IN_GAME: 1,
  END_GAME: 2
}

const pieceList = [
  [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  [
    [
      [2, 0, 0, 0],
      [2, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 2, 2, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [2, 2, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [2, 2, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 0, 3, 0],
      [3, 3, 3, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 3, 0, 0],
      [0, 3, 0, 0],
      [0, 3, 3, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [3, 3, 3, 0],
      [3, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [3, 3, 0, 0],
      [0, 3, 0, 0],
      [0, 3, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 5, 5, 0],
      [5, 5, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 5, 0, 0],
      [0, 5, 5, 0],
      [0, 0, 5, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 5, 5, 0],
      [5, 5, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [5, 0, 0, 0],
      [5, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 6, 0, 0],
      [6, 6, 6, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 6, 0, 0],
      [0, 6, 6, 0],
      [0, 6, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [6, 6, 6, 0],
      [0, 6, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 6, 0, 0],
      [6, 6, 0, 0],
      [0, 6, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [7, 7, 0, 0],
      [0, 7, 7, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 7, 0],
      [0, 7, 7, 0],
      [0, 7, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [7, 7, 0, 0],
      [0, 7, 7, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 7, 0, 0],
      [7, 7, 0, 0],
      [7, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ]
];

const Games = [];

const levels = [
  1000,
  793,
  618,
  472,
  355,
  262,
  190,
  135,
  94,
  64,
  42,
  28,
  18,
  11,
  7,
  4,
  3,
  2,
  1
]

const DEAD_LOCK = 500;

const PIECE_DREW = 0;
const BOTTOM_EDGE_HIT = 1;
const MOVE_NOT_PERMITTED = 2;
const MAX_PLAYER = 8;

// Convention: positive x rightward, positive y upward.
// Mty functionment: positiv x rightward: positive y downward 
const NORMAL_ROTATION = [
  // 0 >> 1
  [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }],
  // 1 >> 2
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }],
  // 2 >> 3
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
  // 3 >> 0
  [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }]
]

const LEFT_NORMAL_ROTATION = [
  // 0 >> 3
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
  // 3 >> 2
  [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }],
  // 2 >> 1
  [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }],
  // 1 >> 0
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }]
]

const I_ROTATION = [
  // 0 >> 1
  [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }],
  // 1 >> 2
  [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: -2 }, { x: 2, y: 1 }],
  // 2 >> 3
  [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: -1 }, { x: -1, y: 1 }],
  // 3 >> 0
  [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }]
]

const LEFT_I_ROTATION = [
  // 0 >> 3
  [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -2 }, { x: 2, y: 1 }],
  // 3 >> 2
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }],
  // 2 >> 1
  [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 1 }],
  // 1 >> 0
  [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: -1 }, { x: -1, y: 2 }]
]

module.exports = {
  STATUS,
  pieceList,
  Games,
  levels,
  PIECE_DREW,
  BOTTOM_EDGE_HIT,
  MOVE_NOT_PERMITTED,
  NORMAL_ROTATION,
  LEFT_NORMAL_ROTATION,
  I_ROTATION,
  LEFT_I_ROTATION,
  DEAD_LOCK,
  MAX_PLAYER
};
