import { Moment } from "moment-timezone"
import { EActivityType } from "../enums/enum"
import { IUser } from "./auth-interface"

export interface IRoom {
    name?:string,
    code?:string,
    created_by?:IUser|string,
    activity_type?:EActivityType,
    created_at?:Moment,
    active?:boolean
}

export interface IRoomParticipant{
    id?:string,
    name?:string,
    socket_ids?:string[]
}

export interface IRoomData{
    participants?:IRoomParticipant[]
    created_at?:Moment
}