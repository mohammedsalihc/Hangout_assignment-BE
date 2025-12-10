import { AuthModel } from "../models/user/auth-model";
import { IAuth } from "../types/interfaces/auth-interface";
import { objectSanitizer } from "../utilities/validations";

export class DetailService {
    
    Auth = async(filter:Partial<IAuth>):Promise<IAuth>=>{
        let query = objectSanitizer(filter)
        return await AuthModel.findOne(query)
    }
}