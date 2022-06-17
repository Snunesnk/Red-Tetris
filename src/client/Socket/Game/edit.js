export function onGameEdited(dispatch, payload) {
  console.log("client hit -> game:edited");

  if (!payload.error)
    dispatch({ type: "state:gameEdited", room: payload.game });
  else console.log(payload.error);
}
