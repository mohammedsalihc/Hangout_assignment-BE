import { Moment } from "moment-timezone"
import { EActivityType, ERole } from "../enums/enum"


export interface IUser {
    _id?: string,
    email?: string,
    user_name?: string,
    role?: ERole
    created_at?: Moment
}

export interface IAuth {
    _id?: string,
    user?: string | IUser,
    email?: string,
    password?: string,
    role?: ERole,
    created_at?: Moment
}
export interface ITokenPayload {
    user_id: string,
    role?: string,
    auth_id?: string
}

export interface IToken{
    token:string //token
}

