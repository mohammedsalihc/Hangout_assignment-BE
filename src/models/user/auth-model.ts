import mongoose, { Schema } from "mongoose";
import { ERole } from "../../types/enums/enum";
import { GetCurrentDateandTime } from "../../utilities/moment/moment";
import { IAuth } from "../../types/interfaces/auth-interface";

const schema = new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,ref:'user',required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    created_at:{type:Date,default:GetCurrentDateandTime()}
})


export const AuthModel = mongoose.model<IAuth & mongoose.Document>('auth',schema)