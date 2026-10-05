import { describe, test, expect , vi } from "vitest";
import authCont from "../controllers/authController.js";
import userDB from "../database/userMethod.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

test("Accept valid password",()=>{
    expect(authCont.validatePasswordStrength("AseeL@123#67aas")).toBe(true);
});

test("Password with whitespace",()=>{
    expect(authCont.validatePasswordStrength(" Aeel@tt1240%777%@24dggW")).toBe(false);
});

test("Password with no lowercase",()=>{
    expect(authCont.validatePasswordStrength("ASE#$234WEKI5R")).toBe(false);
});

test("Password with no uppercase",()=>{
    expect(authCont.validatePasswordStrength("r12@@egjfi9057gdog")).toBe(false);
});

test("Password with length less than 12",()=>{
    expect(authCont.validatePasswordStrength("Aseel@2013")).toBe(false);
});

test("Password with length more than 12",()=>{
    expect(authCont.validatePasswordStrength("Aseel@2013aseelKhanfer!!")).toBe(true);
});

test("Password with no digits",()=>{
    expect(authCont.validatePasswordStrength("ASEELaseel@@khanfEr")).toBe(false);
});

test("Password with no special characters",()=>{
    expect(authCont.validatePasswordStrength("ASEELaseel34666khanfEr")).toBe(false);
});

test("Empty value",()=>{
    expect(authCont.validatePasswordStrength("")).toBe(false);
})


//===============================================================
//   Filled Data method 
//===============================================================

test("If some fields are empty",()=>{
    expect(authCont.allDataFilled({
        "username":"testuser070",
        "email":"test@example.comm559",
        "first_name":"ASEEL",
        "last_name":"",
        "password":"23444",
        "conPassword":"23444"
    })).toBe(false);
});

test("IIf all fields are filled",()=>{
    expect(authCont.allDataFilled({
        "username":"testuser070",
        "email":"test@example.comm559",
        "first_name":"ASEEL",
        "last_name":"Khanfer",
        "password":"23444",
        "conPassword":"23444"
    })).toBe(true);
});


test("If no fields are there",()=>{
    expect(authCont.allDataFilled({

    })).toBe(false);
});


test("If some all fields are empty",()=>{
    expect(authCont.allDataFilled({
        "username":"",
        "email":"",
        "first_name":"",
        "last_name":"",
        "password":"",
        "conPassword":""
    })).toBe(false);
});

test("If one field filled with space",()=>{
    expect(authCont.allDataFilled({
        "username":" ",
        "email":"test@example.comm559",
        "first_name":"ASEEL",
        "last_name":"Khanfer",
        "password":"23444",
        "conPassword":"23444"
    })).toBe(false);
});

test("If all fields filled with space",()=>{
    expect(authCont.allDataFilled({
        "username":" ",
        "email":" ",
        "first_name":" ",
        "last_name":" ",
        "password":" ",
        "conPassword":" "
    })).toBe(false);
});


//===========================================
// Hashing password
//==========================================

test("password hashed successfully",async()=>{
    const password = "Assseeel120405";
    const hashed = await authCont.hashPassword(password);
    expect(hashed).not.toBe(password);
});



//================================================
// Email Format Test
//================================================

test("Email is valid",()=>{
    expect(authCont.validEmailFormat("aseel454@gmail.com")).toBe(true);
});

test("Email without @ ",()=>{
    expect(authCont.validEmailFormat("aseel454gmail.com")).toBe(false);
});

test("Email without any character before @ ",()=>{
    expect(authCont.validEmailFormat("@gmail.com")).toBe(false);
});

test("Email without any character after @ ",()=>{
    expect(authCont.validEmailFormat("uyit@.com")).toBe(false);
});

test("Email without domain extension -> .something ",()=>{
    expect(authCont.validEmailFormat("aseel.a.kh@gmail")).toBe(false);
});
test("Email ended with something except .com",()=>{
    expect(authCont.validEmailFormat("aseel.a.kh@gmail.ot")).toBe(true);
});
test("Empty Value",()=>{
    expect(authCont.validEmailFormat("")).toBe(false);
});
test("Email with .bau.edu",()=>{
    expect(authCont.validEmailFormat("aseel.akh@bau.edu")).toBe(true);
});
test("Email with whitespaces in middle",()=>{
    expect(authCont.validEmailFormat("aseel. akh@bau.edu")).toBe(false);
});
test("Email with whitespaces at the end",()=>{
    expect(authCont.validEmailFormat("aseel.akh@bau.edu ")).toBe(false);
});
test("Email with whitespaces at the begining",()=>{
    expect(authCont.validEmailFormat(" aseel.akh@bau.edu")).toBe(false);
});


//========================================
// Username Format Test
//========================================

test("Valid Username",()=>{
    expect(authCont.validUsernameFormat("aseel_123")).toBe(true);
});

test("Username with uppercase",()=>{
    expect(authCont.validUsernameFormat("Aseel_123")).toBe(false);
});

test("Username with special character",()=>{
    expect(authCont.validUsernameFormat("aseel@123")).toBe(false);
});

test("Username with whitespace",()=>{
    expect(authCont.validUsernameFormat("aseel 123")).toBe(false);
});

test("Username with length less than 3",()=>{
    expect(authCont.validUsernameFormat("as")).toBe(false);
});

test("Username with length more than 20",()=>{
    expect(authCont.validUsernameFormat("aseel_12345678901234567890")).toBe(false);
});

test("Username Empty String",()=>{
    expect(authCont.validUsernameFormat("")).toBe(false);
});



//========================================
// Token Unit Test 
//========================================

test("Create Token",()=>{
    const user = {
        user_id:"0110d4fe-0629-4bf5-a763-0b800dd361a5"
    };

    const token = authCont.createToken(user);
    expect(token).not.toEqual(user.user_id);

});


//========================================
// Create Mock functions for testing register method
//========================================

// Mocking the userDB methods to avoid actual database calls during testing
vi.mock("../database/userMethod.js",()=>{
    return {
        // Control the behavior of the mocked methods as needed for your tests
        // Return mock values or promises to simulate different scenarios instead of actual database calls
        default: {
        userExistByUsername: vi.fn(),
        userExistByEmail:vi.fn(),
        createUser: vi.fn(),//end of createUser
        getUserByEmail: vi.fn(),
        getUserByUsername: vi.fn()
    }//end of default
}; //end of return
});

//========================================
// Register Unit Test 
//========================================

function createMockRequest(body){

    return {
        body
    };

}

function createMockResponse(){

    return {
        statusCode: null,
        data: null,

        status(code) {
            this.statusCode = code;
            return this;
        },

        json(data) {
            this.data = data;
            return this;
        }
    };

}


test("Registration fails when any field is empty",async()=>{
    const req =createMockRequest({
            username:"aseelkh012",
            email:"aseel@02fjgig.com",
            first_name: "ASEEL",
            last_name: "",
            password: "Aseel@123456",
            conPassword: "Aseel@123456"            
    });
    
    const res = createMockResponse();

    await authCont.register(req,res);
    expect(res.statusCode).toBe(400);
    expect(res.data).toEqual({
        details: "Please Fill All Fields"
    });
});


test("Registration succeed",async()=>{
    const req = createMockRequest({
        //data should user send in request body
            username:"fake_username",
            email:"fake_email@fake.com",
            first_name:"fake_first_name",
            last_name:"fake_last_name",
            password: "Aseel@123456",
            conPassword: "Aseel@123456"  

    });

    userDB.userExistByUsername.mockResolvedValue(false);
    userDB.userExistByEmail.mockResolvedValue(false);
    userDB.createUser.mockResolvedValue({
        //what the createUser method will return after inserting data into DB
        user_id: "fake_id",
        username: "fake_username",
        email: "fake_email@fake.com",
        first_name: "fake_first_name",
        last_name: "fake_last_name"
    });

    const res = createMockResponse();

    await authCont.register(req,res);

    expect(res.statusCode).toBe(201);
    expect(res.data).toEqual({
        // Rigestration method will return ' newData' object with user data => newData :{....} , so the result should equal this
        newData:{
        user_id:"fake_id",
        username:"fake_username",
        email:"fake_email@fake.com",
        first_name:"fake_first_name",
        last_name:"fake_last_name"
    }

    });
});

test("Registration fails when username already exists",async()=>{
    const req = createMockRequest({
        username:"existing_username",
        email:"aseel@gg.com",
        first_name:"ASEEL",
        last_name:"KHANFER",
        password:"Aseel@123456",
        conPassword:"Aseel@123456"
    });
    const res = createMockResponse();

    userDB.userExistByUsername.mockResolvedValue(true);
    userDB.userExistByEmail.mockResolvedValue(false);

    await authCont.register(req,res);
    expect(res.statusCode).toBe(409); //409 code for conflict
    expect(res.data).toEqual({
        details:"Username is exist"
    });
});

test("Registration fails when email already exists",async()=>{
    const req = createMockRequest({
        username:"username123",
        email:"aseel@gg.com", //consider this email is exist in DB
        first_name:"ASEEL",
        last_name:"KHANFER",
        password:"Aseel@123456",
        conPassword:"Aseel@123456"
    });
    const res = createMockResponse();

    userDB.userExistByEmail.mockResolvedValue(true);
    userDB.userExistByUsername.mockResolvedValue(false);

    await authCont.register(req,res);
    expect(res.statusCode).toBe(409); //409 code for conflict
    expect(res.data).toEqual({
        details:"Email is exist"
    });
});


test("Registration fails when username and email both already exist",async()=>{
        const req = createMockRequest({
        username:"username123", //consider this username is exist in DB
        email:"aseel@gg.com", //consider this email is exist in DB
        first_name:"ASEEL",
        last_name:"KHANFER",
        password:"Aseel@123456",
        conPassword:"Aseel@123456"
        });
        const res = createMockResponse();

        userDB.userExistByUsername.mockResolvedValue(true);
        userDB.userExistByEmail.mockResolvedValue(true);

        await authCont.register(req,res);

        expect(res.statusCode).toBe(409); //409 code for conflict
        expect(res.data).toEqual({
            details:"Username is exist"
        });

});

test("Registration fails when passwords do not match",async()=>{
        const req = createMockRequest({
        username:"username123",
        email:"aseel@gg.com", //consider this email is exist in DB
        first_name:"ASEEL",
        last_name:"KHANFER",
        password:"Aseel@123456",
        conPassword:"Aseel@12345677"
        });
        const res = createMockResponse();

        userDB.userExistByUsername.mockResolvedValue(false);
        userDB.userExistByEmail.mockResolvedValue(false);

        await authCont.register(req,res);
        expect(res.statusCode).toBe(400);
        expect(res.data).toEqual({
            details:"Passwords do not match"
        });

});

test("Registration fails when password is weak",async()=>{
        const req = createMockRequest({
        username:"username123",
        email:"aseel@gg.com", 
        first_name:"ASEEL",
        last_name:"KHANFER",
        password:"aseel123456", //weak password because it has no uppercase and special character
        conPassword:"aseel123456"
        });
        const res = createMockResponse();

        userDB.userExistByUsername.mockResolvedValue(false);
        userDB.userExistByEmail.mockResolvedValue(false);

        await authCont.register(req,res);
        expect(res.statusCode).toBe(400);
        expect(res.data).toEqual({
            details:"Invalid Password"
        });

});

test("Registration fails when username is invalid",async()=>{
        const req = createMockRequest({
        username:"Username@123", //invalid username because it contains uppercase and special character
        email:"aseel@gg.com", 
        first_name:"ASEEL",
        last_name:"KHANFER",
        password:"Aseel@123456",
        conPassword:"Aseel@12345677"
        });
        const res = createMockResponse();

        userDB.userExistByUsername.mockResolvedValue(false);
        userDB.userExistByEmail.mockResolvedValue(false);

        await authCont.register(req,res);
        expect(res.statusCode).toBe(400);
        expect(res.data).toEqual({
            details:"Invalid Username"
        });

});
        


//========================================
// Login Unit Test 
//========================================


vi.mock("argon2",()=>{
    return {
        default:{  
            verify: vi.fn(),//end of verify
            hash: vi.fn()//end of hash
        }//end of default
    }//end of return
});//end of vi.mock

//for jwt / token generation
vi.mock("jsonwebtoken",()=>{
    return{
        default:{
            sign: vi.fn()//end of sign
        }
    }
});

test("Login successful with valid credentials",async()=>{
    const token = "fake_token";
    const req = createMockRequest({
        identifier:"valid_user",
        password:"ValidPassword@123"
    });
    const res = createMockResponse();
    argon2.verify.mockResolvedValue(true); // Mocking password verification to return true
    jwt.sign.mockReturnValue("fake_token"); // Mocking token generation to return a fake token
    userDB.getUserByUsername.mockResolvedValue({
        user_id:"fake_user_id",
        username:"valid_user",
        email:"valid_user@example.com",
        first_name:"Valid",
        last_name:"User"
    }); // Mocking user retrieval to return a valid user object

        userDB.getUserByEmail.mockResolvedValue({
        user_id:"fake_user_id",
        username:"valid_user",
        email:"valid_user@example.com",
        first_name:"Valid",
        last_name:"User"
    }); 

    await authCont.login(req,res);

    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual({
        details: "Login Successful",
        userData:{
            user_id:"fake_user_id",
            username:"valid_user",
            email:"valid_user@example.com",
            first_name:"Valid",
            last_name:"User"
        },
        token:"fake_token"
    });

});


test("Login fails with invalid password",async()=>{
    const req = createMockRequest({
        identifier:"valid_user",
        password:"ValidPassword@123"
    });
    const res = createMockResponse();

    argon2.verify.mockResolvedValue(false); // Mocking password verification to return false

    await authCont.login(req,res);
    expect(res.statusCode).toBe(401);
    expect(res.data).toEqual({
        details:"Invalid username/email or password"
    });

});

test("Login fails with non-existing user - username test",async()=>{
    const req = createMockRequest({
        identifier:"valid_user",
        password:"ValidPassword@123"
    });
    const res = createMockResponse();  

    userDB.getUserByUsername.mockResolvedValue(null); // Mocking user retrieval to return null (user not found)

    await authCont.login(req,res);
    expect(res.statusCode).toBe(401);
    expect(res.data).toEqual({
        details:"Invalid username/email or password"
    });
});

test("Login fails with non-existing user - email test",async()=>{
    const req = createMockRequest({
        identifier:"aseel@example.com",
        password:"ValidPassword@123"
    });
    const res = createMockResponse();  

    userDB.getUserByEmail.mockResolvedValue(null); // Mocking user retrieval to return null (user not found)

    await authCont.login(req,res);
    expect(res.statusCode).toBe(401);
    expect(res.data).toEqual({
        details:"Invalid username/email or password"
    });
});

test("Login fails when identifier is empty",async()=>{
    const req = createMockRequest({
        identifier:"",
        password:"ValidPassword@123"
    });
    const res = createMockResponse();      

    await authCont.login(req,res);
    expect(res.statusCode).toBe(400);
    expect(res.data).toEqual({
        details:"Please Fill All Fields"
    });
});

test("Login fails when password is empty",async()=>{
    const req = createMockRequest({
        identifier:"valid_user",
        password:""
    });
    const res = createMockResponse();
    await authCont.login(req,res);
    expect(res.statusCode).toBe(400);
    expect(res.data).toEqual({
        details:"Please Fill All Fields"
    });
});




