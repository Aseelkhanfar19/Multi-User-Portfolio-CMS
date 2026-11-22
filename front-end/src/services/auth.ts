import { sendRequest } from "../api/client";
import type { SignUpData , loginData } from "../types/dataTypes"


async function login(userData: loginData) {
    const res = await sendRequest("/api/auth/login","POST",userData);
    console.log(`After login: `,res);
    return res;

}

async function signup(userData:SignUpData){ //will recieve data as object
    console.log("Sending Request");
    const res = await sendRequest("/api/auth/register","POST",userData);
    console.log(res);
}

export {
    signup,
    login
}

