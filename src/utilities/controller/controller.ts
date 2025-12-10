import { Response } from "express";

import { status_code } from "../../types/constants/error-constants";
import { IErrorCode, IServerError } from "../../types/interfaces/server-interface";


export class ControllerHandler {
    public jsonResponse<T>(response: Response, result?: T | null) {
        if (result) {
            response.type('application/json');
            return response.status(200).json(result);
        } else {
            return response.status(200).json({ "status": "success" });
        }
    }

    public error(response: Response, code: number, message_detail?: IErrorCode|null, error?: any) {
        const msg = message_detail?.message || status_code[code]
        let error_response:IServerError = {
            "status": code,
            "message": msg,
            "error_message_code":message_detail?.code || code?.toString(),
            "error": [error]
        }
        response.status(code).json(error_response)
    }
}
