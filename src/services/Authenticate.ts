import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { UserController } from "../controllers/UserController";

class Authenticate {


  async login(request: Request, response: Response){
    
    const { email, password } = request.body;

    const userController = new UserController();
    const user = await userController.findUserByEmail(email);
  
    if(!user)
      throw new Error("Email or Password Incorrect");

   /* if(!await compare(password, user.password)){
      throw new Error("Email or Password Incorrect");
    } */

    const token = sign({id: user._id, name: user.name}, "ef04dd06fdb4892f176f8794ca286302", {expiresIn: "1d"});

    return response.json(token);
  }
}

export { Authenticate }