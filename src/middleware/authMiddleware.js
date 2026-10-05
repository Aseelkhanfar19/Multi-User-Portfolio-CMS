import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
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

        req.user = decodedToken;



    } catch (error) {
        // if the token is invalid or expired , jwt.verify will throw an error and we will catch it here
        return res.status(401).json({
            details: "Invalid token or Expired"
        });
    }


    //3- If header is provided but the token is invalid or expired


}