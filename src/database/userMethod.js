
import pool from "./db.js";
//METHODS FOR CREATION TOMORROW

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
        RETURNING user_id,email,username,first_name,last_name;
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


export default {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserByID
}


