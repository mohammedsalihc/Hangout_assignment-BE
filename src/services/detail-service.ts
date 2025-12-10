import { RoomModel } from "../models/room/room-model";
import { AuthModel } from "../models/user/auth-model";
import { UserModel } from "../models/user/user-model";
import { IAuth, IUser } from "../types/interfaces/auth-interface";
import { IRoom } from "../types/interfaces/room-interface";
import { objectSanitizer } from "../utilities/random-validations/validations";

export class DetailService {
    
    Auth = async(filter:Partial<IAuth>):Promise<IAuth>=>{
        let query = objectSanitizer(filter)
        if (!Object.keys(query).length) {
            return null
        }
        return await AuthModel.findOne(query)
    }

    Room = async(filter:Partial<IRoom>):Promise<IRoom>=>{
        let query = objectSanitizer(filter);
        if (!Object.keys(query).length) {
            return null
        }
        return await RoomModel.findOne(query)
    }

    User = async(filter:Partial<IUser>):Promise<IUser>=>{
        let query = objectSanitizer(filter);
        if (!Object.keys(query).length) {
            return null
        }
        return await UserModel.findOne(query)
    }
}