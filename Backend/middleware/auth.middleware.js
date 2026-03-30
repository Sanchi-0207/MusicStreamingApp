
import jwt from 'jsonwebtoken';

export const auth=(request,response,next)=>{
    try{
     const token=request.header("authorization")?.split(" ")[1];
        if (!token) {
            return response.status(401).json({ error: "Token is required" });
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        if(!request.body){
            request.body={};
        }
        request.body.decodedToken= decodedToken;
        next();
    }
        catch (error) {
            response.status(403).json({ error: "Invalid token"});
        }
}