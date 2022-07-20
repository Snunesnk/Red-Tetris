import {
    draw,
    placeLine,
    eraseLine,
} from "./draw";
import Piece from "../piece";
import Player from "../player";
import Maps from "../maps/maps";
import { pieceList } from "../const";

// Change a piece from a 4 * 4 matrix to a 4 * 10 matrix to fit the map
function AdaptPiece(piece) {
    let adaptedPiece = [];

    for (let i = 0; i < piece.length; i++) {
        adaptedPiece.push(piece[i].map(cell => cell));
        adaptedPiece[i].push(0, 0, 0, 0, 0, 0);
    }

    return adaptedPiece;
}


/// DRAW + PLACE LINE ///
describe("Test draw with placeLine()", () => {
    test("Draw every pieces on the board", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i).content[0];
            let player = new Player();

            draw(player.map, 0, 0, piece, placeLine);

            expect(player.map).toEqual(expect.arrayContaining(AdaptPiece(piece)));
        }
    });
    test("Try to draw pieces outside the board", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i).content[0];
            let player = new Player();

            draw(player.map, -5, -5, piece, placeLine);

            expect(player.map).not.toEqual(expect.arrayContaining(AdaptPiece(piece)));
        }
    });
    test("Try to draw a piece in a full board", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i).content[0];
            let player = new Player();
            player.loadMap(Maps.full);

            draw(player.map, 0, 0, piece, placeLine);

            expect(player.map).not.toEqual(expect.arrayContaining(AdaptPiece(piece)));
        }
    });
});


/// DRAW + ERASE LINE ///
describe("Test draw with eraseLine()", () => {
    test("Erase pieces from the board", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i).content[0];
            let player = new Player();

            draw(player.map, 0, 0, piece, placeLine);
            draw(player.map, 0, 0, piece, eraseLine);

            expect(player.map).toEqual(Maps.empty);
        }
    });
    test("Try to erase a piece outside the board", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i).content[0];
            let player = new Player();

            draw(player.map, 0, 0, piece, placeLine);
            draw(player.map, -5, -5, piece, eraseLine);

            expect(player.map).toEqual(expect.arrayContaining(AdaptPiece(piece)));
        }
    });
    test("Try to erase a piece that is not in the board", () => {
        for (let i = 1; i < pieceList.length; i++) {
            let piece = new Piece().setType(i).content[0];
            let player = new Player();

            draw(player.map, 0, 0, piece, eraseLine);

            expect(player.map).toEqual(Maps.empty);
        }
    });
});