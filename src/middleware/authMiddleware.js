import jwt from "jsonwebtoken";
import userDB from "../database/userMethod.js";


async function authMiddleware(req, res, next) {
    try{
        // Get the token from the request header
        const authHeader = req.headers.authorization; // will get "Bearer <token>" or undefined


        //1- If header is not provided
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                details: "Authorization header is missing or invalid"
            });
        }

        // Get only the token part from the header
        const token = authHeader.split(" ")[1]; // will get "<token>" or undefined

        //2- If header is provided but the token is not provided
        if (!token) {
            return res.status(401).json({
                details: "Token is missing"
            });
        }

        // Verify the token
        // if the token is valid , return payload , if not valid or expired , throw error
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const userData = await userDB.getUserByID(decodedToken.user_id); //if null will return null value not []
        if (!userDB) return res.status(404).json({
            details:"User not found"
        });
        const currentTokenInDB = userData.token_version;
        if(decodedToken.token_version !== currentTokenInDB) return  res.status(401).json({
            details:"Invalid token or Expired"
        })


        req.user = decodedToken;

        next();



    } catch (error) {
        // if the token is invalid or expired , jwt.verify will throw an error and we will catch it here
        return res.status(401).json({
            details: "Invalid token or Expired"
        });
    }


    //3- If header is provided but the token is invalid or expired


}

export default {
    authMiddleware
}