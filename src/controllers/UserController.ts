import { Request, Response } from "express";
import { User } from "../schemas/User";

interface IUser{
  _id?: string;
  name: string;
  email: string;
  password?: string;
  boards?: string[]; 
}

class UserController {
  /* Metodo responsavel por armazenar um usuario
  *   JSON: {
  *	    	 "name": "<Saito Kiba>",
  *        "email": "<saitokiba@gmail.com>",
  *        "password": "<123>"
  *   }
  *   
  *  Return: usuario criado e mensagem
  */
  async store(request: Request, response: Response) {
      //recuperando dados do corpo da requisicao
      const { name, email, password } = request.body

      //construindo usuario a ser salvo
      const user = new User({
        name,
        email,
        password
      })

      console.log(user);

    try {
      //salvando usuario no banco do dados
      await user.save();
      return response.status(201).json({user, message: "User added successfully"});

    } catch (err) {
      response.status(500).json({ error: err.message, message: "User not added" });
    }
  }

  /* Metodo responsavel por buscar um usuario com email */
  public async findUserByEmail(email: string){

    const user = await User.findOne({email}).select('+password');

    return user;
  }

  /* Metodo responsavel por buscar um usuario com id */
  async findUserById(id: string){

  }

  async listUsers(request: Request, response: Response){
    try {
      const users = await User.find();
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
  
  async invite(request: Request, response: Response) {
    try {
      const { emailUser, boardId } = request.body;

      console.log('email: ' + emailUser + ' boardId: ' + boardId );

      const teste = await User.findOne({email: emailUser.toString(), boards: { $in: [boardId]}})

      if(teste){
        throw new Error("User already added")
      }

      const user = await User.findOne({'email': emailUser.toString()});

      const userM = await User.findByIdAndUpdate(user._id, {$push: {boards: boardId}}, {new:true});

      response.status(200).json({userM, message: "User Added"})

    } catch (err) {
      response.json({ error: err.message, message: "Nothing Found" });
    }
  }

  async listBoardsByUser(request: Request, response: Response){
    const { userId } = request.params;

    const user = await User.findById(userId).populate('boards');

    return response.json(user);
  }
}

export { UserController };
