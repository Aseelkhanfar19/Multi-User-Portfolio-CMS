import dbMethods from "../database/userMethod.js";
import testData from "./mockData.js";

async function testCreateUser(mockData) {
    try{

        const result = await dbMethods.createUser(mockData);
        console.log(result);
    }
    catch(error){
        console.log(error);

    }
    
    
}

async function testGetUserByUsername(mockData) {
    try{
        const result = await dbMethods.getUserByUsername(mockData);
        console.log(result);
    }
    catch(error){
        console.log(error);
    }
    
}

async function testGetUserByEmail(mockData) {
    try{
        const result = await dbMethods.getUserByEmail(mockData); 
        console.log(result);
    }
    catch(error){
        console.log(error);
    }
    
}

async function testGetUserByID(mockData) {
    try{
        const result = await dbMethods.getUserByID(mockData); 
        console.log(result);
    }
    catch(error){
        console.log(error);
    }    
    
}

async function testUserExistByUsername(mockData){
    try{
        const result = await dbMethods.userExistByUsername(mockData);

        console.log(result);
    }
    catch(error){
        console.log(error);
    }

}

async function testUserExistByEmail(mockData){
    try{
        const result = await dbMethods.userExistByEmail(mockData);

        console.log(result);
    }
    catch(error){
        console.log(error);
    }

}

async function testUserExistByID(mockData){
    try{
        const result = await dbMethods.userExistByID(mockData);

        console.log(result);
    }
    catch(error){
        console.log(error);
    }

}

async function testGetPassword(userID) {

    try{
        const result = await dbMethods.getUserPassword(userID);

        console.log(result);
    }
    catch(error){
        console.log(error);
    }

}


async function testDeleteUser(userID){
    try{
        const result = await dbMethods.deleteUser(userID);

        console.log(result);
    }
    catch(error){
        console.log(error);
    }

}


async function testUpdateData(fields,values,userID){

    try{
        const res = await dbMethods.modifyUserData(fields,values,userID);

        console.log(res);

    }
    catch(error){
        console.log(error);
    }

}

testUpdateData(["username","email",'first_name',"last_name"],["lara01",'test@example.comm559','lolo',"khanfar"],"5b232b2c-303a-4cb6-a0e0-f11052d39be0");
//a72c56a1-cbd2-4c48-8d12-8a8b204d799a