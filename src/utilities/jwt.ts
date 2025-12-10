import { ERole } from "../types/enums/enum"
import { IAuth, IToken, ITokenPayload, IUser } from "../types/interfaces/auth-interface"
import jwt from "jsonwebtoken"
export class JwtHandler {
    accessToken = async (user_id: string, auth_id: string, role: ERole): Promise<string> => {
        let payload: ITokenPayload = {
            user_id,
            role,
            auth_id
        }
        return jwt.sign(payload, process.env.JWT_SUPERKEY)
    }
    
    createToken = async (auth: IAuth): Promise<IToken> => {
        const token: string = await this.accessToken((auth.user as IUser)?._id || auth?.user as string, auth?._id as string, auth.role)
        return { token }
    }
}