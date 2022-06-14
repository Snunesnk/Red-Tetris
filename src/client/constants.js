export const MAIN_BACK_COLOR = "linear-gradient(#1A1A1D, #141e30) fixed";

export const WHITE_COLOR = "rgb(232, 230, 227)";

export const RED_COLOR = "#ea0e0e";

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

export const OUTER_TETRIS_COLORS = [
    // "rgb(232, 230, 227)", // WHITE => empty cell - 0
    "#141e30", // Gray => empty cell
    "#00FFFF", // LIGHT BLUE => I cell - 1
    "blue", // DARK BLUE => J cell - 2
    "#FF971C", // ORANGE => L cell - 3
    "#FFD500", // YELLOW => O cell - 4
    "#72CB3B", // GREEN => S cell - 5
    "#9900FF", // PURPLE => T cell - 6
    "#FF3213" // RED => Z cell - 7
]

export const INNER_TETRIS_COLORS = [
    // "rgb(232, 230, 227)", // WHITE => empty cell - 0
    "black",
    "cyan", // LIGHT BLUE => I cell - 1
    "rgb(0, 124, 215)", // DARK BLUE => J cell - 2
    "orange", // ORANGE => L cell - 3
    "yellow", // YELLOW => O cell - 4
    "green", // GREEN => S cell - 5
    "purple", // PURPLE => T cell - 6
    "red" // RED => Z cell - 7
]