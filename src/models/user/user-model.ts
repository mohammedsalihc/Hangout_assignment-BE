import mongoose from "mongoose";
import { ERole } from "../../types/enums/enum";
import { GetCurrentDateandTime } from "../../utilities/moment/moment";
import { IUser } from "../../types/interfaces/auth-interface";

const schema = new mongoose.Schema({
    user_name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    role:{type: String,required:true},
    created_at:{type:Date,default:GetCurrentDateandTime()}
})


export const UserModel = mongoose.model<IUser& mongoose.Document>('user',schema)