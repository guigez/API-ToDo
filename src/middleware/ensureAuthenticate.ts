import { Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken';

export function ensureAuthenticate(
  request: Request, 
  response: Response, 
  next: NextFunction){

    //receber token
    const authToken = request.headers.authorization;
    
    //validar se o token preenchido
    if(!authToken) return response.status(401).end();

    //validar se token é valido

    const [, token] = authToken.split(" ")
    try{
      verify(token, "ef04dd06fdb4892f176f8794ca286302")
      return next();
    }
    catch(err) {
      return response.status(401).end();
    }
}