//This file is for user Management :
// Delete user , update user , insertProfileInfo, change password,getProfileInfo

import userDB from "../database/userMethod.js";
import argon2 from "argon2";

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

export default{
    deleteUser
}