//This file is for user Management :
// Delete user , update user , insertProfileInfo, change password,getProfileInfo

import userDB from "../database/userMethod.js";
import argon2 from "argon2";
import authCont from "./authController.js";

async function deleteUser(req,res){
    try{
        const enteredPassword = req.body.password;
        const userID = req.user.user_id;
        if (typeof enteredPassword !== "string"  || !enteredPassword.trim())
            return res.status(422).json({
            details:"Can not proceed empty value"
        });

        const currentPassword = await userDB.getUserPassword(userID);
        if(!currentPassword)return res.status(404).json({
            details:"User not found"
        });
        
        const isCorrectPassword = await argon2.verify(currentPassword,enteredPassword);
        if(!isCorrectPassword) return res.status(401).json({
            details:"Incorrect Password"
        });

        const deletionResult = await userDB.deleteUser(userID);
        if(deletionResult===0)
            return res.status(404).json({
                details:"User not found"
            });

        return res.status(200).json({
            details:"Account has been deleted Successfully"
        });
        

    }
    catch(error){

        return res.status(500).json({
            details:`Internal Server Error , ${error}`
        });

    }


}

async function changePassword(req,res){
    try{
        const userID = req.user.user_id;
        if(!userID) return res.status(404).json({
            details:"User not found"
        });
        const currentPassword=req.body.currentPassword;
        const newPassword = req.body.newPassword;
        const confirmNewPassword = req.body.confirmNewPassword;
        const storedPass = await userDB.getUserPassword(userID);

        //check first if any field is empty
        if(!currentPassword.trim() || !newPassword.trim() || !confirmNewPassword.trim())return res.status(422).json({
            details:"All fields are required"
        });

        //check if entered password match the hashed password in DB
        const correctCurrentPassword = await argon2.verify(storedPass,currentPassword);
        if(!correctCurrentPassword) return res.status(401).json({
            details:"Incorrect password"
        });


        // check password strength
        const validPassword = authCont.validatePasswordStrength(newPassword);
        if(!validPassword)return res.status(400).json({
            details:"Weak or Invalid Password"
        });

        //check that the new password and confirm the password are match
        if(newPassword !== confirmNewPassword) return res.status(400).json({
            details:"Your new password and password confirmation don't match"
        });

        //check if the new password equal current password
        if(newPassword===currentPassword) return res.status(422).json({
            details:"Your new password can not be match your old password"
        });

        // hash new password and store it in DB
        const hashNewPassword = await authCont.hashPassword(newPassword);
        const DBResult = await userDB.changePassword(userID,hashNewPassword);

        //check if the changing executed successfully
        if(DBResult===0)return res.status(404).json({
            details:"User not found"
        });


        return res.status(200).json({
            details:"Password changed successfully"
        });

        //compare current password
        // compare new password with confirm password

    }
    catch(error){
        return res.status(500).json({
            details:"Internal Server Error"
        });
    }

}


//this for changing the basic user info , not profile
async function updateUserInfo(req,res){
    
    const updatedData = req.body; //will return object
    const userID = req.user.user_id;

    const isValuesEmpty = checkEmptyValues(updatedData);

    if(isValuesEmpty)return res.status(404).json({
        details:"Empty Fields"
    });

    const fields = Object.keys(updatedData).map((key)=>{
        return key;
    }); //get fields in array
    const values = Object.values(updatedData).map((value)=>{
        return value; //get value of fields in array
    });

    //check that all fields is safe to modify it , before sending the data to DB .
    const isFieldsValid= validFields(fields);
    if(!isFieldsValid) return res.status(400).json({
        details:"Invalid fields provided for update."
    });

    //check if the username is updated , follow the rules and not exist
    if(fields.includes("username")){
        const updatedUsername =values[fields.indexOf("username")];
        const isUsernameValid = usernameValidation(updatedUsername);
        if(!isUsernameValid)return res.status(400).json({
            details:"Invalid Username"
        });
        const isUsernameExist = await userDB.userExistByUsername(updatedUsername);
        if(isUsernameExist)return res.status(409).json({
            details:"Username already taken"
        });
    }

    //check if the email is updated , follow the rules and not exist
    if(fields.includes("email")){
        const thisEmail =values[fields.indexOf("email")];
        const isEmailValid = emailValidation(thisEmail);
        if(!isEmailValid)return res.status(400).json({
            details:"Invalid Email"
        });
        const isEmailExist = await userDB.userExistByEmail(thisEmail);
        if(isEmailExist)return res.status(409).json({
            details:"Email already taken"
        });
    }

    //send fields to DB to update user info 
    const resultOfModification = await userDB.modifyUserData(fields,values,userID);

    return res.status(201).json({
        details:resultOfModification
    });

}


function validFields(fields){
    const allowedFields = ["username","email","first_name","last_name"];

    return fields.every((field)=>{
        return allowedFields.includes(field);
});

}


async function emailValidation(email){
    return authCont.validEmailFormat(email);
}

async function usernameValidation(username){
    return authCont.validUsernameFormat(username);
}

function checkEmptyValues(requestBody){
    const hasEmptyValues = Object.values(requestBody).some(value => {
        return typeof value !== "string" || value.trim() === "";
    });

    return hasEmptyValues;
}
//=================================================



export default{
    deleteUser,
    changePassword,
    updateUserInfo
}