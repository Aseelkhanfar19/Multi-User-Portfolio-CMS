import "dotenv/config";
import jwt from "jsonwebtoken";
import { describe, test, expect , vi } from "vitest";
import userDB from "../database/userMethod.js";
import authMid from "../middleware/authMiddleware.js";

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

vi.mock("../database/userMethod.js",() =>{
    return {
        default:{
            getUserByID:vi.fn()
        }
    }
});

vi.mock("jsonwebtoken",()=>{
    return {
        default:{
            verify:vi.fn()
        }
    }

});

const next = vi.fn();

test("Token is valid ",async ()=>{
    const req = createRequest({
        headers:{authorization:"Bearer urieoeplemfmfjroeoe"}
    });
    const res = createResponse();

    userDB.getUserByID.mockResolvedValue({
        token_version:1
    });

    jwt.verify.mockReturnValue({
        user_id:"04fmgkprpe040959G333",
        token_version:1
    });

    await authMid.authMiddleware(req,res,next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.statusCode).toEqual(null);
});

test("Header is Empty",async()=>{
    const req = createRequest({
        headers:{authorization:""}
    });
    const res = createResponse();

    userDB.getUserByID.mockResolvedValue({
        token_version:1
    });

    jwt.verify.mockReturnValue({
        user_id:"04fmgkprpe040959G333",
        token_version:1
    });

    await authMid.authMiddleware(req,res,next);

    expect(res.statusCode).toBe(401);
    expect(res.data).toEqual({
        details: "Authorization header is missing or invalid"
    });
    expect(next).not.toHaveBeenCalled();
});

test("Header strats with something not equal to Bearer",async()=>{
    const req = createRequest({
        headers:{authorization:"Token "}
    });
    const res = createResponse();

    userDB.getUserByID.mockResolvedValue({
        token_version:1
    });

    jwt.verify.mockReturnValue({
        user_id:"04fmgkprpe040959G333",
        token_version:1
    });

    await authMid.authMiddleware(req,res,next);

    expect(res.statusCode).toBe(401);
    expect(res.data).toEqual({
        details: "Authorization header is missing or invalid"
    });
    expect(next).not.toHaveBeenCalled();
});

test("Header is there but no token passed",async()=>{
    const req = createRequest({
        headers:{authorization:"Bearer "}
    });
    const res = createResponse();

    userDB.getUserByID.mockResolvedValue({
        token_version:1
    });

    jwt.verify.mockReturnValue({
        user_id:"04fmgkprpe040959G333",
        token_version:1
    });

    await authMid.authMiddleware(req,res,next);

    expect(res.statusCode).toBe(401);
    expect(res.data).toEqual({
        details: "Token is missing"
    });
    expect(next).not.toHaveBeenCalled();
});

test("User not Found",async()=>{
    const req = createRequest({
        headers:{authorization:"Bearer 99iimfniroroRTRwfg34T"}
    });
    const res = createResponse();

    jwt.verify.mockReturnValue({
        user_id:"04fmgkprpe040959G333",
        token_version:1
    });

    userDB.getUserByID.mockResolvedValue(null);

    await authMid.authMiddleware(req,res,next);

    expect(res.statusCode).toBe(404);
    expect(res.data).toEqual({
        details:"User not found"
    });
    expect(next).not.toHaveBeenCalled();
});

test("Token versions do not match",async()=>{
    const req = createRequest({
        headers:{authorization:"Bearer ooOu677U76ttHH54ghtt55tHYY"}
    });
    const res = createResponse();

    userDB.getUserByID.mockResolvedValue({
        token_version:2
    });

    jwt.verify.mockReturnValue({
        user_id:"04fmgkprpe040959G333",
        token_version:1
    });

    await authMid.authMiddleware(req,res,next);

    expect(res.statusCode).toBe(401);
    expect(res.data).toEqual({
        details:"Invalid token or Expired"
    });
    expect(next).not.toHaveBeenCalled();
});





