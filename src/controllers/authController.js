// This File contain the logic of authentication and will contact with DB by userMethods
import userDB from "../database/userMethod.js";
import argon2 from "argon2";
async function register(req,res){

    const userData = req.body;
    const isDataFilled = allDataFilled(userData);
    if(!isDataFilled){
        return res.status(400).json({
            details:"Please Fill All Fields"
        });
    }
    const isUsernameExist = await userDB.userExistByUsername(userData.username);
    const isEmailExist = await userDB.userExistByEmail(userData.email);

    if (isUsernameExist)
        return res.status(409).json({
            details:"Username is exist"
        });

    if(isEmailExist)
        return res.status(409).json({
            details:"Email is exist"
        });

    
    if(userData.password !== userData.conPassword)
        return res.status(400).json({
            details:"Passwords do not match"
        });
    
    const validPassword = validatePasswordStrength(userData.password);
    if(!validPassword)return res.status(400).json({
        details:"Invalid Password"
    });
    

    const hashedPassword = await hashPassword(userData.password);

    const formattedData = {
        username : userData.username,
        email: userData.email,
        first_name:userData.first_name,
        last_name:userData.last_name,
        password_hash:hashedPassword
    };

    //send it to DB 
    const registrationResult = await userDB.createUser(formattedData);

    return res.status(201).json({
        newData:registrationResult
    });
}




function allDataFilled(userData){
    if(Object.keys(userData).length<=0)return false;
    for(let value of Object.values(userData)){
        if (!value || value.trim()==="")return false;
    }
    return true;

} //return T/F


async function hashPassword(password) {

    let password_hashed =await argon2.hash(password);
    return password_hashed;
}

function validatePasswordStrength(password){
    /*
    (?=.{12,}$) => length 12 or more
    (?=.*[A-Z])(?=.*[a-z]) => has at least uppercase character and lowercase character
    (?=.*\d) => has at least one digit
    (?=.*[!@#$%^&*]) => at least one special character
    (?!.*\s) => has no whitespace
    */
    const validFormat = /^(?=.{12,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).*$/;

    return validFormat.test(password);

}

export default{
    register,
    validatePasswordStrength,
    allDataFilled,
    hashPassword
}