export function onGameEdited(dispatch, payload) {
  if (!payload.error) {
    dispatch({ type: "state:gameEdited", room: payload.game, specters: payload.specters });
  }
  else
    console.log(payload.error);
}
