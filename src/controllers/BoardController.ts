import { Request, Response } from "express";
import { Board } from "../schemas/Board";
import { UserController } from "../controllers/UserController"

class BoardController {
  /* Metodo responsavel por armazenar usuarios */
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

  async updateBoardTasks(boardId: string, taskId: string){
    const board = await Board.findByIdAndUpdate(boardId, {$push:{tasks: taskId}}, {new: true});
    return board;
  }
  

  async listBoards(request: Request, response: Response) {
    try {
      const boards = await Board.find().populate('tasks')
      return response.send({ boards });
    }catch (err) {
      response.status(400).json({ error: err.message, message: "Nothing Found"});
    }
  }
  
}

export { BoardController };
