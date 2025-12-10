import { RoomModel } from "../models/room/room-model";
import { AuthModel } from "../models/user/auth-model";
import { UserModel } from "../models/user/user-model";
import { IAuth,  IUser } from "../types/interfaces/auth-interface";
import { IRoom } from "../types/interfaces/room-interface";

export class CreateService {

    User = async(body:IUser):Promise<IUser>=>{
        return await UserModel.create(body)
    }

    Auth = async(body:IAuth):Promise<IUser>=>{
        return await AuthModel.create(body)
    }

    Room = async(body:IRoom):Promise<IRoom>=>{
        return await RoomModel.create(body)
    }
}