
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


async function userExistByUsername(EnterdUsername){
    try{
        const sqlCommand = 'SELECT EXISTS (SELECT 1 FROM users WHERE username=$1);';
        const value = [EnterdUsername];

        const result = await pool.query(sqlCommand,value);

        return result.rows[0].exists; //return boolean result

    }
    catch(error){
        throw error
    }
}


async function userExistByEmail(EnterdEmail){
    try{
        const sqlCommand = 'SELECT EXISTS (SELECT 1 FROM users WHERE email=$1);';
        const value = [EnterdEmail];

        const result = await pool.query(sqlCommand,value);

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

async function updateUserInfo(fields,values,userID){ //fields and values should be arrays
    try{
        
        const prepareUpdatesAttributes = fields.map((field,index)=>{
            return `${field} = $${index+1}`; //this will be stored in prepareUpdatesAttributes
        });

        const sqlFields = prepareUpdatesAttributes.join(", ");
        const newValues = [...values,userID]//will get [value1,value2,userID] , this called spreading/unpacking
        const sqlCommand = `UPDATE users SET ${sqlFields} WHERE user_id=$${newValues.length}`;

        const result = await pool.query(sqlCommand,newValues);

        return result.rowCount;
        

    }
    catch(error){
        throw error
    }
}

export default {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserByID,
    userExistByUsername,
    userExistByEmail,
    userExistByID
}


