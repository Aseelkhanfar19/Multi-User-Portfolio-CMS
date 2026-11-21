import { sendRequest } from "../api/client";
import type { SignUpData } from "../types/dataTypes"


async function login(email: string, password: string) {}

async function signup(userData:SignUpData){ //will recieve data as object
    console.log("Sending Request");
    const res = await sendRequest("/api/auth/register","POST",userData);
    console.log(res);
}

export {
    signup,
    login
}

