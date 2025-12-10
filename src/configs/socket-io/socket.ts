

import { IRoomData } from "../../types/interfaces/room-interface";
import { startSocketIO } from "../../utilities/socket/socket";

const addSocketConnection = (server: any) => {
  const io = require("socket.io")(server, {
    path: "/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  return startSocketIO(io);
};

export const RoomParticipants: Record<string, IRoomData> = {};

export default addSocketConnection;