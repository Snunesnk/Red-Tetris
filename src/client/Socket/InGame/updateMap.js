export function onNewMap(dispatch, payload) {
    if (!payload.error) {
        dispatch({
            type: "map:new",
            map: payload.map,
            score: payload.score,
            level: payload.level,
            nextPieces: payload.nextPieces,
            pieceHold: payload.pieceHold
        });
    } else console.log(payload.error);
}