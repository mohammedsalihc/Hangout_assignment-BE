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

export interface IRoomState{
    current_page?:number,
    scrolly?:number,
    user?:string,
    updated_at?:Moment
}

export interface IRoomData{
    participants?:IRoomParticipant[]
    state?:IRoomState,
    created_at?:Moment
}