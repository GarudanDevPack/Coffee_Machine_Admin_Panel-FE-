import { useEffect } from "react";

/** Usage: useRoomNoProvider(socket, ["promotions", `machine:${id}`]) */
export function useRoomNoProvider(socket, rooms) {
  useEffect(() => {
    if (!socket || !rooms?.length) return;
    rooms.forEach((r) => socket.emit("join", { room: r }));
    return () => rooms.forEach((r) => socket.emit("leave", { room: r }));
  }, [socket, JSON.stringify(rooms)]);
}