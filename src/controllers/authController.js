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
    
    //validateStrengthPassword

    const hashedPassword = await hashPassword(userData.password);
    //prepare data as object {}
    //send it to DB 
    //get result of successfully registration 
    //send res -> 201 created 
    
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

}

export default{
    register
}