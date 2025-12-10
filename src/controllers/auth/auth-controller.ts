import { CreateService } from "../../services/create-service";
import { DetailService } from "../../services/detail-service";
import { errorMessages } from "../../types/constants/error-constants";
import { ERole } from "../../types/enums/enum";
import { IAuth, IToken, IUser } from "../../types/interfaces/auth-interface";
import { ExpressRequest, ExpressResponse } from "../../types/interfaces/server-interface";
import { BcryptHandler } from "../../utilities/bcrypt/bcrypt";
import { ControllerHandler } from "../../utilities/controller/controller";
import { JwtHandler } from "../../utilities/jwt/jwt";
import { GetCurrentDateandTime } from "../../utilities/moment/moment";
import { bodyRequiredValidator } from "../../utilities/random-validations/validations";

export class AuthController extends ControllerHandler{
    private detail_service = new DetailService()
    private create_service = new CreateService()
    private bcrypt = new BcryptHandler()
    private jwt = new JwtHandler()
    Register  = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let body = request?.body;
            const required = ['email','user_name','password'];
            const validation_error = bodyRequiredValidator(body,required);
            if(validation_error){
                return this.error(response,400,errorMessages.body_validation_error,validation_error)
            }
            if(body?.password.length < 6 ){
                console.log(body?.password.length)
                return this.error(response,400,errorMessages.password_length)
            }
            body.email = body?.email.toLowerCase();
            const exist_user = await this.detail_service.Auth({email:body?.email});
            if(exist_user){
                return this.error(response,400,errorMessages.email_already_exist)
            }
            let user:IUser={
                user_name:body?.user_name,
                role:ERole.USER,
                email:body?.email,
                created_at:GetCurrentDateandTime(),
            }
            user = await this.create_service.User(user)
            body.password  = await this.bcrypt.getPasswordHash(body?.password)
            let auth:IAuth={
                user:user?._id,
                role:user?.role,
                email:user?.email,
                password: body?.password
            }
            auth = await this.create_service.Auth(auth)
            let token :IToken = await this.jwt.createToken(auth)
            this.jsonResponse(response,token)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };

    Login =   async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let body  = request?.body;
            const required = ['email','password'];
            const validation_error = bodyRequiredValidator(body,required);
            if(validation_error){
                return this.error(response,400,errorMessages.body_validation_error,validation_error)
            }
            const auth = await this.detail_service.Auth({email:body?.email});
            if(!auth){
                return this.error(response,400,errorMessages.user_not_found)
            }
            const verify_pass = await this.bcrypt.verifyPasswordHash(body?.password,auth?.password)
            if(!verify_pass){
                return this.error(response,400,errorMessages.incorrect_password)
            }
            let token :IToken = await this.jwt.createToken(auth)
            this.jsonResponse(response,token)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };

    Profile  = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const user = await this.detail_service.User({_id:request?.user?._id})
            this.jsonResponse(response,user)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };
}