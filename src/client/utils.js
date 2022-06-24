import { useSelector } from "react-redux";

export function amIHost() {
  const { room, socketId } = useSelector((state) => state.appState);
  if (room.players[0].socketId === socketId) return true;
  return false;
}
