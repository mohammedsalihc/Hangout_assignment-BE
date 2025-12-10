import { UserModel } from "../../models/user/user-model"
import { status_code } from "../../types/constants/error-constants"
import { ERole } from "../../types/enums/enum"
import { IAuth, IToken, ITokenPayload, IUser } from "../../types/interfaces/auth-interface"
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

    accessPermission = (roles?: string[]) => {
        return async (req: any, res: any, next: any) => {
            const token = req.headers['Authorization'] || req.headers['authorization'];
            if (!token) {
                return res.status(401).send(status_code[401])
            }
            else {
                jwt.verify(token, process.env.JWT_SUPERKEY, async(err: any, decoded: any) => {
                    if (err) {
                        return res.status(401).send(status_code[401])
                    }
                    else {
                        const payload: ITokenPayload = decoded
                        req.payload = payload
                        if (!roles || !roles.length || roles.includes(payload.role as string)) {
                            const user = await UserModel.findOne({_id:payload?.user_id})
                            if(!user){
                                return res.status(404).send(status_code[401])
                            }
                            req.user = user
                            next()
                        } else {
                            return res.status(401).send(status_code[401])
                        }
                    }
                })
            }

        }
    }

    verifyToken = async (token: string): Promise<Partial<ITokenPayload>> => {
        const payload: any = jwt.verify(token,process.env.JWT_SUPERKEY )
        return payload && payload.auth_id ? { auth_id: payload.auth_id, user_id: payload.user_id } : undefined
    }

}