export const validate =(email,password) =>{
    const checkEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const checkPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!checkEmail)return "Email not valid"
    if(!checkPassword)return "Password not valid"
    return null;
} 