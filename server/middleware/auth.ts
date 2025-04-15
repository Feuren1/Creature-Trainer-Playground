import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'
import { UserPayload } from '../types/user';

const SECRET = process.env.JWT_SECRET

export function authenticateToken(req: Request, res: Response, next: NextFunction){

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]

    if(!token){
        res.status(401).send("No Token Provided")
        return
    }
    
    if(SECRET){
        jwt.verify(token, SECRET, (err, user) => {
            if (err) return res.status(403).send('Invalid or expired token');
            req.user = user as UserPayload; 
            next();
        })
    }  
}