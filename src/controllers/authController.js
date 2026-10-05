// This File contain the logic of authentication and will contact with DB by userMethods
import userDB from "../database/userMethod.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


//===========================================
// Register Process
//===========================================

async function register(req,res){

    try{

        const userData = req.body;
        const isDataFilled = allDataFilled(userData);
        if(!isDataFilled){
            return res.status(400).json({
                details:"Please Fill All Fields"
            });
        }
        const validUsername = validUsernameFormat(userData.username);
        if(!validUsername) return res.status(400).json({
            details:"Invalid Username"
        });

        const isUsernameExist = await userDB.userExistByUsername(userData.username);

        if (isUsernameExist)
            return res.status(409).json({
                details:"Username is exist"
            });


        const validEmail = validEmailFormat(userData.email);
        const isEmailExist = await userDB.userExistByEmail(userData.email);

        
        if(!validEmail) return res.status(400).json({
            details:"Email is not valid"
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
  catch(error){
    return res.status(500).json({
        details:`Internal error , ${error.message}.`
    });
  }
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

function validEmailFormat(email){
    const validFormat = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // [^@\s] => everything except whitespace and @ character
    return validFormat.test(email);
}

function validUsernameFormat(username){
    const validFormat = /^[a-z0-9_.-]{3,20}$/;
    return validFormat.test(username);
}


//===========================================
// Login Process
//===========================================
async function login(req,res){
    try{
        let user;
        // check if all fields filled
        const userData = req.body;
        if (!allDataFilled(userData)){
            return res.status(400).json({
                details:"Please Fill All Fields"
            });
        }

        //Check is user login by email or username
        const emailFormat = validEmailFormat(userData.identifier);
        if(emailFormat){
            //login by email
            user = await userDB.getUserByEmail(userData.identifier);
        }
        else{
            //login by username
            user = await userDB.getUserByUsername(userData.identifier);
        }
        if(!user){
            return res.status(401).json({
                details:"Invalid username/email or password"
            });
        }

        const isPasswordCorrect = await argon2.verify(user.password_hash,userData.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                details:"Invalid username/email or password"
            });
        }

        //create a token for the user and send it back to the client
        const token = createToken(user);

        return res.status(200).json({
            details:"Login Successful",
            userData:{
                user_id:user.user_id,
                username:user.username,
                email:user.email,
                first_name:user.first_name,
                last_name:user.last_name
            },
            token:token
        }); //this will be returned to the client and stored in local storage or cookies for future requests
    }
    catch(error){
        return res.status(500).json({
            details:`Internal error , ${error.message}.`
        });
    }

}


function createToken(user){

    const payload = {
        user_id:user.user_id
    };
    const secretKey = process.env.JWT_SECRET;
    const options = {
        expiresIn:"1h"
    };
    const token = jwt.sign(payload,secretKey,options);

    return token;

}

export default{
    register,
    login,
    validatePasswordStrength,
    allDataFilled,
    hashPassword,
    validEmailFormat,
    createToken,
    validUsernameFormat
}