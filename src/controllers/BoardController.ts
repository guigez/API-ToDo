import { Request, Response } from "express";
import { Board } from "../schemas/Board";
import { UserController } from "../controllers/UserController"
import { Task } from "../schemas/task";
import { User } from "../schemas/User";

class BoardController {
  /* Metodo responsavel por armazenar Boards
  *   JSON: {
  *	    "title": "<titulo>",
 	*     "userId": "<id do usuario que criou o board"
  *   }
  *   
  *  Return: board criado, usuario que criou o board e mensagem
  */
  async store(request: Request, response: Response) {

    const { title, userId } = request.body;
    
    const board = new Board({
      title,
    });

    try {
      const userController = new UserController(); 
      const user = await userController.updateUserBoards(userId, board._id)
 
      await board.save();

      return response.status(201).json({board, user, message: "Board added successfully"});

    } catch (err) {
      response.status(500).json({ error: err.message, message: "Board not store" });
    }
  }

  /* Metodo responsavel por acrescentar tasks ao um board */
  async updateBoardTasks(boardId: string, taskId: string){
    const board = await Board.findByIdAndUpdate(boardId, {$push:{tasks: taskId}}, {new: true});
    return board;
  }
  
  /* Metodo responsavel por deletar um board 
  *   - Nao esquecer de deletar todas as tasks que estao nele
  *   - Nao esquecer de deletar o id do board nos usuarios
  * */
  async delete(request: Request, response: Response) {
    
    await Task.deleteMany({board: request.params.boardId});

    const users = await User.updateMany({boards: request.params.boardId}, {$pull: {boards: request.params.boardId}}, {new:true});

    await Board.findByIdAndDelete(request.params.boardId);

    return response.status(200).json({users, message: "Delete Sucess"});
  }

  /* Metodo responsavel por att um board */
  async update(request: Request, response: Response){
    try {
      const { title } = request.body;
      const board = await Board.findByIdAndUpdate(request.params.boardId, { title }, { new: true });


      return response.status(201).json({ board, message: "Board Updated successfully" });

    } catch (err) {
      response.status(500).json({ error: err.message, message: "Board not updated" });
    }
  }

  async listBoards(request: Request, response: Response) {
    try {
      const boards = await Board.find().populate('tasks');
      return response.json( boards );
    }catch (err) {
      response.status(400).json({ error: err.message, message: "Nothing Found"});
    }
  }

  /* Metodo para listar as tasks de um board */
  async listTasks(request: Request, response: Response){ 
    try {
      const  id = request.params.boardId;
     
      const tasks = await Board.findOne({_id: id}).populate('tasks');
      return response.json( tasks );
    }catch (err) {
      response.status(400).json({ error: err.message, message: "Nothing Found"});
    }
  }
  
}

export { BoardController };
