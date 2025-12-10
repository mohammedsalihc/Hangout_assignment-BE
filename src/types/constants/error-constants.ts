export const status_code: { [key: number]: string } = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    405: "Method not allowed",
    409: "Conflict request",
    500: "Internal server error"
}

export const error_code ={
    Body:1122,
    Auth:1123
}

export const errorMessages = {
    body_validation_error:{
        message:"please fill in all required fields",
        code:`${error_code?.Body}_400`
    },

    email_already_exist:{
        message:"Email ID already exists",
        code:`${error_code?.Auth}_400`
    },

    password_length:{
        message:"Password must be at least 6 characters long",
        code:`${error_code?.Auth}_400`
    },
    user_not_found:{
        message:"User not found",
       code:`${error_code?.Auth}_400`
    },
    incorrect_password:{
        message:"incorrect password",
       code:`${error_code?.Auth}_400`
    }
}