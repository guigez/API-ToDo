import { Request, Response } from "express";
import { Board } from "../schemas/Board";
import { UserController } from "../controllers/UserController"
import { Task } from "../schemas/task";

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
  async delete(id: string){
    
  }

  /* Metodo responsavel por att um board */
  async update(request: Request, response: Response){
    return response.status(200).send({messagem: request.params.boardId});
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
  async listTasks(id: string){  }
  
}

export { BoardController };
