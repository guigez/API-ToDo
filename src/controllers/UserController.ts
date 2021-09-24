import { Request, Response } from "express";
import { User } from "../schemas/User";

class UserController {
  /* Metodo responsavel por armazenar usuarios */
  async store(request: Request, response: Response) {
      //recuperando dados do corpo da requisicao
      const { name, email, password } = request.body

      //construindo usuario a ser salvo
      const user = new User({
        name,
        email,
        password
      })


    try {
      //salvando usuario no banco do dados
      await user.save();
      return response.status(201).json({user, message: "User added successfully"});

    } catch (err) {
      response.status(500).json({ error: err.message, message: "User not added" });
    }
  }
}

export { UserController };
