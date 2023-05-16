export const STATUS = {
  WAITING_ROOM: 0,
  IN_GAME: 1,
  END_GAME: 2,
};

// export const WHITE_COLOR = "#FBED00";
export const WHITE_COLOR = "rgb(232, 230, 227)";
// export const RED_COLOR = "#ea0e0e";
export const RED_COLOR = "#EC008C";
export const GREEN_COLOR = "#03db02";
export const GOLD_COLOR = "#FFD700";
export const SILVER_COLOR = "#C0C0C0";
export const BRONZE_COLOR = "#cd7f32";

// Default map to start with
export const DEFAULT_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const NEXT_PIECES = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const HOLD_PIECE = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const OUTER_TETRIS_COLORS = [
  // "rgb(232, 230, 227)", // WHITE => empty cell - 0
  "black",
  "#50ade0", // LIGHT BLUE => I cell - 1
  "#325ee7", // DARK BLUE => J cell - 2
  "#d47b1f", // ORANGE => L cell - 3
  "#d9b328", // YELLOW => O cell - 4
  "#78c62b", // GREEN => S cell - 5
  "#b347db", // PURPLE => T cell - 6
  // "#ea0e0e", // RED => Z cell - 7
  "#EC008C", // RED => Z cell - 7
];

export const INNER_TETRIS_COLORS = [
  // "rgb(232, 230, 227)", // WHITE => empty cell - 0
  "#141e30", // Gray => empty cell
  "#9be7fc", // LIGHT BLUE => I cell - 1
  "#8baafa", // DARK BLUE => J cell - 2
  "#fbc666", // ORANGE => L cell - 3
  "#f9ea72", // YELLOW => O cell - 4
  "#c2f6a1", // GREEN => S cell - 5
  "#d595ee", // PURPLE => T cell - 6
  "#fa7477", // RED => Z cell - 7
];
