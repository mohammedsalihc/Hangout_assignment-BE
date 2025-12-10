import { RoomParticipants } from "../../configs/socket-io/socket";
import { GetCurrentDateandTime } from "../moment/moment";

export const AddParticipant = (room_id: string, user_id: string, user_name:string, socket_id: string) => {
    if (!RoomParticipants[room_id]) {
        RoomParticipants[room_id] = {
            participants: [],
            state: {},
            created_at: GetCurrentDateandTime()
        };
    }
    const room = RoomParticipants[room_id];
    let existing = room.participants.find(p => p.id == user_id);
    if (!existing) {
        existing = { id: user_id, name:user_name, socket_ids: [] }
        room.participants.push(existing)
    }
    if (!existing.socket_ids.includes(socket_id)) {
        existing.socket_ids.push(socket_id);
    }
}


export const RemoveParticipant = (room_id: string, user_id: string , socket_id: string)=>{
    const room = RoomParticipants[room_id];
    if(!room) return 
    const participant = room.participants.find((p) => p.id === user_id);
    if (!participant) return;
    participant.socket_ids = participant.socket_ids.filter((sid) => sid !== socket_id);
    if (participant.socket_ids.length === 0) {
        room.participants = room.participants.filter((p) => p.id !== user_id);
    }
    if (room.participants.length === 0) {
        delete RoomParticipants[room_id];
    }
}