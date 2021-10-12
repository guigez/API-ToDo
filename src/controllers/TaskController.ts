import { Request, Response } from "express";
import { Task } from "../schemas/task";
import { BoardController } from "./BoardController";


class TaskController {
  /* Metodo responsavel por armazenar task em um board
  *   JSON: {
  *	    "title": "<titulo>",
  *     "status": "<tasks><doing><completed>",
 	*     "boardId": "<id do board em que a task ira pertencer"
  *   }
  *   
  *  Return: task criada, board e mensagem
  */
  async store(request: Request, response: Response) {

    const { title, status, boardId } = request.body;
  
    const task = new Task({
      title,
      status,
      board: boardId,
    });

    try {
      const boardController = new BoardController(); 
      const board = await boardController.updateBoardTasks(boardId, task._id)

      await task.save();

      return response.status(201).json({task, board , message: "Task added successfully"});

    } catch (err) {
      response.status(500).json({ error: err.message, message: "Task not store" });
    }
  }

  /* Metodo para att uma task */
  async update(id: string){

  }

  /* Metodo para deletar uma task */
  async delete(id: string){

  }

  /* Metodo responsavel por buscar uma task com id */
  async findTaskById(id: string){

  }
  
}

export { TaskController };
