import mongoose, { Schema } from "mongoose";
import { GetCurrentDateandTime } from "../../utilities/moment/moment";
import { IRoom } from "../../types/interfaces/room-interface";


const schema = new mongoose.Schema({
    name:{type:String,require:true},
    code:{type:String,required:true,unique:true},
    created_by:{type:Schema.Types.ObjectId,ref:"user",required:true},
    activity_type:{type:String,required:true},
    created_at:{type:Date,default:GetCurrentDateandTime()},
    active:{type:Boolean,default:true}
})

export const RoomModel = mongoose.model<IRoom&mongoose.Document>('room',schema)