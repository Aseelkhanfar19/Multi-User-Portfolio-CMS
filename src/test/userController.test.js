import { describe, test, expect , vi } from "vitest";
import authCont from "../controllers/authController.js";
import userCont from "../controllers/userController.js";
import userDB from "../database/userMethod.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import argon2 from "argon2";



// Create requests , response
function createRequest(body){
    return body
}
function createResponse(){
    return{
        statusCode:null,
        data:null,
        status(code){
            this.statusCode=code;
            return this;
        },
        json(body){
            this.data = body;
            return this;
        }
    };//end of return
}

vi.mock("../database/userMethod.js",()=>{
    return{
        default: {
            getUserPassword:vi.fn(),
            deleteUser:vi.fn(),
            changePassword:vi.fn(),
            userExistByUsername:vi.fn(),
            userExistByEmail:vi.fn(),
            modifyUserData:vi.fn()
        }
}});

vi.mock("argon2",()=>{
    return{
        default:{
            verify:vi.fn(),
            hash:vi.fn()
        }
    }
});

//=========================
// Delete User
//=========================
test("Delete User Successfully",async ()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{password:"Aseel@1135tf"}
    });
    const res = createResponse();

    userDB.getUserPassword.mockResolvedValue("Aseel@1135tf");
    argon2.verify.mockResolvedValue(true);
    userDB.deleteUser.mockResolvedValue(1);

    await userCont.deleteUser(req,res);

    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual({
        details:"Account has been deleted Successfully"
    });
});

test("Delete User Failed , Empty Password",async ()=>{
    const req = createRequest({
    user:{user_id:"213r4D"},
    body:{password:""}
    });
    const res = createResponse();

    await userCont.deleteUser(req,res);

    expect(res.statusCode).toBe(422);
    expect(res.data).toEqual({
        details:"Can not proceed empty value"
    });

});

test("Delete User Failed, User not Found",async()=>{
    const req = createRequest({
    user:{user_id:"213r4D"},
    body:{password:"Aseel@1135tf"}
    });
    const res = createResponse();
    userDB.getUserPassword.mockResolvedValue("");

    await userCont.deleteUser(req,res);

    expect(res.statusCode).toBe(404);
    expect(res.data).toEqual({
        details:"User not found"
    });
});

test("Delete User Failed, Password Incorrect",async()=>{
    const req = createRequest({
    user:{user_id:"213r4D"},
    body:{password:"Aseel@1135tf"}
    });
    const res = createResponse();
    userDB.getUserPassword.mockResolvedValue("Aseel@1135tf");
    argon2.verify.mockResolvedValue(false);

    await userCont.deleteUser(req,res);
    expect(res.statusCode).toBe(401);
    expect(res.data).toEqual({
        details:"Incorrect Password"
    });
});

test("Delete User Failed, User not Found after password confirmation",async()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{password:"Aseel@1135tf"}
    });
    const res = createResponse();

    userDB.getUserPassword.mockResolvedValue("Aseel@1135tf");
    argon2.verify.mockResolvedValue(true);
    userDB.deleteUser.mockResolvedValue(0);

    await userCont.deleteUser(req,res);

    expect(res.statusCode).toBe(404);
    expect(res.data).toEqual({
        details:"User not found"
    });
});


//=========================
// Change Password
//=========================
test("Changing Password Successfully",async()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{
            currentPassword:"Aseel@1135tf",
            newPassword:"Aseel@wwjjiiE2",
            confirmNewPassword:"Aseel@wwjjiiE2"
        }
    });
    const res = createResponse();
    userDB.getUserPassword.mockResolvedValue("Aseel@1135tf");
    argon2.verify.mockResolvedValue(true);
    userDB.changePassword.mockResolvedValue(1);

    await userCont.changePassword(req,res);

    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual({details:"Password changed successfully"});
});

test("New Password Equal The Old Password",async()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{
            currentPassword:"Aseel@1135tf",
            newPassword:"Aseel@1135tf",
            confirmNewPassword:"Aseel@1135tf"
        }
    });
    const res = createResponse();
    userDB.getUserPassword.mockResolvedValue("Aseel@1135tf");
    argon2.verify.mockResolvedValue(true);

    await userCont.changePassword(req,res);
    expect(res.statusCode).toBe(422);
    expect(res.data).toEqual({
        details:"Your new password can not be match your old password"
    });
});

test("New Password Does Not Match Confirm Password",async()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{
            currentPassword:"Aseel@1135tf",
            newPassword:"Aseel@1135tf60",
            confirmNewPassword:"Aseel@1135tf50"
        }
    });
    const res = createResponse();
    userDB.getUserPassword.mockResolvedValue("Aseel@1135tf");
    argon2.verify.mockResolvedValue(true);

    await userCont.changePassword(req,res);   
    expect(res.statusCode).toBe(400);
    expect(res.data).toEqual({
        details:"Your new password and password confirmation don't match"
    });
});

test("No user ID",async()=>{
    const req = createRequest({
        user:{user_id:""},
        body:{
            currentPassword:"Aseel@1135tf",
            newPassword:"Aseel@wwjjiiE2",
            confirmNewPassword:"Aseel@wwjjiiE2"
        }
    });
    const res = createResponse();

    await userCont.changePassword(req,res);

    expect(res.statusCode).toBe(404);
    expect(res.data).toEqual({
        details:"User not found"
    });
});

test("Any Field is Empty",async()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{
            currentPassword:"",
            newPassword:"Aseel@wwjjiiE2",
            confirmNewPassword:"Aseel@wwjjiiE2"
        }
    });
    const res = createResponse();
    userDB.getUserPassword.mockResolvedValue("Aseel@1135tf");

    await userCont.changePassword(req,res);
    expect(res.statusCode).toBe(422);
    expect(res.data).toEqual({
        details:"All fields are required"
    });
});

test("Old Password is Incorrect",async()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{
            currentPassword:"Aseel@1135tf",
            newPassword:"Aseel@wwjjiiE2",
            confirmNewPassword:"Aseel@wwjjiiE2"
        }
    });
    const res = createResponse();
    userDB.getUserPassword.mockResolvedValue("Aseel@1135tf6");
    argon2.verify.mockResolvedValue(false);

    await userCont.changePassword(req,res);

    expect(res.statusCode).toBe(401);
    expect(res.data).toEqual({
        details:"Incorrect password"
    });
});

test("New Password is Invalid Or weak",async()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{
            currentPassword:"Aseel@1135tf",
            newPassword:"AseeljjiiE2",
            confirmNewPassword:"AseeljjiiE2"
        }
    });
    const res = createResponse();
    userDB.getUserPassword.mockResolvedValue("Aseel@1135tf");
    argon2.verify.mockResolvedValue(true);

    await userCont.changePassword(req,res);

    expect(res.statusCode).toBe(400);
    expect(res.data).toEqual({
        details:"Weak or Invalid Password"
    });

});


//=========================
// Update User Info
//=========================
test("Updated Successfully",async()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{
            username:"aseel_22",
            email:"aseel@gmail.com",
            first_name:"ASEEL",
            last_name:"Khanfer"
        }
    });
    const res = createResponse();

    userDB.userExistByUsername.mockResolvedValue(false);
    userDB.userExistByEmail.mockResolvedValue(false);
    userDB.modifyUserData.mockResolvedValue(1);

    await userCont.updateUserInfo(req,res);

    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual({
        details:1
    });
});

test("Nothing Updated",async()=>{
    const req = createRequest({
        user:{user_id:"213r4D"},
        body:{
            username:"aseel_22",
            email:"aseel@gmail.com",
            first_name:"ASEEL",
            last_name:"Khanfer"
        }
    });
    const res = createResponse();
    userDB.userExistByUsername.mockResolvedValue(false);
    userDB.userExistByEmail.mockResolvedValue(false);
    userDB.modifyUserData.mockResolvedValue(0);

    await userCont.updateUserInfo(req,res);

    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual({
        details:0
    });

});

test("Update a Not Allowed Fields",async()=>{
    const req = createRequest({
    user:{user_id:"213r4D"},
    body:{
        user_id :"0293930",
        username:"aseel_22",
        email:"aseel@gmail.com",
        first_name:"ASEEL",
        last_name:"Khanfer"
    }
    });
    const res = createResponse();
    userDB.userExistByUsername.mockResolvedValue(false);
    userDB.userExistByEmail.mockResolvedValue(false);

    await userCont.updateUserInfo(req,res);

    expect(res.statusCode).toBe(400);
    expect(res.data).toEqual({
        details:"Invalid fields provided for update."
    });
});

test("Empty field",async()=>{
    const req = createRequest({
    user:{user_id:"213r4D"},
    body:{
        username:"",
        email:"",
        first_name:"ASEEL",
        last_name:"Khanfer"
    } });
    const res = createResponse();
    await userCont.updateUserInfo(req,res);

    expect(res.statusCode).toBe(422);
    expect(res.data).toEqual({
        details:"Empty Fields"
    });
});

test("Update Username with an Exist Username",async()=>{
    const req = createRequest({
    user:{user_id:"213r4D"},
    body:{
        username:"aseel_22",
        email:"aseel@gmail.com",
        first_name:"ASEEL",
        last_name:"Khanfer"
    }
    });
    const res = createResponse();
    userDB.userExistByUsername.mockResolvedValue(true);
    await userCont.updateUserInfo(req,res);

    expect(res.statusCode).toBe(409);
    expect(res.data).toEqual({
        details:"Username already taken"
    });
});

test("Update Email with an Exist Email Format",async()=>{
    const req = createRequest({
    user:{user_id:"213r4D"},
    body:{
        username:"aseel_22",
        email:"aseel@gmail.com",
        first_name:"ASEEL",
        last_name:"Khanfer"
    }
    });
    const res = createResponse();
    userDB.userExistByEmail.mockResolvedValue(true);
    userDB.userExistByUsername.mockResolvedValue(false);
    await userCont.updateUserInfo(req,res);

    expect(res.statusCode).toBe(409);
    expect(res.data).toEqual({
        details:"Email is already taken"
    });
});

test("Update username but Invalid Format",async()=>{
    const req = createRequest({
    user:{user_id:"213r4D"},
    body:{
        username:"aseel 22",
        email:"aseel@gmail.com",
        first_name:"ASEEL",
        last_name:"Khanfer"
    }
    });
    const res = createResponse();
    userDB.userExistByEmail.mockResolvedValue(false);
    userDB.userExistByUsername.mockResolvedValue(false);
    await userCont.updateUserInfo(req,res); 
    
    expect(res.statusCode).toBe(400);
    expect(res.data).toEqual({
        details:"Invalid Username"
    });
});

test("Update Email but Invalid",async()=>{
    const req = createRequest({
    user:{user_id:"213r4D"},
    body:{
        username:"aseel_22",
        email:"aseel@r",
        first_name:"ASEEL",
        last_name:"Khanfer"
    }
    });
    const res = createResponse();
    userDB.userExistByEmail.mockResolvedValue(false);
    userDB.userExistByUsername.mockResolvedValue(false);
    await userCont.updateUserInfo(req,res); 
    
    expect(res.statusCode).toBe(400);
    expect(res.data).toEqual({
        details:"Invalid Email"
    });
});

test("No Available User Id",async()=>{
    const req = createRequest({
    user:{user_id:""},
    body:{
        username:"aseel_22",
        email:"aseel@r",
        first_name:"ASEEL",
        last_name:"Khanfer"
    }
    });
    const res = createResponse();
    await userCont.updateUserInfo(req,res);

    expect(res.statusCode).toBe(404);
    expect(res.data).toEqual({
        details:"User not found"
    });
});