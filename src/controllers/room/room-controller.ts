import { CreateService } from "../../services/create-service";
import { DetailService } from "../../services/detail-service";
import { errorMessages } from "../../types/constants/error-constants";
import { EActivityType } from "../../types/enums/enum";
import { IRoom } from "../../types/interfaces/room-interface";
import { ExpressRequest, ExpressResponse } from "../../types/interfaces/server-interface";
import { ControllerHandler } from "../../utilities/controller/controller";
import { GetCurrentDateandTime } from "../../utilities/moment/moment";
import { generateRandomCode } from "../../utilities/random-validations/random-code";
import { bodyRequiredValidator } from "../../utilities/random-validations/validations";

export class RoomController extends ControllerHandler{
    private create_service = new CreateService()
    private detail_service = new DetailService()
    CreateRoom  = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let body:Partial<IRoom> = request.body;
            const user = request?.user;
            const required  = ['name','activity_type'];
            const validation_error = bodyRequiredValidator(body,required);
            if(validation_error){
                return this.error(response,400,errorMessages.body_validation_error,validation_error)
            }
            let allowed_acitivites = [EActivityType.GAME,EActivityType.READING,EActivityType.SHOPPING];
            if(!allowed_acitivites.includes(body.activity_type)){
                return this.error(response,400,errorMessages.invalid_room_type)
            }
            let room:IRoom={
                name:body?.name,
                code:generateRandomCode(),
                created_by:user?._id,
                activity_type:body?.activity_type,
                created_at:GetCurrentDateandTime()
            }
            room = await this.create_service.Room(room)
            this.jsonResponse(response,room)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };

    JoinRoom  = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let body = request?.body;
            const required = ['code'];
            const validation_error = bodyRequiredValidator(body,required);
            if(validation_error){
                return this.error(response,400,errorMessages?.body_validation_error,validation_error)
            }
            const room = await this.detail_service.Room({code:body?.code,active:true});
            if(!room){
                return this.error(response,400,errorMessages?.room_not_found)
            }
            let data = {
                room,
                proceed:true // after this frontend emit the event join room 
            }
            this.jsonResponse(response,data)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };
}