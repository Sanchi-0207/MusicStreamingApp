import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const secret_key=process.env.secret_key;

export const auth=(request,response,next)=>{
    try{
     const token=request.header("authorization")?.split(" ")[1];
        if (!token) {
            return response.status(401).json({ error: "Token is required" });
        }
        const decodedToken = jwt.verify(token, secret_key);
        request.body.userName = decodedToken.userName;
        next();
    }
        catch (error) {
            response.status(403).json({ error: "Invalid token" });
        }
}