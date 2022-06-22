export function onNewSpecter(dispatch, payload) {
    if (!payload.error) {
        dispatch({
            type: "specters:new",
            map: payload.map,
            index: payload.index
        });
    } else console.log(payload.error);
}