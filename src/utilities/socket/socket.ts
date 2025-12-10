import { Socket } from "socket.io";
import { app } from "../../configs/server";
import { SocketIOEvent } from "../../types/enums/enum";
import { ITokenPayload } from "../../types/interfaces/auth-interface";
import { JwtHandler } from "../jwt/jwt";
import { RoomParticipants } from "../../configs/socket-io/socket";
import { GetCurrentDateandTime } from "../moment/moment";
import {AddParticipant, RemoveParticipant } from "./socket-helper";
const jwt_handler = new JwtHandler()

export const startSocketIO = (io) => {
    io.use((socket, next) => {
        let token = socket.handshake.query.token;
        if (token) {
            jwt_handler.verifyToken(token).then((payload: ITokenPayload) => {
                socket.handshake.query.client_id = payload.user_id;
                socket.handshake.query.client_auth_id = payload.auth_id;
                return next()
            }).catch((err) => {
                socket.disconnect()
                return next(new Error("authentication error"))
            })
        } else {
            socket.disconnect()
            return next(new Error('authentication error'))
        }
    })

    io.on(SocketIOEvent.CONNECTION, socket => {
        let client_id = socket?.handshake?.query?.client_id?.toString()
        let client_auth_id = socket?.handshake?.query?.client_auth_id?.toString()
        let user_name = socket?.handshake?.query?.user_name
        socket.on(SocketIOEvent.JOIN_ROOM, async (data) => {
            JoinRoom(client_id, user_name, socket, data)
        })

        socket.on(SocketIOEvent.LEAVE_ROOM,async(data)=>{
            LeftRoom(client_id,user_name,socket,data)
        })


    })

    return io
}

export const socketBroadcast = (boardcast_to: string, event: SocketIOEvent, data: any) => {
    try {
        const io = app.get('socketConnection')
        io.to(boardcast_to).emit(event, data)
    } catch (error) {
    }
}

const JoinRoom = async (client_id: string, user_name:string, socket: any, data: any) => {
    if (data?.room_id) {
        let room_id = data?.room_id;
        AddParticipant(room_id, client_id,user_name, socket.id)
        socket.join(room_id)
        socketBroadcast(room_id, SocketIOEvent.USER_JOINED, {
            user: { id: client_id, name: user_name },
            participants: RoomParticipants[room_id].participants
        })
    } else return 
}

const LeftRoom = async(client_id:string,user_name:string,socket:any,data:any)=>{
    if(data?.room_id){
        let room_id = data?.room_id;
        RemoveParticipant(room_id,client_id,socket.id);
        socket.leave(room_id)
        socketBroadcast(room_id,SocketIOEvent.USER_LEAVED,{
            user:{id:client_id,name:user_name},
            participants: RoomParticipants[room_id].participants
        })
    }else return 
}


