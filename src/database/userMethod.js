
import { error } from "node:console";
import pool from "./db.js";
//METHODS FOR CREATION TOMORROW


//This file for use with DB , CRUD 

// create user 
//get user by id
//get user by username
//get user by email
// update user 
// change user password
//delete user
// logout

async function createUser(userData){ //should recieve {key:value,key:value....}
    try{
        //if data is not empty then 
       const sqlCommand =`
        INSERT INTO users (
        username,
        email,
        first_name,
        last_name,
        password_hash
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING user_id,username,email,first_name,last_name;
        `

        const values = [
            userData.username,
            userData.email,
            userData.first_name,
            userData.last_name,
            userData.password_hash
        ];

        const result =  await pool.query(sqlCommand,values);// return {row:[{#data of 1 row}],rowCount:value}
        return result.rows[0]; //return 1st row 
    }
    catch(error){
        throw error;
    }
}


async function getUserByUsername(username){
    try{
       const sqlCommand=`
        SELECT * FROM users WHERE username=$1;
        `;

        const values = [username]
        const result = await pool.query(sqlCommand,values);

        return result.rows[0];

    }
    catch(error){
        throw error;
    }
}


async function getUserByEmail(email){
    try{
        const sqlCommand = `
            SELECT * FROM users WHERE email=$1;
        `;
        const value = [email];

        const result = await pool.query(sqlCommand,value);

        return result.rows[0];

    }
    catch(error){
        throw error;
    }
}


async function getUserByID(userID){
    try{
        const sqlCommand = `
            SELECT * FROM users WHERE user_id=$1;
        `;
        const value = [userID];

        const result = await pool.query(sqlCommand,value);

        return result.rows[0];

    }
    catch(error){
        throw error;
    }
}


async function userExistByUsername(EnterdUsername,userID=null){
    try{
        let values=[];
        let sqlCommand="";

        if(!userID){
            sqlCommand = 'SELECT EXISTS (SELECT 1 FROM users WHERE username=$1);';
            values = [EnterdUsername]
        }else{
            sqlCommand='SELECT EXISTS (SELECT 1 FROM users WHERE username=$1 and user_id <> $2)';
            values = [EnterdUsername,userID];
        }


        const result = await pool.query(sqlCommand,values);

        return result.rows[0].exists; //return boolean result

    }
    catch(error){
        throw error
    }
}


async function userExistByEmail(EnterdEmail,userID=null){
    try{
        let sqlCommand = ""
        let values = [];
        if(!userID){
            sqlCommand='SELECT EXISTS (SELECT 1 FROM users WHERE email=$1);';
            values = [EnterdEmail];
        }
        else{
            sqlCommand='SELECT EXISTS (SELECT 1 FROM users WHERE email=$1 and user_id <>$2);';
            values = [EnterdEmail,userID];

        }


        const result = await pool.query(sqlCommand,values);

        return result.rows[0].exists; //return boolean result

    }
    catch(error){
        throw error
    }
}


async function userExistByID(userID){
    try{
        const sqlCommand = 'SELECT EXISTS (SELECT 1 FROM users WHERE user_id=$1);';
        const value = [userID];

        const result = await pool.query(sqlCommand,value);

        return result.rows[0].exists; //return boolean result

    }
    catch(error){
        throw error
    }
}

async function changeUserInfo(fields,values,userID,connection=pool){ //fields and values should be arrays
    try{

        const prepareUpdatesAttributes = fields.map((field,index)=>{
            return `${field} = $${index+1}`; //this will be stored in prepareUpdatesAttributes
        });

        const sqlFields = prepareUpdatesAttributes.join(", ");
        const newValues = [...values,userID]//will get [value1,value2,userID] , this called spreading/unpacking
        const sqlCommand = `UPDATE users SET ${sqlFields} WHERE user_id=$${newValues.length}`;

        const result = await connection.query(sqlCommand,newValues);

        return result.rowCount;
        

    }
    catch(error){
        throw error
    }
}

async function modifyUserData(fields,values,userID){//will recieve arrays and user id and will use in controller
    const client = await pool.connect();
    try{
        let changedFields =[];
        await client.query("BEGIN");//open transaction
        //this will lock the updated row until we commit the changes
        const sqlCommand ="SELECT username,email,first_name,last_name FROM users WHERE user_id = $1 FOR UPDATE";
        const result = await client.query(sqlCommand,[userID]);

        if(result.rowCount===0)throw new Error("User not found");

        /*comapre values and detect which one is changed , we used this logic 
        here to pass the same connection*/
        changedFields= fields.filter((field,index)=>{
            return values[index] !== result.rows[0][field] //keep only the changed values 
        });

        let changedValues = changedFields.map((field)=>{

            let index = fields.indexOf(field); // find index of the key 
            return values[index];
        });


        let updateStatus=0
        if(changedFields.length>0){
            updateStatus = await changeUserInfo(changedFields,changedValues,userID,client);
        }
        await client.query("COMMIT"); //this command is important to unlock the row
        return updateStatus; // return 0 OR 1

    }catch(error){
        await client.query("ROLLBACK");
        throw error;

    }finally{
        client.release();
    }


}


async function deleteUser(userID) {
    try{

        const sqlCommand="DELETE FROM users where user_id=$1";
        const result = await pool.query(sqlCommand,[userID]);
        return result.rowCount; // how many rows effected

    }catch(error){
        throw error;
    }



    
}

async function changePassword(userID,newHashedPassword) {
    try{
        const sqlCommand="UPDATE users SET password_hash=$1 , token_version=token_version + 1  WHERE user_id=$2";

        const result = await pool.query(sqlCommand,[newHashedPassword,userID]);//where the newPassword should be hashed

        return result.rowCount;//how many rows has been affected

    }catch(error){
        throw error;
    }

    
}

async function getUserPassword(userID){
    try{
        const sqlCommand = "SELECT password_hash FROM users WHERE user_id=$1";
        const result = await pool.query(sqlCommand,[userID]);

        if(result.rows.length===0)
            return null;

        return result.rows[0].password_hash;//get the value only

    }catch(error){
        throw error;

    }
}



export default {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserByID,
    userExistByUsername,
    userExistByEmail,
    userExistByID,
    getUserPassword,
    deleteUser,
    changePassword,
    modifyUserData
}


