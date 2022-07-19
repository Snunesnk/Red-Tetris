import { calculateScore, isTspin } from "./score";
import Piece from "../piece";
import Player from "../player";
import Maps from "../maps/maps";

/// T-SPIN ///
test("Confirm a t-spin with left rotation", () => {
    let player = new Player();
    player.loadMap(Maps.t_spin_double_left)

    // Do as if the piece was integrated
    player.currentPieceY = 17;
    player.currentPiecX = 3;

    // Left rotation
    player.moveHistory.push("c");
    expect(isTspin(player, 5)).toBe(true);
});
test("Confirm a t-spin with right rotation", () => {
    let player = new Player();
    player.loadMap(Maps.t_spin_double)

    // Do as if the piece was integrated
    player.currentPieceY = 17;
    player.currentPiecX = 3;

    // Right rotation
    player.moveHistory.push("ArrowUp");
    expect(isTspin(player, 5)).toBe(true);
});
test("Confirm t-spin with drops after rotation", () => {
    let player = new Player();
    player.loadMap(Maps.t_spin_double)

    // Do as if the piece was integrated
    player.currentPieceY = 17;
    player.currentPiecX = 3;

    player.moveHistory.push("c");

    // Add drops in move history
    player.moveHistory.push(" ");
    player.moveHistory.push(" ");
    player.moveHistory.push("ArrowDown");
    player.moveHistory.push(" ");
    player.moveHistory.push("ArrowDown");
    player.moveHistory.push("ArrowDown");

    expect(isTspin(player, 5)).toBe(true);
});
test("Deny t-spin after non t-spin move", () => {
    let player = new Player();
    player.loadMap(Maps.t_spin_double)

    // Do as if the piece was integrated
    player.currentPieceY = 17;
    player.currentPiecX = 3;

    player.moveHistory.push("c");

    player.moveHistory.push("Non t-spin move");

    expect(isTspin(player, 5)).toBe(false);
});
test("Deny t-spin with not enough corner filled", () => {
    let player = new Player();
    player.loadMap(Maps.empty)

    // Do as if the piece was integrated
    player.currentPieceY = 17;
    player.currentPiecX = 3;

    player.moveHistory.push("c");
    expect(isTspin(player, 5)).toBe(false);
});
test("Deny t-spin with a non T-piece", () => {
    let player = new Player();
    player.loadMap(Maps.t_spin_double)

    // Do as if the piece was integrated
    player.currentPieceY = 17;
    player.currentPiecX = 3;

    player.moveHistory.push("c");
    expect(isTspin(player, 1)).toBe(false);
});
test("Deny t-spin with a piece that has not hit the bottom yet", () => {
    let player = new Player();
    player.loadMap(Maps.t_spin_double)

    // Do as if the piece was integrated
    player.currentPieceY = 17;
    player.currentPiecX = 3;

    // Do as if the piece is not yet integrated
    player.needNewPiece = false;

    player.moveHistory.push("c");
    expect(isTspin(player, 5)).toBe(false);
});
test("Deny t-spin with only drops", () => {
    let player = new Player();
    player.loadMap(Maps.t_spin_double)

    // Do as if the piece was integrated
    player.currentPieceY = 17;
    player.currentPiecX = 3;

    player.moveHistory.push(" ");
    player.moveHistory.push(" ");
    player.moveHistory.push("ArrowDown");
    player.moveHistory.push(" ");
    player.moveHistory.push("ArrowDown");
    player.moveHistory.push("ArrowDown");

    expect(isTspin(player, 5)).toBe(false);
});
test("Check t-spin with bad coordinates", () => {
    let player = new Player();
    player.loadMap(Maps.t_spin_double)

    // Do as if the piece was integrated
    player.currentPieceY = -17;
    player.currentPiecX = 30;

    player.moveHistory.push("c");
    expect(isTspin(player, 5)).toBe(false);
});



/// SCORE ///
test("No line cleared", () => {
    let player = new Player();

    expect(calculateScore(player, 0, false)).toBe(0);
});
test("No line cleared with t-spin", () => {
    let player = new Player();

    expect(calculateScore(player, 0, true)).toBe(400);
});
test("One line cleared", () => {
    let player = new Player();

    expect(calculateScore(player, 1, false)).toBe(100);
});
test("One line cleared with t-spin", () => {
    let player = new Player();

    expect(calculateScore(player, 1, true)).toBe(800);
});
test("One line cleared with t-spin and back-to-back", () => {
    let player = new Player();
    player.b2bClear = true;

    expect(calculateScore(player, 1, true)).toBe(1200);
});
test("Two lines cleared", () => {
    let player = new Player();

    expect(calculateScore(player, 2, false)).toBe(300);
});
test("Two lines cleared with t-spin", () => {
    let player = new Player();

    expect(calculateScore(player, 2, true)).toBe(1200);
});
test("Two lines cleared with t-spin and back-to-back", () => {
    let player = new Player();
    player.b2bClear = true;

    expect(calculateScore(player, 2, true)).toBe(1800);
});
test("Three lines cleared", () => {
    let player = new Player();

    expect(calculateScore(player, 3, false)).toBe(500);
});
test("Three lines cleared with t-spin", () => {
    let player = new Player();

    expect(calculateScore(player, 3, true)).toBe(1600);
});
test("Three lines cleared with t-spin and back-to-back", () => {
    let player = new Player();
    player.b2bClear = true;

    expect(calculateScore(player, 3, true)).toBe(2400);
});
test("Four lines cleared", () => {
    let player = new Player();

    expect(calculateScore(player, 4, false)).toBe(800);
});
test("Four lines cleared with back-to-back", () => {
    let player = new Player();
    player.b2bClear = true;

    expect(calculateScore(player, 4, false)).toBe(1200);
});


/// LEVEL INCREASE ///
test("Level increase", () => {
    let player = new Player();
    player.b2bClear = true;

    calculateScore(player, 3, true);
    expect(player.level).toBeGreaterThan(0);
    calculateScore(player, 3, true);
    expect(player.level).toBeGreaterThan(1);
});