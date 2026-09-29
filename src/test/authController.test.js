import { describe, test, expect } from "vitest";
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

