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

testDeleteUser("0110d4fe-0629-4bf5-a763-0b800dd361a5");
