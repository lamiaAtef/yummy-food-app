export const EMAIL_VALIDATION ={
    
    required:"email is required!",
    pattern:{
    value:/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    message : "please Enter valid email"
    }
}
export const PASSWORD_VALIDATION={
    
    required:"password is required",
    pattern:{
        value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:"password should contain  small,capitel , number, special char and at least 8 char"

    }
}
export const NAME_VALIDATION= {
    required:"name is required",
    pattern:{
        value:/^[A-Za-z\u0600-\u06FF ]{3,30}$/,
        message:"your name should contain 3 letters at least \n No numbers or symbols allowed."
    }
}
export const PHONE_VALIDATION={
     required:"phone number is required",
     pattern:{
        value:/^01[0125][0-9]{8}$/,
        message:"please enter valid phone number "
     }
}
export const REQUIRED_VALIDATION = {
     required:"country is required",
}