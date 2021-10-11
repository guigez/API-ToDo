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

  /* Metodo responsavel por buscar um usuario com email */
  async findUserByEmail(email: string){

  }

  /* Metodo responsavel por buscar um usuario com id */
  async findUserById(id: string){

  }

  async listUsers(resquest: Request, response: Response){
    try {
      const users = await User.find().populate('boards');
      return response.send({ users });
    }catch (err) {
      response.status(400).json({ error: err.message, message: "Nothing Found"});
    }
  }

  /* Metodo responsavel por acrescentar ao user o id do board em que ele foi add */
  async updateUserBoards(userId: string, boardId: string){
    const user = await User.findByIdAndUpdate(userId, {$push: {boards: boardId}}, {new:true});
    return user;
  }
  
}

export { UserController };
