export function onGameEdited(dispatch, payload) {
  console.log("client hit -> game:edited");
  console.log(payload)

  if (!payload.error) {
    dispatch({ type: "state:gameEdited", room: payload.game, specters: payload.specters });
  }
  else
    console.log(payload.error);
}
