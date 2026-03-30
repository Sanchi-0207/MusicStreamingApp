<<<<<<< HEAD

import jwt from 'jsonwebtoken';
=======
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const secret_key=process.env.secret_key;
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0

export const auth=(request,response,next)=>{
    try{
     const token=request.header("authorization")?.split(" ")[1];
        if (!token) {
            return response.status(401).json({ error: "Token is required" });
        }
<<<<<<< HEAD
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if(!request.body){
            request.body={};
        }
        request.body.decodedToken= decodedToken;
        next();
    }
        catch (error) {
            response.status(403).json({ error: "Invalid token"});
=======
        const decodedToken = jwt.verify(token, secret_key);
        request.body.userName = decodedToken.userName;
        next();
    }
        catch (error) {
            response.status(403).json({ error: "Invalid token" });
>>>>>>> a3f2ea5cf494adeefc4758455133af136b4e79c0
        }
}