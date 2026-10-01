import { describe, test, expect , vi } from "vitest";
import authCont from "../controllers/authController.js";

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

test("Cannot hash non-string",async()=>{
    const password = 1233;
    await expect(
        authCont.hashPassword(password)
    ).rejects.toThrow();
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
            username:"aseeloyyto0",
            email:"aseel@gotlttsjjf.def.fi",
            first_name: "ASEEL",
            last_name: "KHANFER",
            password: "Aseel@123456",
            conPassword: "Aseel@123456"          
    });

    const res = createMockResponse();

    await authCont.register(req,res);

    expect(res.statusCode).toBe(201);
    expect(res.data).toEqual(res.data);
});





